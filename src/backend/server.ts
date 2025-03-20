import express, { Request, Response, NextFunction } from "express"
import { initDatabase, DatabaseService } from "./db"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import { ContributionStatus } from "../models/contribution"
// Load environment variables
dotenv.config()

// Initialize the app
const app = express()
const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET || "dummy-secret"

// Local debug JWT:
// eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiV2ViVUkiLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkNvbnRyaWJ1dGVBcHAiLCJleHAiOjM5NTE0NzM0NzIsImlhdCI6MTc0MjQ4NDY3Mn0.11NiAwJt59AyIUF4gO04IUr8earCFQPsQPVXyeMydD0

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Database service
let dbService: DatabaseService

// JWT authentication middleware
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ error: "Authorization header missing" })
    return
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    res.status(401).json({ error: "Token missing" })
    return
  }

  try {
    const user = jwt.verify(token, JWT_SECRET)
    ;(req as any).user = user
    next() // Call next() to proceed to the next middleware or route handler
  } catch {
    res.status(403).json({ error: "Invalid or expired token" })
    // No return needed here since we're ending the response
  }
}

// Routes
app.get("/", (_, res) => {
  res.json({ message: "Contributions API running" })
})

// Get all contributions with filtering, sorting and pagination
app.get("/contributions", authenticateJWT, async (req, res) => {
  try {
    // Parse query parameters
    const page = req.query.page ? parseInt(req.query.page as string) : 1
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10
    const sortBy = (req.query.sortBy as "author" | "timestamp") || "timestamp"
    const sortOrder = (req.query.sortOrder as "ASC" | "DESC") || "DESC"

    // Parse status filter (can be single value or array)
    let status: ContributionStatus | ContributionStatus[] | undefined =
      undefined
    if (req.query.status !== undefined) {
      if (Array.isArray(req.query.status)) {
        // Multiple status values
        status = (req.query.status as string[]).map(
          (s) => parseInt(s) as ContributionStatus
        )
      } else {
        // Single status value
        status = parseInt(req.query.status as string) as ContributionStatus
      }
    }

    const result = await dbService.listContributions({
      page,
      limit,
      status,
      sortBy,
      sortOrder
    })

    // Add pagination links to the response
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`
    const totalPages = Math.ceil(result.total / result.limit)

    const response = {
      ...result,
      totalPages,
      links: {
        self: `${baseUrl}?page=${result.page}&limit=${result.limit}`,
        first: `${baseUrl}?page=1&limit=${result.limit}`,
        last: `${baseUrl}?page=${totalPages}&limit=${result.limit}`,
        next:
          result.page < totalPages
            ? `${baseUrl}?page=${result.page + 1}&limit=${result.limit}`
            : null,
        prev:
          result.page > 1
            ? `${baseUrl}?page=${result.page - 1}&limit=${result.limit}`
            : null
      }
    }

    res.json(response)
  } catch (error) {
    console.error("Error fetching contributions:", error)
    res.status(500).json({
      error: "Failed to fetch contributions",
      details: (error as Error).message
    })
  }
})

// Get contribution by ID
app.get("/contributions/:id", authenticateJWT, async (req, res) => {
  try {
    const contribution = await dbService.getContribution(req.params.id)

    if (!contribution) {
      res.status(404).json({ error: "Contribution not found" })
      return
    }

    res.json(contribution)
  } catch (error) {
    console.error(`Error fetching contribution ${req.params.id}:`, error)
    res.status(500).json({ error: "Failed to fetch contribution" })
  }
})

// Create new contribution
app.post("/contributions", authenticateJWT, async (req, res) => {
  try {
    // Extract user info from JWT
    const user = (req as any).user

    // Create contribution with author from JWT
    const contributionData = {
      ...req.body,
      changeSet: {
        ...req.body.changeSet,
        author: user.name || user.email || "Unknown",
        timestamp: Date.now()
      }
    }

    const contribution = await dbService.createContribution(contributionData)
    res.status(201).json(contribution)
  } catch (error) {
    console.error("Error creating contribution:", error)
    res.status(500).json({ error: "Failed to create contribution" })
  }
})

// Update contribution
app.put("/contributions/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedContribution = await dbService.updateContribution(
      req.params.id,
      req.body
    )

    if (!updatedContribution) {
      res.status(404).json({ error: "Contribution not found" })
      return
    }

    res.json(updatedContribution)
  } catch (error) {
    console.error(`Error updating contribution ${req.params.id}:`, error)
    res.status(500).json({ error: "Failed to update contribution" })
  }
})

// Delete contribution
app.delete("/contributions/:id", authenticateJWT, async (req, res) => {
  try {
    const success = await dbService.deleteContribution(req.params.id)

    if (!success) {
      res.status(404).json({ error: "Contribution not found" })
      return
    }

    res.status(204).send()
  } catch (error) {
    console.error(`Error deleting contribution ${req.params.id}:`, error)
    res.status(500).json({ error: "Failed to delete contribution" })
  }
})

// Start the server
export const startServer = async () => {
  try {
    // Initialize database
    await initDatabase()
    console.log("Database initialized")

    // Create database service
    dbService = new DatabaseService()

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}
