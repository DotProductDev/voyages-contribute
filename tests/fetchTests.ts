import { expect, test } from "vitest"
import { MockDataResolver } from "./mock"
import { VoyageSchema } from "../src/models/entities"
import { fetchEntities } from "../src/backend/entityFetch"

test("voyage entity fetch", async () => {
  const resolver = new MockDataResolver()
  const result = await fetchEntities(
    VoyageSchema,
    [
      {
        field: VoyageSchema.pkField,
        value: 1234
      }
    ],
    resolver
  )
  // console.dir(result, { depth: null })
  expect(result.length).toBe(1)
})
