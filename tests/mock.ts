import { DataResolver, DbConnection } from "../src/models/query"
import { DbDataResolver } from "../src/backend/dataResolvers"

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
    const isList = query.filter.find((f) => f.operator === "IN")
    const mocked = (isList ? [1, 2, 3, 4, 5] : [1]).map((i) =>
      dummyRecord(fields, i)
    )
    return mocked
  }
}
