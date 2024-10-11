import { EntitySchema, getSchema } from "../models/entities"
import { Property } from "../models/properties"
import { DataFilter, DataResolver, MaterializedEntity } from "../models/query"

const extractFields = (properties: Property[], additionalFields?: string[]) => {
  const fieldMap = new Map<string, string>()
  for (const p of properties) {
    if (
      p.kind === "number" ||
      p.kind === "text" ||
      (p.kind === "entityValue" && !p.oneToOneBackingField)
    ) {
      fieldMap.set(p.backingField, p.label)
    } else if (p.kind === "table") {
      for (let i = 0; i < p.rows.length; ++i) {
        for (let j = 0; j < p.columns.length; ++j) {
          const f = p.cellField(j, i)
          fieldMap.set(f, f)
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
  ...Object.keys(data).reduce(
    (agg, k) => ({ ...agg, [fieldMap.get(k) ?? k]: data[k] }),
    {}
  ),
  schema: s.name,
  id: data[s.pkField]
})

const toMap = <T>(items: T[], key: (x: T) => string | number) => {
  var m = new Map<string | number, T>()
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
  const fetched = await resolver.fetch(
    {
      model: schema.backingModel,
      filter
    },
    [...fieldMap.keys()]
  )
  const entities: MaterializedEntity[] = []
  for (const fieldValues of fetched) {
    const id = fieldValues[schema.pkField]
    if (!id) {
      throw new Error(
        `The PK field '${schema.pkField}' was not fetched by the data resolver`
      )
    }
    const entity = bindEntity(schema, fieldValues, fieldMap)
    for (const p of schema.properties) {
      if (!!options?.shallow) {
        // This loop's purpose is to fetch related entities.
        break
      }
      if (p.kind === "entityValue") {
        let f: DataFilter | undefined = undefined
        const linkedSchema = getSchema(p.linkedEntitySchema)
        if (p.oneToOneBackingField) {
          // Fetch the entity (if any) by matching the FK column in the right
          // side entity to the PK in the left side.
          f = { field: p.oneToOneBackingField, value: id }
        } else {
          // Fetch the entity by its PK, whose value is a FK in the left side.
          const fkValue = fieldValues[p.backingField]
          if (fkValue !== null) {
            f = { field: linkedSchema.pkField, value: fkValue }
          }
        }
        if (f) {
          entity[p.label] = singleOrNull(
            await fetchEntities(linkedSchema, [f], resolver)
          )
        }
      } else if (p.kind === "entityList") {
        const m2m = await fetchEntities(
          getSchema(p.manyToManyEntity),
          [{ field: p.leftSideBackingField, value: id }],
          resolver,
          // Ensure that we have the right side ids for later matching. We are
          // performing a shallow fetch since the left side is the current
          // entity and we will next fetch all the right side entities in bulk.
          // This assumes that the M2M entity only have these two FKs, which is
          // a reasonable assumption and valid for Voyages.
          { additionalFields: [p.rightSideBackingField], shallow: true }
        )
        const linkedSchema = getSchema(p.linkedEntitySchema)
        const matches = toMap(
          await fetchEntities(
            linkedSchema,
            [
              {
                field: linkedSchema.pkField,
                operator: "IN",
                value: m2m
                  .map((v) => v[p.rightSideBackingField])
                  .filter((v) => v !== null)
              }
            ],
            resolver
          ),
          (e) => e.id
        )
        // Now every entry in the m2m relation should have a match in matches.
        for (const item of m2m) {
          const pkRight = item[p.rightSideBackingField]
          if (!pkRight || typeof pkRight === "object") {
            throw new Error(
              `Fetch on M2M did not return an id value for the right backing field '${p.rightSideBackingField}'`
            )
          }
          const m = matches.get(pkRight)
          if (!m) {
            throw new Error(
              `Could not find the entity linked by an M2M: ${p.linkedEntitySchema}, right=${pkRight}`
            )
          }
          // Replace the key by the entity.
          item[p.rightSideBackingField] = m
        }
        entity[p.label] = m2m
      }
    }
    entities.push(entity)
  }
  return entities
}
