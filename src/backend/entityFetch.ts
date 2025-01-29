import { EntitySchema, getSchema } from "../models/entities"
import {
  MaterializedEntity,
  NonNullFieldValue
} from "../models/materialization"
import {
  EntityOwnedProperty,
  LinkedEntityProperty,
  ManyToManyEntityListProperty,
  OwnedEntityListProperty,
  Property
} from "../models/properties"
import { DataFilter, DataResolver } from "../models/query"

const extractFields = (properties: Property[], additionalFields?: string[]) => {
  const fieldMap = new Map<string, string>()
  for (const p of properties) {
    if (p.kind === "number" || p.kind === "text" || p.kind === "linkedEntity") {
      fieldMap.set(p.backingField, p.label)
    } else if (p.kind === "table") {
      for (let i = 0; i < p.rows.length; ++i) {
        for (let j = 0; j < p.columns.length; ++j) {
          const f = p.cellField(j, i)
          if (f !== undefined) {
            fieldMap.set(f, f)
          }
        }
      }
    }
  }
  if (additionalFields) {
    for (const f of additionalFields) {
      if (!fieldMap.has(f)) {
        fieldMap.set(f, f)
      }
    }
  }
  return fieldMap
}

const bindEntity = (
  s: EntitySchema,
  data: Record<string, any>,
  fieldMap: Map<string, string>
): MaterializedEntity => ({
  data: Object.keys(data).reduce(
    (agg, k) => ({ ...agg, [fieldMap.get(k) ?? k]: data[k] }),
    {}
  ),
  state: "original",
  entityRef: { type: "existing", schema: s.name, id: data[s.pkField] }
})

const toMap = <T>(items: T[], key: (x: T) => string | number) => {
  const m = new Map<string | number, T>()
  for (const item of items) {
    const k = key(item)
    if (m.has(k)) {
      throw new Error(`Duplicate key value '${k}'`)
    }
    m.set(k, item)
  }
  return m
}

/**
 * Accepts only a single or no items in the array.
 */
const singleOrNull = <T>(items: T[]) =>
  items.length === 0 ? null : singleOrThrow(items)

/**
 * Ensures that a single item is in the array.
 */
const singleOrThrow = <T>(items: T[]) => {
  if (items.length === 1) {
    return items[0]
  }
  throw new Error(`Expected 1 item, got ${items.length}`)
}

interface EntityFetchOptions {
  /**
   * Ensure these additional fields are fetched.
   */
  additionalFields?: string[]
  /**
   * Do not fetch linked entities.
   */
  shallow?: boolean
}

type FetchPropType<TProp extends Property> = (
  resolver: DataResolver,
  id: NonNullFieldValue,
  entity: MaterializedEntity,
  p: TProp
) => Promise<true | Error>

const entityOwnedFetch: FetchPropType<EntityOwnedProperty> = async (
  resolver,
  id,
  entity,
  p
) => {
  // Fetch the entity (if any) by matching the FK column in the right
  // side entity to the PK in the left side.
  try {
    entity.data[p.label] = singleOrNull(
      await fetchEntities(
        getSchema(p.linkedEntitySchema),
        [{ field: p.oneToOneBackingField, value: id }],
        resolver
      )
    )
    return true
  } catch (err) {
    return err as Error
  }
}

const linkedEntityFetch: FetchPropType<LinkedEntityProperty> = async (
  resolver,
  id,
  entity,
  p
) => {
  try {
    // Fetch the entity by its PK, whose value is a FK in the left side.
    const linkedSchema = getSchema(p.linkedEntitySchema)
    entity.data[p.label] = singleOrNull(
      await fetchEntities(
        linkedSchema,
        [{ field: linkedSchema.pkField, value: id }],
        resolver
      )
    )
    return true
  } catch (err) {
    return err as Error
  }
}

const manyToManyFetch: FetchPropType<ManyToManyEntityListProperty> = async (
  resolver,
  id,
  entity,
  p
) => {
  try {
    const { connection } = p
    const m2m = await fetchEntities(
      getSchema(connection.connectionEntity),
      [{ field: connection.leftSideBackingField, value: id }],
      resolver,
      // Ensure that we have the right side ids for later matching.
      {
        additionalFields: [connection.rightSideBackingField]
      }
    )
    const linkedSchema = getSchema(p.linkedEntitySchema)
    const matches = toMap(
      await fetchEntities(
        linkedSchema,
        [
          {
            field: linkedSchema.pkField,
            operator: "in",
            value: m2m
              .map((v) => v.data[connection.rightSideBackingField])
              .filter((v) => v !== null)
          }
        ],
        resolver
      ),
      (e) => e.entityRef.id
    )
    // Now every entry in the m2m relation should have a match in matches.
    for (const item of m2m) {
      const pkRight = item.data[connection.rightSideBackingField]
      if (
        !pkRight ||
        typeof pkRight === "object" ||
        typeof pkRight === "boolean"
      ) {
        return new Error(
          `Fetch on M2M did not return an id value for the right backing field '${connection.rightSideBackingField}'`
        )
      }
      const m = matches.get(pkRight)
      if (!m) {
        return new Error(
          `Could not find the entity linked by an M2M: ${p.linkedEntitySchema},
          right=${pkRight}, matches=${[...matches.values()].map((v) => JSON.stringify(v))}`
        )
      }
      // Replace the key by the entity.
      item.data[connection.rightSideBackingField] = m
    }
    entity.data[p.label] = m2m
    return true
  } catch (err) {
    return err as Error
  }
}

const ownedListFetch: FetchPropType<OwnedEntityListProperty> = async (
  resolver,
  id,
  entity,
  p
) => {
  try {
    const { connection } = p
    const children = await fetchEntities(
      getSchema(p.linkedEntitySchema),
      [
        {
          field: connection.childBackingProp,
          value: id
        }
      ],
      resolver
    )
    entity.data[p.label] = children
    return true
  } catch (err) {
    return err as Error
  }
}

export const fetchEntities = async (
  schema: EntitySchema,
  filter: DataFilter[],
  resolver: DataResolver,
  options?: EntityFetchOptions
): Promise<MaterializedEntity[]> => {
  // First we determine all the fields that we need to fetch for the backing
  // model of this schema.
  const fieldMap = extractFields(schema.properties, options?.additionalFields)
  // Ensure that the PK field is extracted.
  fieldMap.set(schema.pkField, fieldMap.get(schema.pkField) ?? "id")
  const fetched = await resolver.fetch({
    query: {
      model: schema.backingTable,
      filter
    },
    fields: [...fieldMap.keys()]
  })
  const entities: MaterializedEntity[] = []
  const promises: Promise<true | Error>[] = []
  for (const fieldValues of fetched) {
    const id = fieldValues[schema.pkField]
    if (!id) {
      throw new Error(
        `The PK field '${schema.pkField}' was not fetched by the data resolver`
      )
    }
    const entity = bindEntity(schema, fieldValues, fieldMap)
    for (const p of schema.properties) {
      if (options?.shallow) {
        // This loop's purpose is to fetch related entities.
        break
      }
      if (p.kind === "entityOwned") {
        promises.push(entityOwnedFetch(resolver, id, entity, p))
      } else if (p.kind === "linkedEntity") {
        const fkValue = fieldValues[p.backingField]
        if (fkValue) {
          promises.push(linkedEntityFetch(resolver, fkValue, entity, p))
        }
      } else if (p.kind === "m2mEntityList") {
        promises.push(manyToManyFetch(resolver, id, entity, p))
      } else if (p.kind === "ownedEntityList") {
        promises.push(ownedListFetch(resolver, id, entity, p))
      }
    }
    entities.push(entity)
  }
  const processed = await Promise.all(promises)
  const errors = processed.filter((res) => res !== true)
  if (errors.length > 0) {
    const msg = errors.reduce((agg, e) => `${agg}${e.message}\n`, "")
    throw new Error(
      `fetchEntities processing had ${errors.length} errors: ${msg}`
    )
  }
  return entities
}
