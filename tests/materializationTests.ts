import { assert, expect, test } from "vitest"
import {
  addToMaterializedData,
  applyChanges,
  cloneEntity,
  expandMaterialized,
  getEntity,
  isMaterializedEntity,
  isMaterializedEntityArray,
  MaterializedEntity,
  materializeNew
} from "../src/models/materialization"
import {
  VoyageShipEntitySchema,
  VoyageSchema,
  getSchemaProp,
  NationalitySchema,
  VoyageDatesSchema,
  SparseDateSchema,
  VoyageCargoConnectionSchema,
  CargoUnitSchema,
  CargoTypeSchema
} from "../src/models/entities"
import { EntityUpdate, getChangeRefs } from "../src/models/changeSets"
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
  const cargoProp = getSchemaProp(VoyageSchema, "Cargo")
  assert(cargoProp !== undefined, "Cargo prop not found in schema")
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
    "Year of arrival at port of disembarkation"
  )
  assert(voyageYearProp !== undefined, "Voyage year prop not found in schema")
  const voyageDaysProp = getSchemaProp(
    VoyageDatesSchema,
    "Length of Middle Passage in (days)"
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
            changed: {
              entityRef: {
                id: 1234,
                schema: NationalitySchema.name,
                type: "existing"
              },
              data: {},
              state: "lazy"
            }
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
      },
      {
        kind: "ownedList",
        comments: "Adding cargo items",
        property: cargoProp.uid,
        removed: [],
        modified: [
          {
            kind: "owned",
            property: cargoProp.uid,
            ownedEntityId: {
              id: "temp_cargo_123",
              type: "new",
              schema: VoyageCargoConnectionSchema.name
            },
            changes: [
              {
                kind: "linked",
                property:
                  getSchemaProp(VoyageCargoConnectionSchema, "Cargo unit")
                    ?.uid ?? "<notfound>",
                changed: {
                  entityRef: {
                    id: 5555,
                    schema: CargoUnitSchema.name,
                    type: "existing"
                  },
                  data: {},
                  state: "lazy"
                }
              },
              {
                kind: "linked",
                property:
                  getSchemaProp(VoyageCargoConnectionSchema, "Cargo type")
                    ?.uid ?? "<notfound>",
                changed: {
                  entityRef: {
                    id: 7777,
                    schema: CargoTypeSchema.name,
                    type: "existing"
                  },
                  data: {},
                  state: "lazy"
                }
              },
              {
                kind: "direct",
                property:
                  getSchemaProp(
                    VoyageCargoConnectionSchema,
                    "The amount of cargo according to the unit"
                  )?.uid ?? "<notfound>",
                changed: 10
              }
            ]
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
  // More additional fake pre-existing data.
  const fakeCargoUnit: MaterializedEntity = {
    ...materializeNew(CargoUnitSchema, 5555),
    state: "original"
  }
  fillEntityWithDummies(fakeCargoUnit)
  addToMaterializedData(data, fakeCargoUnit)
  const fakeCargoType: MaterializedEntity = {
    ...materializeNew(CargoTypeSchema, 7777),
    state: "original"
  }
  fillEntityWithDummies(fakeCargoType)
  addToMaterializedData(data, fakeCargoType)
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
  expect(
    isMaterializedEntityArray(modified.data["Cargo"]) &&
      modified.data["Cargo"].length === 1
  ).toBeTruthy()
  const cargoItem = modified.data["Cargo"]![0] as MaterializedEntity
  expect(cargoItem.state).toBe("new")
  expect(cargoItem.data["voyage_id"]).toBe("new_00001")
  expect(cargoItem.data["The amount of cargo according to the unit"]).toBe(10)
  expect(
    cargoItem.data["Was this a commodity used to purchase enslaved people"]
  ).toBe(false)
  expect(getEntityByPath(cargoItem, "Cargo unit")?.entityRef.id).toBe(5555)
  expect(getEntityByPath(cargoItem, "Cargo type")?.entityRef.id).toBe(7777)
  // console.dir(modified, { depth: null })
})
