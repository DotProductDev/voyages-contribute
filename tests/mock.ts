import { DataResolver } from "../src/models/query"
import { DbConnection, DbDataResolver } from "../src/backend/dataResolvers"
import { MaterializedEntity } from "../src/models/materialization"
import { getSchema, getSchemaProp } from "../src/models/entities"

const mockDbConnection = (log: string[]): DbConnection => ({
  quoteChar: "`",
  escape: (raw, quotes) => {
    const q = quotes === true ? "'" : ""
    return `${q}/${raw}/${q}`
  },
  execute: (q) => {
    log.push(q)
    return Promise.resolve([])
  }
})

const makeDataResolver = () => {
  const log: string[] = []
  return { log, resolver: new DbDataResolver(mockDbConnection(log)) }
}

const dummyRecord = (fields: string[], i?: number) =>
  fields.reduce(
    (rec, f) => ({ ...rec, [f]: `dummy_${f}_${i ?? "x"}` }),
    {} as Record<string, string>
  )

export const fillEntityWithDummies = (entity: MaterializedEntity) => {
  const schema = getSchema(entity.entityRef.schema)
  const fields = Object.keys(entity.data)
    .filter(label => {
      const prop = getSchemaProp(schema, label)
      return prop !== undefined && (prop.kind === "number" || prop.kind === "text")
    })
  Object.assign(entity.data, dummyRecord(fields))
  return entity
}

export class MockDataResolver implements DataResolver {
  private readonly resolver: DataResolver
  private readonly log: string[]

  constructor() {
    Object.assign(this, makeDataResolver())
  }

  fetch: DataResolver["fetch"] = async (query, fields) => {
    // Call this just so that we log the generated SQL query
    await this.resolver.fetch(query, fields)
    // Generate dummy data here.
    const isList = query.filter.find((f) => f.operator === "in")
    let mockRecord = dummyRecord
    // For certain entities, the M2M relationship is only consistent in the //
    // produced mock data if we modify the ids to match the entries in the
    // connection table.
    if (query.model === "enslaver_role") {
      mockRecord = (f, i) => {
        const r = dummyRecord(f, i)
        r.id = r.id.replace("_id_", "_role_")
        return r
      }
    }
    const mocked = (isList ? [1, 2, 3, 4, 5] : [1]).map((i) =>
      mockRecord(fields, i)
    )
    return mocked
  }

  getLog = () => this.log
}
