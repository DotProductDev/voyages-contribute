// Node.js file reading
import fs from "fs"
import Papa, { ParseConfig } from "papaparse"
import { MapDataSourceToChangeSets, TrackedMappingErrors } from "./importer"
import { createApiLookup } from "./lookup"
import { AllMappings } from "./allMappings"

export const parseCSV = (
  filename: string,
  options?: Partial<ParseConfig<Record<string, string>>>
) => {
  const csvContent = fs.readFileSync(filename, "utf8")
  return Papa.parse<Record<string, string>>(csvContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
    transformHeader: (header) => header.toLowerCase(),
    ...options
  })
}

export const getCSVHeaders = async (filename: string) =>
  new Promise<string[]>((resolve) => {
    parseCSV(filename, {
      step: (results, parser) => {
        const headers = Object.keys(results.data || {})
        parser.abort() // Stop parsing after the first row
        resolve(headers.map(s => s.toLowerCase()))
      }
    })
  })

export const importCSV = (
  apiUrl: string,
  schemaName: string,
  filename: string,
  errors: TrackedMappingErrors[],
  maxRows?: number
) => {
  const { data } = parseCSV(filename)
  const match = AllMappings[schemaName]
  if (match === undefined) {
    throw new Error(`No mapping found for schema: ${schemaName}`)
  }
  const { mapping, schema } = match
  const lookup = createApiLookup(apiUrl)
  return MapDataSourceToChangeSets(
    data,
    mapping,
    schema,
    lookup,
    errors,
    maxRows
  )
}
