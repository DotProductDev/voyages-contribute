import { importCSV } from "./csv"

const args = process.argv.slice(2)

if (args.length !== 3) {
  console.error("Usage: tsx command.ts <apiUrl> <schemaName> <filename>")
} else {
  const updates = await importCSV(args[0], args[1], args[2])
  for (const update of updates) {
    console.dir(update, { depth: null })
    // TODO: submit as a contribution to the API.
  }
}
