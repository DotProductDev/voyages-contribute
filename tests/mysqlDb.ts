import { Connection, createConnection, RowDataPacket } from "mysql2/promise"
import { DbConnection, EscapeFunc } from "../src/backend/dataResolvers"

export class MySQLDb implements DbConnection {
  private conn: Connection | null

  readonly quoteChar = "`"

  constructor(private printQueries: boolean) {
    this.conn = null
  }

  init = async () => {
    this.conn = await createConnection({
      host: "localhost",
      user: "root",
      password: "dummy_pwd",
      database: "voyages_api"
    })
  }
  escape: EscapeFunc = (s, _) => s

  execute: DbConnection["execute"] = async (q: string) => {
    if (!this.conn) {
      throw new Error("Connection must be initialized")
    }
    if (this.printQueries) {
      console.log(q)
    }
    const [data] = await this.conn.query<RowDataPacket[]>(q)
    return data
  }
}
