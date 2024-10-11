import { Property } from "./properties"
import { lengthValidation, rangeValidation } from "./validation"

export type EntityContributionMode = "Full" | "Owned" | "ReadOnly"

export interface EntitySchema {
  name: string
  backingModel: string
  pkField: string
  contributionMode: EntityContributionMode
  properties: Property[]
}

const NationalitySchema: EntitySchema = {
  name: "Nationality",
  backingModel: "nationality",
  pkField: "id",
  contributionMode: "ReadOnly",
  properties: [
    {
      uid: "nationality_name",
      schema: "Nationality",
      kind: "text",
      label: "Nation name",
      backingField: "name",
      description: "Name of the nation"
    },
    {
      uid: "nationality_code",
      schema: "Nationality",
      kind: "number",
      label: "Code",
      backingField: "value",
      description: "Identification code for the Nation"
    }
  ]
}

const VesselEntitySchema: EntitySchema = {
  name: "Vessel",
  backingModel: "voyageship",
  pkField: "id",
  contributionMode: "Owned",
  properties: [
    {
      uid: "vessel_name",
      schema: "Vessel",
      kind: "text",
      label: "Name of vessel",
      backingField: "ship_name",
      description: "The name of the ship",
      validation: lengthValidation(3, 255)
    },
    {
      uid: "vessel_carrier",
      schema: "Vessel",
      kind: "entityValue",
      label: "National carrier",
      backingField: "nationality_ship",
      linkedEntitySchema: "Nationality"
    },
    {
      uid: "vessel_tonnage",
      schema: "Vessel",
      kind: "number",
      label: "Tonnage of vessel",
      backingField: "tonnage"
    }
  ]
}

const Location: EntitySchema = {
  name: "Location",
  backingModel: "location",
  pkField: "uuid",
  contributionMode: "ReadOnly",
  properties: [
    {
      uid: "location_name",
      schema: "Location",
      kind: "text",
      label: "Name",
      backingField: "name"
    }
  ]
}

const VoyageItinerarySchema: EntitySchema = {
  name: "VoyageItinerary",
  backingModel: "voyageitinerary",
  pkField: "id",
  contributionMode: "Owned",
  properties: [
    {
      uid: "itinerary_port_of_departure",
      schema: "VoyageItinerary",
      kind: "entityValue",
      linkedEntitySchema: "Location",
      label: "Port of departure",
      backingField: "port_of_departure"
    }
  ]
}

const SectionSNO = "Ship, Nations, Owners"
const SectionNumbers = "Slaves (numbers)"
const SectionCharacteristics = "Slaves (Characteristics)"

const slaveNumberFields = [
  ["num_men_embark_first_port_purchase"],
  ["num_women_embark_first_port_purchase"],
  [],
  [],
  [],
  []
]

const VoyageSlaveNumbersSchema: EntitySchema = {
  name: "VoyageSlaveNumbers",
  backingModel: "voyageslavenumbers",
  contributionMode: "Owned",
  pkField: "id",
  properties: [
    {
      uid: "sn_num_slaves_intended_first_port",
      schema: "VoyageSlaveNumbers",
      kind: "number",
      label: "SlavesIntendedFirstPortPurchase",
      description: "Slaves intended from first port of purchase",
      backingField: "num_slaves_intended_first_port",
      section: SectionNumbers
    },
    {
      kind: "table",
      uid: "sn_characteristics",
      schema: "VoyageSlaveNumbers",
      label: "Slave characteristics",
      section: SectionCharacteristics,
      columns: [
        "MEN",
        "WOMEN",
        "BOY",
        "GIRL",
        "MALE",
        "FEMALE",
        "ADULT",
        "CHILD",
        "INFANT"
      ],
      rows: [
        "Embarked slaves (first port)",
        "Embarked slaves (second port)",
        "Embarked slaves (third port)",
        "Died on voyage",
        "Disembarked slaves (first port)",
        "Disembarked slaves (second port)"
      ],
      cellField: (col, row) => {
        return slaveNumberFields[row][col] ?? `SLAVE_NUMBER_${col}x${row}`
      }
    }
  ]
}

// TODO: this is a work in progress to map the full Voyage Entity to our
// abstractions.
const VoyageEntitySchema: EntitySchema = {
  name: "Voyage",
  backingModel: "voyage",
  contributionMode: "Full",
  pkField: "voyage_id",
  properties: [
    {
      kind: "number",
      uid: "voyage_id",
      schema: "Voyage",
      label: "Voyage ID",
      backingField: "voyage_id",
      description: "The unique ID of the voyage",
      validation: rangeValidation(1, 99999999999)
    },
    {
      kind: "number",
      uid: "voyage_dataset",
      schema: "Voyage",
      label: "Dataset",
      backingField: "dataset",
      description: "The Dataset to which this voyage is associated"
    },
    {
      kind: "entityValue",
      uid: "voyage_vessel",
      schema: "Voyage",
      oneToOneBackingField: "voyage",
      backingField: "voyage",
      linkedEntitySchema: "Vessel",
      label: "Ship",
      description: "Ship that performed the voyage",
      section: SectionSNO
    },
    {
      kind: "entityValue",
      uid: "voyage_numbers",
      schema: "Voyage",
      oneToOneBackingField: "voyage",
      backingField: "voyage",
      linkedEntitySchema: "VoyageSlaveNumbers",
      label: "SlaveNumbers",
      section: SectionNumbers
    }
  ]
}

export const AllSchemas = [
  NationalitySchema,
  Location,
  VesselEntitySchema,
  VoyageItinerarySchema,
  VoyageSlaveNumbersSchema,
  VoyageEntitySchema
]

const SchemaIndex = AllSchemas.reduce(
  (agg, s) => ({ ...agg, [s.name]: s }),
  {} as Record<string, EntitySchema>
)

export const getSchema = (name: string): EntitySchema => {
  const s = SchemaIndex[name]
  if (!s) {
    throw new Error(`Schema ${name} does not exist`)
  }
  return s
}

export const AllProperties = AllSchemas.flatMap((s) => s.properties).reduce(
  (agg, p) => ({ ...agg, [p.uid]: p }),
  {} as Record<string, Property>
)

const schemaExists = (name: string) => SchemaIndex[name] !== undefined

// Some validation code to make sure that all properties reference existing
// schemas.
for (const prop of Object.values(AllProperties)) {
  if (!schemaExists(prop.schema)) {
    throw Error(`Schema ${prop.schema} does not exists`)
  }
  if (prop.kind === "entityValue" && !schemaExists(prop.linkedEntitySchema)) {
    throw Error(`Linked schema ${prop.linkedEntitySchema} does not exists`)
  }
}
