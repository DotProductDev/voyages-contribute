import { expect, test } from "vitest"
import { MockDataResolver } from "./mock"
import { getSchema } from "../src/models/entities"
import { fetchEntities } from "../src/backend/entityFetch"

test("voyage entity fetch", async () => {
  const resolver = new MockDataResolver()
  const voyageSchema = getSchema("Voyage")
  const result = await fetchEntities(
    voyageSchema,
    [
      {
        field: voyageSchema.pkField,
        value: 1234
      }
    ],
    resolver
  )
  console.dir(result, { depth: null })
  expect(result.length).toBe(1)
})
