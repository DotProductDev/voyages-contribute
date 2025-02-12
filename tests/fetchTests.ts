import { expect, test } from "vitest"
import { MockBatchResolver, MockDataResolver } from "./mock"
import { VoyageSchema } from "../src/models/entities"
import { fetchEntities } from "../src/backend/entityFetch"
import { DbDataResolver, DebouncedResolver } from "../src/backend/dataResolvers"
import { MySQLDb } from "./mysqlDb"

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
  // console.dir(resolver.getLog())
  expect(result.length).toBe(1)
  expect(VoyageSchema.getLabel(result[0].data)).toBe("Voyage #dummy_voyage_id_1")
})

test("voyage entity fetch with debouncing", async () => {
  const batchResolver = new MockBatchResolver()
  const resolver = new DebouncedResolver(batchResolver, 10)
  const result = await fetchEntities(
    VoyageSchema,
    [
      {
        field: VoyageSchema.pkField,
        value: 4321
      }
    ],
    resolver
  )
  // Make sure that very few batches are produced even though the total number
  // of queries is large.
  expect(batchResolver.getLog().length).toBeLessThan(7)
  expect(batchResolver.getQueryCount()).toBeGreaterThan(50)
  expect(result.length).toBe(1)
  // console.dir(batchResolver.getLog(), { depth: null })
  // console.dir(result, { depth: null })
})

test("fetch from live db", async () => {
  const realDb = new MySQLDb(true)
  await realDb.init()
  const resolver = new DbDataResolver(realDb)
  const result = await fetchEntities(
    VoyageSchema,
    [
      {
        field: VoyageSchema.pkField,
        value: 11586
      }
    ],
    resolver
  )
  console.dir(result, { depth: null })
})