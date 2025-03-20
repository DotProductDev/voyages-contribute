// This is a temporary API that will be replaced by Voyages APIs soon.

import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import { getSchema } from "./models/entities"
import { MySQLDb } from "./backend/mysqlDb"
import { DbDataResolver } from "./backend/dataResolvers"
import { EntityData, MaterializedEntity } from "./models/materialization"
import { fetchEntities } from "./backend/entityFetch"

let resolver: DbDataResolver = null!

// Create Express app
const app = express()
const PORT = process.env.PORT || 7127

// Middleware
app.use(express.json()) // Parse JSON bodies
app.use(cors()) // Enable CORS for all routes

const router = express.Router()

/**
 * Perform a shallow enumeration of the schema.
 */
const enumSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const schema = getSchema(req.params.schema)
    const fields = schema.properties.filter(
      (p) => p.kind === "text" || p.kind === "number"
    )
    const map = fields.reduce(
      (d, f) => {
        d[f.backingField] = f.label
        return d
      },
      {} as Record<string, string>
    )
    const data = await resolver.fetch({
      query: {
        model: schema.backingTable,
        filter: []
      },
      fields: [...fields.map((p) => p.backingField), schema.pkField]
    })
    res.status(200).json(
      data.map((item) => {
        // Remap fields
        const conv: EntityData = {}
        for (const [key, val] of Object.entries(item)) {
          conv[map[key] ?? key] = val
        }
        return {
          entityRef: {
            type: "existing",
            id: item[schema.pkField],
            schema: schema.name
          },
          data: conv,
          state: "lazy"
        } as MaterializedEntity
      })
    )
  } catch (error) {
    next(error)
  }
}

const matEntity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const schema = getSchema(req.params.schema)
    const result = await fetchEntities(
      schema,
      [
        {
          field: schema.pkField,
          value: req.params.id
        }
      ],
      resolver
    )
    if (result.length !== 1) {
      res.status(404)
    } else {
      res.status(200).json(result[0])
    }
  } catch (error) {
    next(error)
  }
}

router.get("/enumerate/:schema", enumSchema)
router.get("/materialize/:schema/:id", matEntity)
app.use(router)

export const startLocalApi = async () => {
  // Connect to the db.
  const db = new MySQLDb(true)
  await db.init()
  resolver = new DbDataResolver(db)
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}