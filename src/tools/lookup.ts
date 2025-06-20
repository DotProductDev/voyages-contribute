import { EntitySchema, MaterializedEntity } from "../models"
import { EntityLookUp } from "./importer"

const getCacheEntry = async (
  url: string,
  schema: EntitySchema,
  field: string
): Promise<Record<string, MaterializedEntity>> => {
  const res = await fetch(`${url}/enumerate/${schema.name}`)
  const items: MaterializedEntity[] = await res.json()
  const data: Record<string, MaterializedEntity> = {}
  for (const item of items) {
    const rowKey = String(item.data[field])
    if (rowKey) {
      data[rowKey] = item
    }
  }
  return data
}

export const createApiLookup = (url: string): EntityLookUp => {
  const cache: Record<string, Promise<Record<string, MaterializedEntity>>> = {}
  return {
    lookup: async (schema: EntitySchema, field: string, value: string) => {
      const key = `${schema.name}:${field}`
      let data = cache[key]
      if (data === undefined) {
        cache[key] = data = getCacheEntry(url, schema, field)
      }
      // We already have a cache of the entity_field pair.
      const items = await data
      return items[value] || null
    }
  }
}
