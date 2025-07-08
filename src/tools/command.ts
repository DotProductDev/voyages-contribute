import { Contribution, PublicationBatch } from "../models"
import { AllMappings } from "./allMappings"
import { getCSVHeaders, importCSV } from "./csv"
import readline from "node:readline"
import { debugCheckHeaders } from "./importer"

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

const [cmd] = args
if (cmd === "inspect" && args.length >= 2) {
  const [_, schemaName] = args
  const { mapping } = AllMappings[schemaName]
  const headers = debugCheckHeaders(mapping)
  if (args.length >= 3) {
    const csvHeaders = await getCSVHeaders(args[2])
    const csvHeadersSet = new Set<string>(csvHeaders)
    // Determine any headers which are not in the mapping, and vice versa.
    const missingFromImport = csvHeaders.filter((h) => !headers.has(h))
    const missingFromData = [...headers].filter((h) => !csvHeadersSet.has(h))
    if (missingFromImport.length > 0) {
      console.log(
        `WARNING: The following (${missingFromImport.length}) headers are in the CSV but not in the mapping:
        ${missingFromImport.join(", ")}`
      )
    }
    if (missingFromData.length > 0) {
      console.log(
        `ERROR: The following (${missingFromData.length}) headers were not found in the CSV:
        ${missingFromData.join(", ")}`
      )
    }
  } else {
    console.log(JSON.stringify(headers))
  }
  process.exit(0)
} else if (cmd === "import" && args.length >= 4) {
  const maxRows = args.length >= 5 ? parseInt(args[4], 10) : undefined
  const [_, apiUrl, schemaName, filename] = args
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
} else {
  console.error(
    `Usage: tsx command.ts <command='import'|'inspect'> 
      import <apiUrl> <schemaName> <filename> (<maxRows>)
      inspect <schemaName> (<optional file to extract headers from>)`
  )
}
