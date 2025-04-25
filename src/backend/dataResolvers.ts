import {
  BaseFieldValue,
  isMaterializedEntity,
  NonNullFieldValue
} from "../models/materialization"
import {
  BatchDataResolver,
  DataOperator,
  DataResolver,
  DataResolverInput,
  ResolvedEntityData
} from "../models/query"

const mapOperator = (operator?: DataOperator) => {
  if (operator === undefined || operator === "equals") {
    return " = "
  }
  if (operator === "in") {
    return " IN "
  }
  throw new Error(`Unknown operator ${operator}`)
}

const mapValue = (
  escape: EscapeFunc,
  value: NonNullFieldValue | NonNullFieldValue[]
): string => {
  if (Array.isArray(value)) {
    return `(${value.map((v: NonNullFieldValue) => mapValue(escape, v)).join(", ")})`
  }
  if (typeof value === "number") {
    // Numbers do not require escaping or quotes.
    return value.toString()
  }
  if (typeof value === "string") {
    return escape(value, true)
  }
  if (isMaterializedEntity(value)) {
    return mapValue(escape, value.entityRef.id)
  }
  throw new Error(`Unsupported value type ${value}`)
}

// Note: the current DbDataResolver is using raw SQL queries but in the future,
// if the need arises, an ORM may be used. For now, the queries are quite simple
// and can be fully audited.

export type EscapeFunc = (raw: string, useQuotes?: boolean) => string

export interface DbConnection {
  quoteChar: string

  escape: EscapeFunc

  execute: (q: string) => Promise<Record<string, BaseFieldValue | null>[]>
}

export class DbDataResolver implements DataResolver {
  public constructor(private readonly conn: DbConnection) {}

  fetch: DataResolver["fetch"] = async ({ query, fields }) => {
    const { quoteChar: q, escape, execute } = this.conn
    const projection = fields.map((f) => `${q}${escape(f)}${q}`).join(", ")
    const where = query.filter.map(
      (df) =>
        `${q}${escape(df.field)}${q}${mapOperator(df.operator)}${mapValue(
          escape,
          df.value
        )}`
    )
    const sql = `SELECT ${projection} FROM ${escape(query.model)}${
      where.length > 0 ? " WHERE " : ""
    }${where.join(" AND ")}`
    const result = await execute(sql)
    // console.dir({ query, fields }, { depth: null })
    // console.dir(result, { depth: null })
    return result
  }
}

interface DataFetch extends DataResolverInput {
  res: (data: ResolvedEntityData[]) => void
  rej: (reason?: string) => void
  id: string
}

export class ApiBatchResolver implements BatchDataResolver {
  public constructor(
    private readonly apiUrl: string,
    private readonly authz: string
  ) {}

  fetchBatch: BatchDataResolver["fetchBatch"] = async (batch) => {
    // console.log(this.apiUrl)
    // console.dir(batch, { depth: null })
    const headers: Record<string, string> = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    if (this.authz) {
      headers.Authorization = this.authz
    }
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(batch)
    })
    const results: Record<string, ResolvedEntityData[]> | { error: string } = await response.json()
    if (results.error) {
      throw new Error(`API error: ${results.error}`)
    }
    return results as Record<string, ResolvedEntityData[]>
  }
}

/**
 * This resolver automatically batches multiple queries and dispatches them
 * to a BatchDataResolver. Callers should make sure that fetches are not awaited
 * immediately as this would beat the purpose of the debouncer.
 */
export class DebouncedResolver implements DataResolver {
  private batched: DataFetch[] = []
  private timer: NodeJS.Timeout | null = null
  private nextId = 0

  public constructor(
    private readonly inner: BatchDataResolver,
    private readonly debounce: number
  ) {}

  fetch: DataResolver["fetch"] = ({ query, fields }) => {
    if (this.timer !== null) {
      clearTimeout(this.timer)
    }
    const promise = new Promise<ResolvedEntityData[]>((res, rej) => {
      this.batched.push({ id: `q${++this.nextId}`, res, rej, query, fields })
    })
    this.timer = setTimeout(async () => {
      this.timer = null
      // Ready to send a batch to the API.
      const local = this.batched
      this.batched = []
      const batch = local.reduce(
        (agg, { id, query, fields }) => ({ ...agg, [id]: { query, fields } }),
        {} as Record<string, DataResolverInput>
      )
      try {
        const results = await this.inner.fetchBatch(batch)
        // TODO: Handle API errors
        for (const item of local) {
          const fetched = results[item.id]
          if (fetched) {
            item.res(fetched)
          } else {
            item.rej("API did not yield results for this query!")
          }
        }
      } catch (err) {
        local[0].rej((err as Error).message)
      }
    }, this.debounce)
    return promise
  }
}
