import { expect, test } from "vitest"
import {
  combineContributionChanges} from "../src/models/contribution"
import { sampleContributions } from "./sampleContributions"
import { foldCombinedChanges } from "../src/models/changeSets"

test("combine contributions", () => {
  const contributions = sampleContributions
  const allChanges = foldCombinedChanges(
    contributions.map(combineContributionChanges)
  )
  expect(allChanges.deletions.length).toBe(0)
  expect(allChanges.updates.length).toBeGreaterThan(100)
  console.dir(allChanges, { depth: null })
})
