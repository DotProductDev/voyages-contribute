import { Contribution, PublicationBatch } from "../models"
import { importCSV } from "./csv"
import readline from "node:readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const asyncReadline = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, resolve)
  })
}

const args = process.argv.slice(2)

if (args.length < 3) {
  console.error(
    "Usage: tsx command.ts <apiUrl> <schemaName> <filename> (<maxRows>)"
  )
} else {
  const maxRows = args.length >= 3 ? parseInt(args[3], 10) : undefined
  const [apiUrl, schemaName, filename] = args
  const errors: Record<string, number[]> = {}
  const updates = await importCSV(apiUrl, schemaName, filename, errors, maxRows)
  if (Object.keys(errors).length > 0) {
    for (const [key, rows] of Object.entries(errors)) {
      console.error(
        `Error '${key}' in rows: ${rows.map((r) => r + 1).join(", ")}`
      )
    }
    const userRes = await asyncReadline(
      "Do you want to continue with the import? (yes/no) "
    )
    if (userRes.toLowerCase() !== "yes") {
      console.log("Import cancelled by user.")
      rl.close()
      process.exit(0)
    }
  }
  // Create batch if not exists.
  const batchRes = await fetch(`${apiUrl}/create_batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: `Import of ${schemaName} from ${filename}`,
      comments: `Batch created for import of ${schemaName} from CSV file ${filename}`
    })
  })
  let batch: PublicationBatch
  if (batchRes.status === 409) {
    batch = (await batchRes.json()).existing
  } else if (batchRes.status === 201) {
    batch = await batchRes.json()
  } else {
    throw new Error(
      `Failed to create or retrieve publication batch: ${await batchRes.text()}.`
    )
  }
  console.log(`Using batch: ${batch.title}`)
  let pushed = 0
  // Map all errors to row numbers (duplicate errors are common).
  for (const update of updates) {
    // console.dir(update, { depth: null })
    const contrib: Contribution = {
      id: `${schemaName}.${schemaName}.${update.entityRef.id}`,
      root: update.entityRef,
      changeSet: {
        id: crypto.randomUUID(),
        author: "CSV importer script",
        changes: [update],
        comments: `Imported from CSV file ${filename} on ${new Date().toISOString()}`,
        title: `Import of ${schemaName} #${update.entityRef.id}`,
        timestamp: Date.now()
      },
      status: 0, // ContributionStatus.WorkInProgress,
      reviews: [],
      media: [],
      batch
    }
    const contribRes = await fetch(`${apiUrl}/contributions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contrib)
    })
    if (contribRes.status !== 201) {
      console.error(
        `Failed to submit contribution for ${update.entityRef.id}: ${await contribRes.text()}`
      )
      break
    }
    // TODO: submit as a contribution to the API.
    pushed++
  }
  console.log(
    `Successfully pushed ${pushed}/${updates.length} updates to the API for batch ${batch.title}.`
  )
  process.exit(0)
}
