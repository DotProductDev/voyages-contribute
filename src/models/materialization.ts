import {
  EntityChange,
  EntityRef,
  isEntityRef,
  PropertyChange
} from "./changeSets"
import { EntitySchema, getSchema } from "./entities"

export type NonNullFieldValue =
  | string
  | number
  | MaterializedEntity
  | MaterializedEntity[]

export type FieldValue = NonNullFieldValue | null

export type EntityData = Record<string, FieldValue>

export interface MaterializedEntity {
  id: string
  schema: string
  data: EntityData
  state: "original" | "new" | "modified" | "deleted"
}

export const isMaterializedEntity = (f: FieldValue): f is MaterializedEntity =>
  f !== null &&
  typeof f === "object" &&
  typeof (f as MaterializedEntity).data === "object"

export const isMaterializedEntityArray = (
  f: FieldValue
): f is MaterializedEntity[] => Array.isArray(f)

export const materializeNew = (
  schema: EntitySchema,
  id: string
): MaterializedEntity => {
  const data: EntityData = {}
  for (const p of schema.properties) {
    if (
      (p.kind === "number" || p.kind === "text") &&
      p.backingField === schema.pkField
    ) {
      data[p.label] = id
    } else if (p.kind === "number") {
      data[p.label] = p.notNull ? 0 : null
    } else if (p.kind === "text") {
      data[p.label] = p.nullable ? null : ""
    } else if (p.kind === "entityList") {
      data[p.label] = []
    } else if (p.kind === "entityValue") {
      data[p.label] = p.notNull
        ? materializeNew(getSchema(p.linkedEntitySchema), `${id}_${p.label}`)
        : null
    } else if (p.kind === "table") {
      for (let i = 0; i < p.rows.length; ++i) {
        for (let j = 0; j < p.columns.length; ++j) {
          data[p.cellField(j, i)] = null
        }
      }
    }
  }
  return {
    id,
    schema: schema.name,
    state: "new",
    data
  }
}

export type MaterializedData = {
  [schemaName: string]: { [id: string]: MaterializedEntity }
}

export const expandMaterialized = (
  root: MaterializedEntity
): MaterializedData => {
  const expanded: MaterializedData = {}
  const recurse = (e: MaterializedEntity) => {
    const group = (expanded[e.schema] ??= {})
    group[e.id] = e
    const children = Object.values(e.data).flatMap((f) =>
      isMaterializedEntityArray(f) || isMaterializedEntity(f) ? f : []
    )
    for (const c of children) {
      recurse(c)
    }
  }
  recurse(root)
  return expanded
}

const getEntity = (
  data: MaterializedData,
  entityRef: EntityRef
): MaterializedEntity => {
  const grp = data[entityRef.schema] ?? {}
  const match = grp[entityRef.id]
  if (!match) {
    throw new Error(
      `Could not find referenced entity ${entityRef} in collection`
    )
  }
  return match
}

const applyUpdate = (
  target: MaterializedEntity,
  data: MaterializedData,
  changes: PropertyChange[]
) => {
  if (target.state === "deleted") {
    throw new Error("Cannot update a deleted entity")
  }
  if (target.state === "original") {
    target.state = "modified"
  }
  for (const c of changes) {
    if (c.kind === "direct") {
      target.data[c.property] = isEntityRef(c.changed)
        ? getEntity(data, c.changed)
        : c.changed
    } else if (c.kind === "linked") {
      target.data[c.property] = c.next === null ? null : getEntity(data, c.next)
    } else if (c.kind === "owned") {
      const owned = getEntity(data, c.ownedEntityId)
      target.data[c.property] = applyUpdate(owned, data, c.changes)
    } else if (c.kind === "list") {
      const list = target.data[c.property]
      if (!isMaterializedEntityArray(list)) {
        throw new Error(
          `Expected a materialized entity array for ${c.property}`
        )
      }
      for (const rm of c.removed) {
        const idx = list.findIndex(
          (e) => e.id === rm.id && e.schema === rm.schema
        )
        if (idx < 0) {
          throw new Error(`Cannot remove element: id ${rm.id} not found`)
        }
        list.splice(idx, 1)
      }
      // TODO: handle updates (existing or new items in the list)
      //for (const mod of c.modified) {
      //  mod.
      //}
    } else {
      throw new Error(`Unknown property change type: ${c}`)
    }
  }
  return target
}

/**
 * Apply entity changes to the materialized data. This method
 * assumes that every transitive reference is materialized!
 */
export const applyChanges = (
  data: MaterializedData,
  changes: EntityChange[]
) => {
  for (const change of changes) {
    const match = getEntity(data, change.entityRef)
    if (change.type === "delete") {
      match.state = "deleted"
    } else if (change.type === "undelete") {
      match.state = change.entityRef.type === "new" ? "new" : "modified"
    } else if (change.type === "update") {
      applyUpdate(match, data, change.changes)
    } else {
      throw new Error(`Unknown entity change type: ${change}`)
    }
  }
}
