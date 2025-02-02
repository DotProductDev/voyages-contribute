import {
  BatchDataResolver,
  DataResolver,
  DataResolverInput
} from "../src/models/query"
import { DbConnection, DbDataResolver } from "../src/backend/dataResolvers"
import { EntityData, MaterializedEntity } from "../src/models/materialization"
import { getSchema, getSchemaProp } from "../src/models/entities"

const mockDbConnection = (log: string[]): DbConnection => ({
  quoteChar: "`",
  escape: (raw, quotes) => {
    const q = quotes === true ? "'" : ""
    return `${q}${raw}${q}`
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
  const fields = Object.keys(entity.data).filter((label) => {
    const prop = getSchemaProp(schema, label)
    return (
      prop !== undefined && (prop.kind === "number" || prop.kind === "text")
    )
  })
  Object.assign(entity.data, dummyRecord(fields))
  return entity
}

const mockDummyData = (input: DataResolverInput) => {
  const { query, fields } = input
  const isList = query.filter.find((f) => f.operator === "in")
  let mockRecord = dummyRecord
  // For certain entities, the M2M relationship is only consistent in the //
  // produced mock data if we modify the ids to match the entries in the
  // connection table.
  if (query.model === "past_enslaverrole") {
    mockRecord = (f, i) => {
      const r = dummyRecord(f, i)
      r.id = r.id.replace("_id_", "_enslaverrole_id_")
      return r
    }
  }
  const mocked = (isList ? [1, 2, 3, 4, 5] : [1]).map((i) =>
    mockRecord(fields, i)
  )
  return mocked
}

export class MockDataResolver implements DataResolver {
  private readonly resolver: DataResolver
  private readonly log: string[]

  constructor() {
    Object.assign(this, makeDataResolver())
  }

  fetch: DataResolver["fetch"] = async (input) => {
    // Call this just so that we log the generated SQL query
    await this.resolver.fetch(input)
    // Generate dummy data here.
    return mockDummyData(input)
  }

  getLog = () => this.log
}

export class MockBatchResolver implements BatchDataResolver {
  private readonly log: string[] = []
  private round = 0
  private count = 0

  fetchBatch: BatchDataResolver["fetchBatch"] = (batch) => {
    this.round++
    this.log.push(
      `Round ${this.round} requested ${Object.entries(batch).length} entities`
    )
    const res: Record<string, EntityData[]> = {}
    for (const [key, input] of Object.entries(batch)) {
      ++this.count
      res[key] = mockDummyData(input)
    }
    return Promise.resolve(res)
  }

  getQueryCount = () => this.count

  getLog = () => this.log
}
