import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler
} from "express"
import { initDatabase, DatabaseService } from "./db"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import {
  combineContributionChanges,
  Contribution,
  ContributionMedia,
  ContributionStatus
} from "../models/contribution"
import { ApiBatchResolver, DebouncedResolver } from "./dataResolvers"
import { DataResolver } from "../models/query"
import { getSchema } from "../models/entities"
import { EntityData, MaterializedEntity } from "../models/materialization"
import { fetchEntities } from "./entityFetch"
import multer from "multer"
import path from "path"
import fs from "fs/promises"
import { foldCombinedChanges } from "../models"

// Load environment variables
dotenv.config()

// Initialize the app
const app = express()
const PORT = process.env.PORT || 7127
const JWT_SECRET = process.env.JWT_SECRET || "dummy-secret"

const VOYAGES_SERVER_URL =
  process.env.VOYAGES_SERVER_URL || "http://127.0.0.1:8000"
const VOYAGES_API_DATA_URL = `${VOYAGES_SERVER_URL}/contrib/data`
const VOYAGES_API_AUTH_TOKEN = process.env.VOYAGES_API_AUTH_TOKEN || ""

// Configure multer for file uploads
const uploadDir = process.env.MEDIA_UPLOAD_FOLDER || "./uploads"

// Ensure upload directory exists
const ensureUploadDir = async () => {
  try {
    await fs.access(uploadDir)
  } catch {
    await fs.mkdir(uploadDir, { recursive: true })
  }
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    await ensureUploadDir()
    cb(null, uploadDir)
  },
  filename: (_req, file, cb) => {
    // Generate unique filename: timestamp_originalname
    const timestamp = Date.now()
    const ext = path.extname(file.originalname)
    const nameWithoutExt = path.basename(file.originalname, ext)
    const safeFilename = `${timestamp}_${nameWithoutExt}${ext}`
    cb(null, safeFilename)
  }
})

// File filter for security
const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Define allowed file types
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "application/pdf",
    "text/plain"
  ]
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error(`File type ${file.mimetype} not allowed`))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30MB limit
    files: 1 // Only one file per request
  }
})

// Function to infer media type from MIME type
const inferMediaTypeFromMime = (
  mimeType: string
): ContributionMedia["type"] => {
  if (mimeType.startsWith("image/")) {
    return "image"
  }
  if (mimeType.startsWith("audio/")) {
    return "audio"
  }
  // Everything else (PDFs, text files, etc.) is considered a document
  return "document"
}

// Local debug JWT:
// eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiV2ViVUkiLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkNvbnRyaWJ1dGVBcHAiLCJleHAiOjM5NTE0NzM0NzIsImlhdCI6MTc0MjQ4NDY3Mn0.11NiAwJt59AyIUF4gO04IUr8earCFQPsQPVXyeMydD0

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Database service
let dbService: DatabaseService
let resolver: DataResolver

// JWT authentication middleware
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  if (JWT_SECRET === "dummy-secret") {
    // TODO: remove this when auth is implemented.
    next()
    return
  }
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
    const batchId =
      req.query.batch_id !== undefined
        ? typeof req.query.batch_id === "string" &&
          req.query.batch_id !== "null"
          ? parseInt(req.query.batch_id)
          : null
        : undefined
    const sortBy = (req.query.sortBy as "author" | "timestamp" | "id") || "id"
    const sortOrder = (req.query.sortOrder as "ASC" | "DESC") || "ASC"

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

    console.log(batchId)
    const result = await dbService.listContributions({
      page,
      limit,
      status,
      batchId,
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

// Create new/replace contribution
app.post("/contributions", authenticateJWT, async (req, res) => {
  try {
    // Extract user info from JWT
    const user = (req as any).user
    const author =
      user?.username ||
      user?.name ||
      user?.email ||
      req.body?.changeSet?.author ||
      "Unknown"
    // Check if contribution already exists
    const existing = await dbService.getContribution(req.body.id)
    // If existing it must match the user.
    if (existing && existing.changeSet.author !== author) {
      res
        .status(403)
        .json({ error: "You cannot modify contributions made by others" })
      return
    }
    // If the status is not ContributionStatus.WorkInProgress, we must reject
    // the request.
    if (
      existing?.status !== undefined &&
      existing.status !== ContributionStatus.WorkInProgress
    ) {
      res.status(400).json({
        error: `This contribution has status ${existing!.status} and cannot be replaced. Use the APIs to update status/reviews.`
      })
      return
    }
    // Create contribution with author from JWT
    const contributionData = {
      ...req.body,
      changeSet: {
        ...req.body.changeSet,
        id: existing?.changeSet?.id,
        author,
        timestamp: Date.now()
      },
      media: existing?.media ?? [],
      batch: req.body.batch ?? existing?.batch ?? null
    }
    const contribution = await dbService.createContribution(contributionData)
    res.status(201).json(contribution)
  } catch (error) {
    console.error("Error creating contribution:", error)
    res.status(500).json({ error: "Failed to create contribution" })
  }
})

// Change contribution status
app.patch(
  "/contributions/:id/change_status",
  authenticateJWT,
  async (req, res) => {
    try {
      const { status } = req.body
      if (
        typeof status !== "number" ||
        (status !== ContributionStatus.Published &&
          status !== ContributionStatus.Accepted &&
          status !== ContributionStatus.Submitted &&
          status !== ContributionStatus.Rejected)
      ) {
        res.status(400).json({
          error: "Invalid status",
          details:
            "Status value must be one of: Published, Accepted, Submitted, Rejected"
        })
        return
      }
      const existing = await dbService.getContribution(req.body.id)
      if (!existing) {
        res.status(404).json({ error: "Contribution not found" })
        return
      }
      let updatedContribution = { ...existing, status }
      updatedContribution =
        await dbService.createContribution(updatedContribution)
      res.json(updatedContribution)
    } catch (error) {
      console.error(
        `Error changing status for contribution ${req.params.id}:`,
        error
      )
      res.status(500).json({
        error: "Failed to change contribution status",
        details: (error as Error).message
      })
    }
  }
)

// Add review to contribution
app.post("/contributions/:id/add_review", authenticateJWT, async (req, res) => {
  try {
    const user = (req as any).user
    const { changeSet } = req.body
    // Validate required fields
    if (!changeSet) {
      res.status(400).json({
        error: "Invalid review data",
        details: "changeSet is required"
      })
      return
    }
    // Add author and timestamp to changeSet if not provided
    const reviewChangeSet = {
      ...changeSet,
      author: changeSet.author || user?.name || user?.email || "Unknown",
      timestamp: changeSet.timestamp || Date.now()
    }
    const updatedContribution = await dbService.addReviewToContribution(
      req.params.id,
      reviewChangeSet
    )
    if (!updatedContribution) {
      res.status(404).json({ error: "Contribution not found" })
      return
    }
    res.status(201).json(updatedContribution)
  } catch (error) {
    console.error(
      `Error adding review to contribution ${req.params.id}:`,
      error
    )
    res.status(500).json({
      error: "Failed to add review",
      details: (error as Error).message
    })
  }
})

// Upload media for contribution
app.post(
  "/contributions/:id/upload_media",
  authenticateJWT,
  upload.single("file"),
  async (req, res) => {
    try {
      const contributionId = req.params.id
      const uploadedFile = req.file
      const { name, comments } = req.body
      // Validate required fields
      if (!uploadedFile) {
        res.status(400).json({
          error: "No file uploaded",
          details: "A file must be provided"
        })
        return
      }
      const type = inferMediaTypeFromMime(uploadedFile.mimetype)
      if (!type || !name) {
        // Clean up uploaded file if validation fails
        await fs.unlink(uploadedFile.path).catch(() => {})
        res.status(400).json({
          error: "Missing required fields",
          details: "Name is required"
        })
        return
      }
      const mediaData = {
        type,
        file: uploadedFile.filename, // Store the generated filename
        name,
        comments: comments || "",
        fileSize: uploadedFile.size,
        mimeType: uploadedFile.mimetype,
        originalName: uploadedFile.originalname
      }
      const updatedContribution = await dbService.addMediaToContribution(
        contributionId,
        mediaData
      )
      if (!updatedContribution) {
        // Clean up uploaded file if contribution not found
        await fs.unlink(uploadedFile.path).catch(() => {})
        res.status(404).json({ error: "Contribution not found" })
        return
      }
      res.status(201).json({
        contribution: updatedContribution,
        uploadedFile: {
          filename: uploadedFile.filename,
          originalName: uploadedFile.originalname,
          size: uploadedFile.size,
          mimeType: uploadedFile.mimetype
        }
      })
    } catch (error) {
      // Clean up uploaded file on error
      if (req.file) {
        await fs.unlink(req.file.path).catch(() => {})
      }
      console.error(
        `Error uploading media for contribution ${req.params.id}:`,
        error
      )
      // Handle multer errors specially
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          res.status(400).json({
            error: "File too large",
            details: "Maximum file size is 50MB"
          })
          return
        }
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
          res.status(400).json({
            error: "Unexpected file field",
            details: "Use 'file' as the field name for uploads"
          })
          return
        }
      }

      res.status(500).json({
        error: "Failed to upload media",
        details: (error as Error).message
      })
    }
  }
)

// Delete media from contribution
app.delete("/media/:mediaId", authenticateJWT, async (req, res) => {
  try {
    const mediaId = parseInt(req.params.mediaId)
    if (isNaN(mediaId)) {
      res.status(400).json({
        error: "Invalid media ID",
        details: "Media ID must be a number"
      })
      return
    }
    // Get the media info first (need file path for deletion)
    const media = await dbService.getMediaById(mediaId)
    if (!media) {
      res.status(404).json({ error: "Media not found" })
      return
    }
    // Delete the file from disk
    const filePath = path.join(uploadDir, media.file)
    try {
      await fs.unlink(filePath)
    } catch (error) {
      console.warn(`Failed to delete file ${filePath}:`, error)
      // Continue with database deletion even if file deletion fails
    }
    // Delete from database
    const success = await dbService.removeMedia(mediaId)
    if (!success) {
      res.status(500).json({
        error: "Failed to remove media from database"
      })
      return
    }

    res.status(204).send()
  } catch (error) {
    console.error(`Error deleting media ${req.params.mediaId}:`, error)
    res.status(500).json({
      error: "Failed to delete media",
      details: (error as Error).message
    })
  }
})

// Create publication batch
app.post("/create_batch", authenticateJWT, async (req, res) => {
  try {
    const { title, comments } = req.body
    // Validate required fields
    if (!title) {
      res.status(400).json({
        error: "Missing required fields",
        details: "title is required"
      })
      return
    }
    const existing = await dbService.getBatchByTitle(title)
    if (existing) {
      res.status(409).json({
        error: "Batch with this title already exists",
        existing
      })
      return
    }
    const batchData = {
      title,
      comments: comments || ""
    }
    const createdBatch = await dbService.createPublicationBatch(batchData)
    res.status(201).json(createdBatch)
  } catch (error) {
    console.error("Error creating publication batch:", error)
    res.status(500).json({
      error: "Failed to create publication batch",
      details: (error as Error).message
    })
  }
})

// Assign contribution to batch
app.patch("/assign_to_batch", authenticateJWT, async (req, res) => {
  try {
    const { contribution_id, batch_id } = req.body
    // Validate required fields
    if (!contribution_id) {
      res.status(400).json({
        error: "Missing required fields",
        details: "contribution_id is required"
      })
      return
    }
    // batch_id can be null to clear assignment
    const updatedContribution = await dbService.assignContributionToBatch(
      contribution_id,
      batch_id
    )
    if ("error" in updatedContribution) {
      res.status(400).json({
        error: updatedContribution.error
      })
      return
    }
    res.json(updatedContribution)
  } catch (error) {
    console.error(
      `Error assigning contribution ${req.body.contribution_id} to batch:`,
      error
    )
    res.status(500).json({
      error: "Failed to assign contribution to batch",
      details: (error as Error).message
    })
  }
})

// Get batches by status
app.get("/batches/:filter", authenticateJWT, async (req, res) => {
  try {
    const filter = req.params.filter
    // Validate filter parameter
    if (!["all", "published", "pending"].includes(filter)) {
      res.status(400).json({
        error: "Invalid filter parameter",
        details: "filter must be one of: all, published, pending"
      })
      return
    }
    const batches = await dbService.getBatchesByStatus(
      filter as "all" | "published" | "pending"
    )
    res.json({
      filter,
      count: batches.length,
      batches
    })
  } catch (error) {
    console.error(
      `Error retrieving batches with filter ${req.params.filter}:`,
      error
    )
    res.status(500).json({
      error: "Failed to retrieve batches",
      details: (error as Error).message
    })
  }
})

// Publish contributions or batches
app.post("/publish", authenticateJWT, async (req, res) => {
  try {
    const { id, mode } = req.body
    // Validate required fields
    if (!id || (mode !== "batch" && mode !== "contribution")) {
      res.status(400).json({
        error: "Missing required fields",
        details: "id and mode are required"
      })
      return
    }
    let contributions: Contribution[]
    if (mode === "batch") {
      const batchContributions = await dbService.getBatchContributions(
        id,
        ContributionStatus.Accepted
      )
      if (!batchContributions) {
        res.status(404).json({
          error: "Batch not found or no Accepted contributions are in the batch"
        })
        return
      }
      contributions = batchContributions
    } else {
      const contribution = await dbService.getContribution(id)
      if (!contribution) {
        res.status(404).json({
          error: "Contribution not found"
        })
        return
      }
      if (contribution.status !== ContributionStatus.Accepted) {
        res.status(404).json({
          error: "Contribution status must be Accepted"
        })
        return
      }
      contributions = [contribution]
    }
    if (contributions.length === 0) {
      res.status(400).json("No accepted contributions found in batch")
      return
    }
    // For each contribution we flatten the changeSet + reviews.
    const changeset = foldCombinedChanges(
      contributions.map((c) => ({
        ...combineContributionChanges(c),
        // Use a short label since this will appear a lot in the final JSON
        label: String(c.id)
      }))
    )
    const { conflicts, validation } = changeset
    if (
      conflicts.length > 0 ||
      validation.filter((v) => v.kind === "error").length > 0
    ) {
      // Cannot go through with updates as there are conflicts.
      res.status(400).json({
        conflicts,
        validation,
        error: `The publication has ${conflicts.length} conflicts and ${validation.filter((v) => v.kind === "error").length} validation errors.`
      })
      return
    }
    // Log to debug POST.
    // await fs.writeFile(
    //   "output/debug.json",
    //   JSON.stringify(changeset, null, 2)
    // )
    // Call the API with an idempotency key that is determined by the
    // publication request. This would prevent multiple requests being made (e.g.
    // by an eager user clicking a button multiple times).
    const pubRes = await fetch(`${VOYAGES_SERVER_URL}/contrib/publish_batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: `${id}_${mode}`,
        changeset
      })
    })
    // TODO: once the publication is done, we need to change the status from
    // Accepted => Published. This could also involve some basic check of direct
    // property values as a basic validation of the publication process.

    // forward the response.
    res.status(pubRes.status).json({ ...(await pubRes.json()), validation })
  } catch (error) {
    console.error("Error publishing batch:", error)
    res.status(500).json({
      error: "Failed to publish batch",
      details: (error as Error).message
    })
  }
})

// Delete contribution
// app.delete("/contributions/:id", authenticateJWT, async (req, res) => {
//   try {
//     const success = await dbService.deleteContribution(req.params.id)
//
//     if (!success) {
//       res.status(404).json({ error: "Contribution not found" })
//       return
//     }
//
//     res.status(204).send()
//   } catch (error) {
//     console.error(`Error deleting contribution ${req.params.id}:`, error)
//     res.status(500).json({ error: "Failed to delete contribution" })
//   }
// })

app.get(
  "/enumerate/:schema",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
)

app.get(
  "/materialize/:schema/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { schema: schemaName, id } = req.params
    // console.log(`Materializing entity ${schemaName} id ${id}`)
    try {
      const schema = getSchema(schemaName)
      const result = await fetchEntities(
        schema,
        [
          {
            field: schema.pkField,
            value: id
          }
        ],
        resolver
      )
      if (result.length !== 1) {
        res.status(404).json("Entity not found")
      } else {
        res.status(200).json(result[0])
      }
    } catch (error) {
      next(error)
    }
  }
)

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _r: Request,
  res: Response,
  _n: NextFunction
): void => {
  console.error(err.stack)
  res.status(500).send(`${err}`)
}

app.use(errorHandler)

// Start the server
export const startServer = async () => {
  try {
    // Initialize database
    await initDatabase()
    console.log("Database initialized")

    // Create database service
    dbService = new DatabaseService()
    resolver = new DebouncedResolver(
      new ApiBatchResolver(VOYAGES_API_DATA_URL, VOYAGES_API_AUTH_TOKEN),
      50
    )

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
