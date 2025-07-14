import {
  EntitySchema,
  getSchema,
  getSchemaProp,
  MaterializedEntity
} from "../models"
import { EntityLookUp } from "./importer"

const getCacheEntry = async (
  url: string,
  schema: EntitySchema,
  field: string
): Promise<Record<string, MaterializedEntity>> => {
  try {
    const res = await fetch(new URL(`${url}/enumerate/${schema.name}`))
    const items: MaterializedEntity[] = await res.json()
    const data: Record<string, MaterializedEntity> = {}
    const nonUnique: Set<string> = new Set()
    for (const item of items) {
      const rowKey = String(item.data[field])
      if (rowKey) {
        if (data[rowKey]) {
          // If we already have this key, mark it as non-unique.
          nonUnique.add(rowKey)
        }
        data[rowKey] = item
      }
    }
    // Remove non-unique keys.
    for (const key of nonUnique) {
      delete data[key]
    }
    return data
  } catch (err) {
    console.error(
      `Error fetching data for schema "${schema.name}" and field "${field}":`,
      err
    )
    return await getCacheEntry(url, schema, field)
  }
}

export const createApiLookup = (url: string): EntityLookUp => {
  const cache: Record<string, Promise<Record<string, MaterializedEntity>>> = {}
  const lookup: EntityLookUp["lookup"] = async (
    schema: EntitySchema,
    field: string,
    value: string | string[]
  ) => {
    const idxDot = field.indexOf(".")
    if (idxDot !== -1) {
      const nested = field.slice(idxDot + 1)
      field = field.slice(0, idxDot)
      // Ensure that the field is a LinkedEntity field.
      let prop = getSchemaProp(schema, field)
      if (prop?.kind !== "linkedEntity") {
        throw new Error(
          `Field "${field}" is not a linked entity field in schema "${schema.name}".`
        )
      }
      const linked = await lookup(
        getSchema(prop.linkedEntitySchema),
        nested,
        value
      )
      if (linked === null) {
        return null
      }
      field = `${field.slice(0, idxDot)} id`
      prop = getSchemaProp(schema, field)
      if (prop?.kind !== "text" && prop?.kind !== "number") {
        throw new Error(
          `Field "${field}" is not a plain field in schema "${schema.name}".`
        )
      }
      value = String(linked.entityRef.id)
    }
    const key = `${schema.name}:${field}`
    let data = cache[key]
    if (data === undefined) {
      cache[key] = data = getCacheEntry(url, schema, field)
    }
    // We already have a cache of the entity_field pair.
    const items = await data
    if (typeof value === "string") {
      return items[value] || null
    }
    for (const v of value) {
      if (items[v]) {
        return items[v]
      }
    }
    return null
  }
  return {
    lookup
  }
}
