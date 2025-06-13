// Node.js file reading
import fs from "fs"
import Papa from "papaparse"
import { DataMapping, MapDataSourceToChangeSets } from "./importer"
import { createApiLookup } from "./lookup"
import { voyageMapping } from "./voyageMapping"
import { EntitySchema, VoyageSchema } from "../models/entities"

const AllMappings: Record<
  string,
  { mapping: DataMapping; schema: EntitySchema }
> = {}
AllMappings["Voyage"] = { mapping: voyageMapping, schema: VoyageSchema }

export const importCSV = (
  apiUrl: string,
  schemaName: string,
  filename: string
) => {
  const csvContent = fs.readFileSync(filename, "utf8")
  const parsed = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false
  })
  const data = parsed.data as Record<string, string>[]
  const match = AllMappings[schemaName]
  if (match === undefined) {
    throw new Error(`No mapping found for schema: ${schemaName}`)
  }
  const { mapping, schema } = match
  const lookup = createApiLookup(apiUrl)
  return MapDataSourceToChangeSets(data, mapping, schema, lookup)
}
