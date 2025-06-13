import { EntityRef, EntitySchema } from "../models"
import { EntityLookUp } from "./importer"

const getCacheEntry = async (
  url: string,
  schema: EntitySchema,
  field: string
): Promise<Record<string, EntityRef>> => {
  const res = await fetch(`${url}/enumerate/${schema.name}`)
  const items = await res.json()
  const data: Record<string, EntityRef> = {}
  for (const item of items) {
    const rowKey = item[field]
    const pk = item[schema.pkField]
    if (rowKey && pk) {
      data[rowKey] = {
        id: pk,
        schema: schema.name,
        type: "existing"
      }
    }
  }
  return data
}

export const createApiLookup = (url: string): EntityLookUp => {
  const cache: Record<string, Promise<Record<string, EntityRef>>> = {}
  return {
    lookup: async (schema: EntitySchema, field: string, value: string) => {
      const key = `${schema.name}:${field}`
      let data = cache[key]
      if (data === undefined) {
        data = getCacheEntry(url, schema, field)
      }
      // We already have a cache of the entity_field pair.
      const items = await data
      return items[value] || null
    }
  }
}
