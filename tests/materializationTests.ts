import { expect, test } from "vitest"
import { expandMaterialized, isMaterializedEntity, materializeNew } from "../src/models/materialization"
import { VoyageSchema } from "../src/models/entities"

test("materialize new voyage", () => {
  const voyage = materializeNew(VoyageSchema, "1234567890")
  // console.dir(voyage, { depth: null })
  expect(voyage.data["Voyage ID"]).toBe("1234567890")
  expect(voyage.data["Dataset"]).toBe(0)
  const ship = isMaterializedEntity(voyage.data["Ship"]) ? voyage.data["Ship"].data : {}
  expect(ship).toBeTruthy()
  expect(ship["Name of vessel"]).toBe("")
  expect(ship["National carrier"]).toBe(null)
  const expanded = expandMaterialized(voyage)
  // console.dir(expanded)
})
