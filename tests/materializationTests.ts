import { assert, expect, test } from "vitest"
import {
  addToMaterializedData,
  applyChanges,
  cloneEntity,
  expandMaterialized,
  getChangeRefs,
  getEntity,
  isMaterializedEntity,
  MaterializedEntity,
  materializeNew
} from "../src/models/materialization"
import {
  VoyageShipEntitySchema,
  VoyageSchema,
  getSchemaProp,
  NationalitySchema,
  VoyageDatesSchema,
  SparseDateSchema
} from "../src/models/entities"
import { EntityUpdate } from "../src/models/changeSets"
import { fillEntityWithDummies } from "./mock"

const getEntityByPath = (root: MaterializedEntity, ...path: string[]) => {
  let result = root
  for (let i = 0; i < path.length; ++i) {
    const child = result.data[path[i]]
    if (!isMaterializedEntity(child)) {
      return undefined
    }
    result = child
  }
  return result
}

test("materialize new voyage", () => {
  const voyage = materializeNew(VoyageSchema, "1234567890")
  // console.dir(voyage, { depth: null })
  expect(voyage.data["Voyage ID"]).toBe("1234567890")
  expect(voyage.data["Dataset"]).toBe(0)
  const ship = isMaterializedEntity(voyage.data["Ship"])
    ? voyage.data["Ship"].data
    : {}
  expect(ship).toBeTruthy()
  expect(ship["Name of vessel"]).toBe("")
  expect(ship["National carrier"]).toBe(null)
  const expanded = expandMaterialized(voyage)
  const expKeys = Object.keys(expanded)
  expect(expKeys).contains("Voyage")
  expect(expKeys).contains("VoyageShip")
  expect(expKeys).contains("VoyageItinerary")
  expect(expKeys).contains("VoyageDates")
  expect(expKeys).contains("VoyageSlaveNumbers")
})

test("materialize new voyage with edits", () => {
  const voyage = materializeNew(VoyageSchema, "new_00001")
  const ship = voyage.data["Ship"]
  const dates = voyage.data["Dates"]
  assert(
    isMaterializedEntity(ship),
    "Expected a materialized ship entity for voyage"
  )
  assert(
    isMaterializedEntity(dates),
    "Expected a materialized dates entity for voyage"
  )
  const shipProp = getSchemaProp(VoyageSchema, "Ship")
  assert(shipProp !== undefined, "Voyage ship prop not found in schema")
  const datesProp = getSchemaProp(VoyageSchema, "Dates")
  assert(datesProp !== undefined, "Voyage dates prop not found in schema")
  const shipnameProp = getSchemaProp(VoyageShipEntitySchema, "Name of vessel")
  assert(shipnameProp !== undefined, "Vessel name prop not found in schema")
  const shipNationProp = getSchemaProp(
    VoyageShipEntitySchema,
    "National carrier"
  )
  assert(
    shipNationProp !== undefined,
    "Vessel nationality prop not found in schema"
  )
  const voyageYearProp = getSchemaProp(
    VoyageDatesSchema,
    "Year of arrival at port of disembarkation (YEARAM)"
  )
  assert(voyageYearProp !== undefined, "Voyage year prop not found in schema")
  const voyageDaysProp = getSchemaProp(
    VoyageDatesSchema,
    "Length of Middle Passage in (days) (VOYAGE)"
  )
  assert(voyageDaysProp !== undefined, "Voyage days prop not found in schema")
  const sparseYearProp = getSchemaProp(SparseDateSchema, "Year")
  assert(sparseYearProp !== undefined, "Sparse year prop not found in schema")
  const change: EntityUpdate = {
    type: "update",
    entityRef: voyage.entityRef,
    changes: [
      {
        kind: "owned",
        comments: "changing ship info",
        property: shipProp.uid,
        ownedEntityId: ship.entityRef,
        changes: [
          {
            kind: "direct",
            property: shipnameProp.uid,
            changed: "Santa Maria"
          },
          {
            kind: "linked",
            property: shipNationProp.uid,
            next: { id: 1234, schema: NationalitySchema.name, type: "existing" }
          }
        ]
      },
      {
        kind: "owned",
        comments: "setting a year for the voyage",
        property: datesProp.uid,
        ownedEntityId: dates.entityRef,
        changes: [
          {
            kind: "owned",
            property: voyageYearProp.uid,
            ownedEntityId: {
              id: "temp_987654321",
              schema: SparseDateSchema.name,
              type: "new"
            },
            changes: [
              {
                kind: "direct",
                property: sparseYearProp.uid,
                changed: 1756
              }
            ]
          },
          {
            kind: "direct",
            property: voyageDaysProp.uid,
            changed: 42
          }
        ]
      }
    ]
  }
  // console.dir(change, { depth: null })
  const data = expandMaterialized(cloneEntity(voyage))
  const extraRefs = getChangeRefs(change)
  // console.log(extraRefs)
  // Check that the nationality we set for the ship is observed in the change
  // refs.
  const natRef = extraRefs.find((r) => r.schema === NationalitySchema.name)
  expect(natRef).toBeTruthy()
  assert(natRef !== undefined)
  expect(natRef.id).toBe(1234)
  const fakeNat: MaterializedEntity = {
    ...materializeNew(NationalitySchema, natRef.id),
    state: "original"
  }
  fillEntityWithDummies(fakeNat)
  fakeNat.data["Nation name"] = "Brazil"
  addToMaterializedData(data, fakeNat)
  applyChanges(data, [change])
  // console.dir(data, { depth: null })
  const modified = getEntity(data, voyage.entityRef)
  expect(getEntityByPath(voyage, "Ship")?.data["Name of vessel"]).toBe("")
  expect(getEntityByPath(modified, "Ship")?.data["Name of vessel"]).toBe(
    "Santa Maria"
  )
  expect(
    getEntityByPath(modified, "Ship", "National carrier")?.data["Nation name"]
  ).toBe("Brazil")
  expect(
    getEntityByPath(modified, "Dates", voyageYearProp.label)?.data["Year"]
  ).toBe(1756)
  expect(getEntityByPath(modified, "Dates")?.data[voyageDaysProp.label]).toBe(
    42
  )
  // console.dir(modified, { depth: null })
})
