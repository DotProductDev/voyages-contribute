import { isMaterializedEntity, NonNullFieldValue } from "../models/materialization"
import {
  DataResolver,
  DbConnection,
  EscapeFunc
} from "../models/query"

const mapOperator = (operator?: string) => {
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
    return `(${value.map((v) => mapValue(escape, v)).join(", ")})`
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

export class DbDataResolver implements DataResolver {
  public constructor(private readonly conn: DbConnection) {}

  fetch: DataResolver["fetch"] = (query, fields) => {
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
    return execute(sql)
  }
}
