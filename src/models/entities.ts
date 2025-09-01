import {
  EntityLinkBaseProperty,
  EntityLinkEditMode,
  ListEditMode,
  Property,
  PropertyAccessLevel
} from "./properties"
import { EntitySchemaBuilder } from "./schemaBuilder"
import { lengthValidation, rangeValidation } from "./validation"

/**
 * Contribution modes
 * - Full
 * The entity can be selected directly for data contribution.
 *
 * - Owned
 * The entity shows up as a child entry of another entity and
 * is not directly selectable for contributions.
 *
 * - ReadOnly
 * The entity shows up as a child entry and its values cannot
 * be modified. E.g. an entity may have an associated Location,
 * the Location itself should not be modified, but the entity
 * can be updated to point to /another/ location or null.
 */
export type EntityContributionMode = "Full" | "Owned" | "ReadOnly"

export interface EntitySchema {
  name: string
  backingTable: string
  pkField: string
  contributionMode: EntityContributionMode
  properties: Property[]
  getLabel: (data: Record<string, any>, short?: boolean) => string
}

export type BuilderEntityProp<T extends EntityLinkBaseProperty> = Omit<
  T,
  "uid" | "kind" | "schema" | "linkedEntitySchema"
> & { linkedEntitySchema: EntitySchema }

export const AllSchemas: EntitySchema[] = []

const mkBuilder = (
  info: Omit<EntitySchema, "properties">,
  initProps?: Property[]
) => new EntitySchemaBuilder(info, AllSchemas, initProps)

export const SparseDateSchema = mkBuilder({
  name: "VoyageSparseDate",
  backingTable: "voyage_voyagesparsedate",
  pkField: "id",
  contributionMode: "Owned",
  getLabel: (data) => {
    let s = data.Year
    if (data.Month) {
      s += `-${data.Month.toString().padStart(2, "0")}`
    }
    if (data.Day) {
      s += `-${data.Day.toString().padStart(2, "0")}`
    }
    return s
  }
})
  .addNumber({
    label: "Year",
    backingField: "year",
    validation: rangeValidation(0, 2050)
  })
  .addNumber({
    label: "Month",
    backingField: "month",
    validation: rangeValidation(1, 12)
  })
  .addNumber({
    label: "Day",
    backingField: "day",
    validation: rangeValidation(1, 31)
  })
  .build()

const coalesce = (a: string | number | null | undefined, b?: string) =>
  a ? `${a}${b ?? ""}` : ""

export const NationalitySchema = mkBuilder({
  name: "Nationality",
  backingTable: "voyage_nationality",
  pkField: "id",
  contributionMode: "ReadOnly",
  getLabel: (data) => coalesce(data["Nation name"])
})
  .addText({
    label: "Nation name",
    backingField: "name",
    description: "Name of the nation"
  })
  .addNumber({
    label: "Code",
    backingField: "value",
    description: "Identification code for the Nation"
  })
  .build()

export const TonTypeSchema = mkBuilder({
  name: "TonType",
  backingTable: "voyage_tontype",
  pkField: "id",
  contributionMode: "ReadOnly",
  getLabel: (data) => coalesce(data["Ton type label"])
})
  .addText({
    label: "Ton type label",
    backingField: "name",
    description: "The type of tonnage value for vessels"
  })
  .addNumber({
    label: "Code",
    backingField: "value",
    description: "Identification code for the Ton Type"
  })
  .build()

export const RigOfVesselSchema = mkBuilder({
  name: "RigOfVessel",
  backingTable: "voyage_rigofvessel",
  pkField: "id",
  contributionMode: "ReadOnly",
  getLabel: (data) => coalesce(data["Rig of vessel"])
})
  .addText({
    label: "Rig of vessel",
    backingField: "name",
    description: "The rig of vessel"
  })
  .addNumber({
    label: "Code",
    backingField: "value",
    description: "Identification code for the rig of vessel"
  })
  .build()

export const Location = mkBuilder({
  name: "Location",
  backingTable: "geo_location",
  pkField: "id",
  contributionMode: "ReadOnly",
  getLabel: (data) => coalesce(data.Name)
})
  .addText({
    label: "Name",
    backingField: "name"
  })
  .addNumber({
    label: "Code",
    backingField: "value",
    description: "Identification code for the Location"
  })
  .build()

export const VoyageShipEntitySchema = mkBuilder({
  name: "VoyageShip",
  backingTable: "voyage_voyageship",
  pkField: "id",
  contributionMode: "Owned",
  getLabel: (data) => coalesce(data["Name of vessel"])
})
  .addText({
    label: "Name of vessel",
    backingField: "ship_name",
    description: "The name of the ship",
    validation: lengthValidation(3, 255)
  })
  .addLinkedEntity({
    label: "National carrier",
    backingField: "nationality_ship_id",
    linkedEntitySchema: NationalitySchema,
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    label: "Ton type",
    backingField: "ton_type_id",
    linkedEntitySchema: TonTypeSchema,
    mode: EntityLinkEditMode.Select
  })
  .addNumber({
    label: "Tonnage of vessel",
    backingField: "tonnage"
  })
  .addLinkedEntity({
    label: "Rig of vessel",
    backingField: "rig_of_vessel_id",
    linkedEntitySchema: RigOfVesselSchema,
    mode: EntityLinkEditMode.Select
  })
  .addNumber({
    label: "Guns mounted",
    backingField: "guns_mounted"
  })
  .addNumber({
    label: "Year of vessel's construction",
    backingField: "year_of_construction"
  })
  .addLinkedEntity({
    label: "Construction place",
    backingField: "vessel_construction_place_id",
    linkedEntitySchema: Location,
    mode: EntityLinkEditMode.Select
  })
  .addNumber({
    label: "Year of vessel's registration",
    backingField: "registered_year"
  })
  .addLinkedEntity({
    label: "Registered place",
    backingField: "registered_place_id",
    linkedEntitySchema: Location,
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    label: "Nationality",
    backingField: "imputed_nationality_id",
    linkedEntitySchema: NationalitySchema,
    mode: EntityLinkEditMode.Select
  })
  .addNumber({
    label: "Tonnage standardized on British measured tons, 1773-1870",
    backingField: "tonnage_mod"
  })
  .build()

export const VoyageItinerarySchema = mkBuilder({
  name: "VoyageItinerary",
  backingTable: "voyage_voyageitinerary",
  pkField: "id",
  contributionMode: "Owned",
  getLabel: (data) =>
    `Itinerary from ${data["First intended port of embarkation"]?.data.Name ?? "unknown"} to ` +
    (data["First intended port of disembarkation"]?.data.Name ?? "unknown")
})
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Port of departure",
    backingField: "port_of_departure_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "First intended port of embarkation",
    description: "First intended port of embarkation",
    backingField: "int_first_port_emb_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Second intended port of embarkation",
    description: "Second intended port of embarkation",
    backingField: "int_second_port_emb_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "First intended port of disembarkation",
    backingField: "int_first_port_dis_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Second intended port of disembarkation",
    backingField: "int_second_port_dis_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Third intended port of disembarkation",
    backingField: "int_third_port_dis_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Fourth intended port of disembarkation",
    backingField: "int_fourth_port_dis_id",
    mode: EntityLinkEditMode.Select
  })
  .addNumber({
    label: "Number of ports of call prior to buying captives",
    backingField: "ports_called_buying_slaves"
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "First place of slave purchase",
    backingField: "first_place_slave_purchase_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Second place of slave purchase",
    backingField: "second_place_slave_purchase_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Third place of slave purchase",
    backingField: "third_place_slave_purchase_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Port of call before Atlantic crossing",
    backingField: "port_of_call_before_atl_crossing_id",
    mode: EntityLinkEditMode.Select
  })
  .addNumber({
    label: "Number of ports of call in Americas prior to sale of captives",
    backingField: "number_of_ports_of_call"
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "First place of slave landing",
    backingField: "first_landing_place_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Second place of slave landing",
    backingField: "second_landing_place_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Third place of slave landing",
    backingField: "third_landing_place_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Place at which voyage ended",
    backingField: "place_voyage_ended_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Imputed port where voyage began",
    backingField: "imp_port_voyage_begin_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Principal place of slave purchase",
    backingField: "principal_place_of_slave_purchase_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Imputed principal place of slave purchase",
    backingField: "imp_principal_place_of_slave_purchase_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Principal port of slave disembarkation",
    backingField: "principal_port_of_slave_dis_id",
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    linkedEntitySchema: Location,
    label: "Imputed principal port of slave disembarkation",
    backingField: "imp_principal_port_slave_dis_id",
    mode: EntityLinkEditMode.Select
  })
  .build()

const SectionShipNations = "Ship, Nations"
const SectionCharacteristics = "Characteristics"

const slaveNumberPrefixes = [
  "num_men",
  "num_women",
  "num_boy",
  "num_girl",
  "num_males",
  "num_females",
  "num_adult",
  "num_child",
  "num_infant"
]

const slaveNumberImpPrefixes = [
  "num_men",
  "num_women",
  "num_boy",
  "num_girl",
  "num_male",
  "num_female",
  "num_adult",
  "num_child",
  "num_infant"
]

const slaveNumberSuffixes = [
  "embark_first_port_purchase",
  "embark_second_port_purchase",
  "embark_third_port_purchase",
  "died_middle_passage",
  "disembark_first_landing",
  "disembark_second_landing"
]

const slaveNumberImpSuffixes = [
  "embarked",
  "landed",
  "total",
  "death_middle_passage"
]

const slaveNumberColumns = [
  "MEN",
  "WOMEN",
  "BOYS",
  "GIRLS",
  "MALES",
  "FEMALES",
  "ADULTS",
  "CHILDREN",
  "INFANTS"
]

export const VoyageSlaveNumbersSchema = mkBuilder({
  name: "VoyageSlaveNumbers",
  backingTable: "voyage_voyageslavesnumbers",
  contributionMode: "Owned",
  pkField: "id",
  getLabel: (_) => "Slave numbers"
})
  .addNumber({
    label: "Captive deaths before leaving Africa",
    backingField: "slave_deaths_before_africa",
    section: "Numbers"
  })
  .addNumber({
    label: "Captive deaths between Africa and Americas",
    backingField: "slave_deaths_between_africa_america",
    section: "Numbers"
  })
  .addNumber({
    label: "Captive deaths between arrival and sale",
    backingField: "slave_deaths_between_arrival_and_sale",
    section: "Numbers"
  })
  .addNumber({
    label: "Captives intended from first port of purchase",
    backingField: "num_slaves_intended_first_port",
    section: "Numbers"
  })
  .addNumber({
    label: "Captives intended from second port of purchase",
    backingField: "num_slaves_intended_second_port",
    section: "Numbers"
  })
  .addNumber({
    label: "Number of captives carried from first port of purchase",
    backingField: "num_slaves_carried_first_port",
    section: "Numbers"
  })
  .addNumber({
    label: "Number of captives carried from second port of purchase",
    backingField: "num_slaves_carried_second_port",
    section: "Numbers"
  })
  .addNumber({
    label: "Number of captives carried from third port of purchase",
    backingField: "num_slaves_carried_third_port",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives purchased",
    backingField: "total_num_slaves_purchased",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives on board at departure from last port",
    backingField: "total_num_slaves_dep_last_slaving_port",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives arrived at first port of disembarkation",
    backingField: "total_num_slaves_arr_first_port_embark",
    section: "Numbers"
  })
  .addNumber({
    label: "Number of captives disembarked at first place",
    backingField: "num_slaves_disembark_first_place",
    section: "Numbers"
  })
  .addNumber({
    label: "Number of captives disembarked at second place",
    backingField: "num_slaves_disembark_second_place",
    section: "Numbers"
  })
  .addNumber({
    label: "Number of captives disembarked at third place",
    backingField: "num_slaves_disembark_third_place",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives embarked (imputed)",
    backingField: "imp_total_num_slaves_embarked",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives disembarked (imputed)",
    backingField: "imp_total_num_slaves_disembarked",
    section: "Numbers"
  })
  .addNumber({
    label: "Sterling cash price in Jamaica (imputed)",
    backingField: "imp_jamaican_cash_price",
    section: "Numbers"
  })
  .addNumber({
    label: "Imputed number of captive deaths during Middle Passage",
    backingField: "imp_mortality_during_voyage",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives embarked with age identified",
    backingField: "total_slaves_embarked_age_identified",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives embarked with gender identified",
    backingField: "total_slaves_embarked_gender_identified",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives landed with age identified",
    backingField: "total_slaves_landed_age_identified",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives landed with gender identified",
    backingField: "total_slaves_landed_gender_identified",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives identified by age at departure or arrival",
    backingField: "total_slaves_dept_or_arr_age_identified",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives identified by gender at departure or arrival",
    backingField: "total_slaves_dept_or_arr_gender_identified",
    section: "Numbers"
  })
  .addNumber({
    label: "Imputed number of captives embarked for mortality calculation",
    backingField: "imp_slaves_embarked_for_mortality",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives embarked with age and gender identified",
    backingField: "total_slaves_embarked_age_gender_identified",
    section: "Numbers"
  })
  .addNumber({
    label: "Total captives identified by age and gender among landed",
    backingField: "total_slaves_by_age_gender_identified_among_landed",
    section: "Numbers"
  })
  .addNumber({
    label:
      "Total captives identified by age and gender at departure or arrival",
    backingField: "total_slaves_by_age_gender_identified_departure_or_arrival",
    section: "Numbers"
  })
  .addNumber({
    label: "Percentage of boys among embarked captives",
    backingField: "percentage_boys_among_embarked_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Child ratio among embarked captives",
    backingField: "child_ratio_among_embarked_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage of girls among embarked captives",
    backingField: "percentage_girls_among_embarked_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Male ratio among embarked captives",
    backingField: "male_ratio_among_embarked_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage of men among embarked captives",
    backingField: "percentage_men_among_embarked_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage of women among embarked captives",
    backingField: "percentage_women_among_embarked_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage of boys among landed captives",
    backingField: "percentage_boys_among_landed_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Child ratio among landed captives",
    backingField: "child_ratio_among_landed_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage of girls among landed captives",
    backingField: "percentage_girls_among_landed_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Male ratio among landed captives",
    backingField: "male_ratio_among_landed_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage of men among landed captives",
    backingField: "percentage_men_among_landed_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage of women among landed captives",
    backingField: "percentage_women_among_landed_slaves",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage men on voyage",
    backingField: "percentage_men",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage women on voyage",
    backingField: "percentage_women",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage boy on voyage",
    backingField: "percentage_boy",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage girl on voyage",
    backingField: "percentage_girl",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage male on voyage",
    backingField: "percentage_male",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage children on voyage",
    backingField: "percentage_child",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage adult on voyage",
    backingField: "percentage_adult",
    section: "Ratios"
  })
  .addNumber({
    label: "Percentage female on voyage",
    backingField: "percentage_female",
    section: "Ratios"
  })
  .addNumber({
    label: "Imputed mortality ratio",
    backingField: "imp_mortality_ratio",
    section: "Ratios"
  })

  // Table for characteristics

  .addTable({
    uid: "sn_characteristics",
    label: "Slave characteristics",
    section: SectionCharacteristics,
    columns: slaveNumberColumns,
    rows: [
      "Embarked captives (first port)",
      "Embarked captives (second port)",
      "Embarked captives (third port)",
      "Died on voyage",
      "Disembarked captives (first port)",
      "Disembarked captives (second port)"
    ],
    cellField: (col, row) =>
      `${slaveNumberPrefixes[col]}_${slaveNumberSuffixes[row]}`
  })

  // Table for imputed characteristics

  .addTable({
    uid: "sn_characteristics_imputed",
    label: "Slave characteristics (imputed)",
    section: SectionCharacteristics,
    columns: slaveNumberColumns.slice(0, -1),
    accessLevel: PropertyAccessLevel.Editor,
    rows: [
      "Imputed number at ports of purchase",
      "Imputed number at ports of landing",
      "Imputed number at departure or arrival",
      "Imputed deaths on middle passage"
    ],
    cellField: (col, row) => {
      // Ugly inconsistencies in naming!!
      if (row === 0 && col === 7) {
        return "imp_num_children_embarked"
      }
      if (row === 2 && col === 4) {
        return "imp_num_males_total"
      }
      if (row === 2 && col === 5) {
        return "imp_num_females_total"
      }
      let prefix = slaveNumberImpPrefixes[col]
      if (row === 3) {
        prefix = prefix.replace("num_", "")
      }
      return row === 2 || (col >= 4 && col <= 7)
        ? `imp_${prefix}_${slaveNumberImpSuffixes[row]}`
        : undefined
    }
  })
  .build()

export const VoyageDatesSchema = mkBuilder({
  name: "VoyageDates",
  backingTable: "voyage_voyagedates",
  contributionMode: "Owned",
  pkField: "id",
  getLabel: (_) => "Voyage dates"
})
  .addNumber({
    label: "Length of middle passage in (days)",
    backingField: "length_middle_passage_days"
  })
  .addNumber({
    label: "Voyage length from home port to disembarkation (days)",
    backingField: "imp_length_home_to_disembark"
  })
  .addNumber({
    label:
      "Voyage length from last slave embarkation to first disembarkation (days)",
    backingField: "imp_length_leaving_africa_to_disembark"
  })
  .addLinkedEntity({
    label: "Date that voyage began",
    backingField: "voyage_began_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Date that slave purchase began",
    backingField: "slave_purchase_began_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Date that vessel left last slaving port",
    backingField: "vessel_left_port_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Date vessel departed Africa",
    backingField: "date_departed_africa_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Date of first disembarkation of captives",
    backingField: "first_dis_of_slaves_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Date of second disembarkation of captives",
    backingField: "arrival_at_second_place_landing_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Date of third disembarkation of captives",
    backingField: "third_dis_of_slaves_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Date of departure from last place of landing",
    backingField: "departure_last_place_of_landing_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Date on which slave voyage completed",
    backingField: "voyage_completed_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Year voyage began",
    backingField: "imp_voyage_began_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Year of arrival at port of disembarkation",
    backingField: "imp_arrival_at_port_of_dis_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Year departed Africa",
    backingField: "imp_departed_africa_sparsedate_id",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .build()

export const VoyageGroupingSchema = mkBuilder({
  name: "VoyageGrouping",
  backingTable: "voyage_voyagegroupings",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (data) => coalesce(data.Name)
})
  .addText({
    label: "Name",
    backingField: "name",
    description: "Name of the Voyage Grouping"
  })
  .addNumber({
    label: "Code",
    backingField: "value",
    description: "Identification code for the Voyage Grouping"
  })
  .build()

export const AfricanInfoSchema = mkBuilder({
  name: "AfricanInfo",
  backingTable: "voyage_africaninfo",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d, short) =>
    short
      ? d.Name
      : `African Info '${d.Name}'${d["Possibly offensive"] ? " (may be offensive)" : ""}`
})
  .addText({ label: "Name", backingField: "name" })
  .addBool({
    label: "Possibly offensive",
    backingField: "possibly_offensive",
    defaultValue: false
  })
  .build()

export const CargoUnitSchema = mkBuilder({
  name: "CargoUnit",
  backingTable: "voyage_cargounit",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d, short) => (short ? d.Name : `Cargo unit ${d.Name}`)
})
  .addText({ label: "Name", backingField: "name" })
  .build()

export const CargoTypeSchema = mkBuilder({
  name: "CargoType",
  backingTable: "voyage_cargotype",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d, short) => (short ? d.Name : `Cargo type ${d.Name}`)
})
  .addText({ label: "Name", backingField: "name" })
  .build()

export const VoyageCargoConnectionSchema = mkBuilder({
  name: "VoyageCargoConnectionSchema",
  backingTable: "voyage_voyagecargoconnection",
  contributionMode: "Owned",
  pkField: "id",
  getLabel: (d) =>
    `Cargo for voyage ${d.voyage_id}: ${coalesce(d["The amount of cargo according to the unit"], " ")}` +
    `${coalesce(d["Cargo unit"]?.data.Name, " of ")}${coalesce(d["Cargo type"]?.data.Name)}`
})
  .addOwnerProp("voyage_id")
  .addLinkedEntity({
    backingField: "unit_id",
    label: "Cargo unit",
    linkedEntitySchema: CargoUnitSchema,
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    backingField: "cargo_id",
    label: "Cargo type",
    linkedEntitySchema: CargoTypeSchema,
    mode: EntityLinkEditMode.Select
  })
  .addNumber({
    backingField: "amount",
    label: "The amount of cargo according to the unit",
    notNull: false
  })
  .addBool({
    backingField: "is_purchasing_commmodity",
    label: "Was this a commodity used to purchase enslaved people",
    defaultValue: false
  })
  .build()

export const ParticularOutcomeSchema = mkBuilder({
  name: "ParticularOutcome",
  backingTable: "voyage_particularoutcome",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d, short) => (short ? d.Name : `Particular outcome ${d.Name}`)
})
  .addText({ label: "Name", backingField: "name" })
  .addNumber({ label: "Value", backingField: "value" })
  .build()

export const EnslavedOutcomeSchema = mkBuilder({
  name: "SlavesOutcome",
  backingTable: "voyage_slavesoutcome",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d, short) => (short ? d.Name : `Enslaved outcome ${d.Name}`)
})
  .addText({ label: "Name", backingField: "name" })
  .addNumber({ label: "Value", backingField: "value" })
  .build()

export const VesselOutcomeSchema = mkBuilder({
  name: "VesselOutcomeSchema",
  backingTable: "voyage_vesselcapturedoutcome",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d, short) => (short ? d.Name : `Vessel outcome ${d.Name}`)
})
  .addText({ label: "Name", backingField: "name" })
  .addNumber({ label: "Value", backingField: "value" })
  .build()

export const OwnerOutcomeSchema = mkBuilder({
  name: "OwnerOutcome",
  backingTable: "voyage_owneroutcome",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d, short) => (short ? d.Name : `Owner outcome ${d.Name}`)
})
  .addText({ label: "Name", backingField: "name" })
  .addNumber({ label: "Value", backingField: "value" })
  .build()

export const ResistanceSchema = mkBuilder({
  name: "Resistance",
  backingTable: "voyage_resistance",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d, short) => (short ? d.Name : `Resistance ${d.Name}`)
})
  .addText({ label: "Name", backingField: "name" })
  .addNumber({ label: "Value", backingField: "value" })
  .build()

export const VoyageOutcomeSchema = mkBuilder({
  name: "VoyageOutcome",
  backingTable: "voyage_voyageoutcome",
  contributionMode: "Owned",
  pkField: "id",
  getLabel: (_) => "Voyage outcome"
})
  .addLinkedEntity({
    backingField: "particular_outcome_id",
    label: "Particular outcome",
    linkedEntitySchema: ParticularOutcomeSchema,
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    backingField: "resistance_id",
    label: "Resistance",
    linkedEntitySchema: ResistanceSchema,
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    backingField: "outcome_slaves_id",
    label: "Enslaved outcome",
    linkedEntitySchema: EnslavedOutcomeSchema,
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    backingField: "vessel_captured_outcome_id",
    label: "Vessel outcome",
    linkedEntitySchema: VesselOutcomeSchema,
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    backingField: "outcome_owner_id",
    label: "Owner outcome",
    linkedEntitySchema: OwnerOutcomeSchema,
    mode: EntityLinkEditMode.Select
  })
  .build()

export const VoyageCrewSchema = mkBuilder({
  name: "VoyageCrew",
  backingTable: "voyage_voyagecrew",
  contributionMode: "Owned",
  pkField: "id",
  getLabel: (_) => "Voyage crew"
})
  .addNumber({
    label: "Crew at voyage outset",
    backingField: "crew_voyage_outset"
  })
  .addNumber({
    label: "Crew at departure from last port of slave purchase",
    backingField: "crew_departure_last_port"
  })
  .addNumber({
    label: "Crew at first landing of captives",
    backingField: "crew_first_landing"
  })
  .addNumber({
    label: "Crew when return voyage begin",
    backingField: "crew_return_begin"
  })
  .addNumber({
    label: "Crew at end of voyage",
    backingField: "crew_end_voyage"
  })
  .addNumber({
    label: "Number of crew unspecified",
    backingField: "unspecified_crew"
  })
  .addNumber({
    label: "Crew died before first place of trade in Africa",
    backingField: "crew_died_before_first_trade"
  })
  .addNumber({
    label: "Crew died while ship was on African coast",
    backingField: "crew_died_while_ship_african"
  })
  .addNumber({
    label: "Crew died during Middle Passage",
    backingField: "crew_died_middle_passage"
  })
  .addNumber({
    label: "Crew died in the Americas",
    backingField: "crew_died_in_americas"
  })
  .addNumber({
    label: "Crew died on return voyage",
    backingField: "crew_died_on_return_voyage"
  })
  .addNumber({
    label: "Crew died during complete voyage",
    backingField: "crew_died_complete_voyage"
  })
  .addNumber({
    label: "Total number of crew deserted",
    backingField: "crew_deserted"
  })
  .build()

export const EnslaverAliasBuilder = mkBuilder({
  name: "EnslaverAlias",
  backingTable: "past_enslaveralias",
  contributionMode: "Full",
  pkField: "id",
  getLabel: (d, short) => (short ? d.Alias : `Alias ${d.Alias}`)
}).addText({
  backingField: "alias",
  label: "Alias"
})

export const EnslaverAliasSchema = EnslaverAliasBuilder.build()

export const EnslaverSchema = mkBuilder({
  name: "Enslaver",
  backingTable: "past_enslaveridentity",
  contributionMode: "Full",
  pkField: "id",
  getLabel: (d, short) =>
    short ? d["Principal alias"] : `Enslaver ${d["Principal alias"]}`
})
  .addOwnedEntityList({
    childBackingProp: "identity_id",
    editModes: ListEditMode.All,
    label: "Aliases",
    linkedEntitySchema: EnslaverAliasSchema
  })
  .addText({
    backingField: "principal_alias",
    label: "Principal alias"
  })
  .addBool({
    backingField: "is_natural_person",
    label: "Is natural person",
    defaultValue: true
  })
  .addNumber({
    backingField: "birth_year",
    label: "Birth year"
  })
  .addNumber({
    backingField: "birth_month",
    label: "Birth month"
  })
  .addNumber({
    backingField: "birth_day",
    label: "Birth day"
  })
  .addLinkedEntity({
    label: "Birth place",
    backingField: "birth_place_id",
    linkedEntitySchema: Location,
    mode: EntityLinkEditMode.Select
  })
  .addNumber({
    backingField: "death_year",
    label: "Death year"
  })
  .addNumber({
    backingField: "death_month",
    label: "Death month"
  })
  .addNumber({
    backingField: "death_day",
    label: "Death day"
  })
  .addLinkedEntity({
    label: "Death place",
    backingField: "death_place_id",
    linkedEntitySchema: Location,
    mode: EntityLinkEditMode.Select
  })
  .addText({
    backingField: "father_name",
    label: "Father name"
  })
  .addText({
    backingField: "father_occupation",
    label: "Father occupation"
  })
  .addText({
    backingField: "mother_name",
    label: "Mother name"
  })
  .addText({
    backingField: "probate_date",
    label: "Probate date"
  })
  .addText({
    backingField: "will_value_pounds",
    label: "Will value (pounds)"
  })
  .addText({
    backingField: "will_value_dollars",
    label: "Will value (dollars)"
  })
  .addText({
    backingField: "will_court",
    label: "Will court"
  })
  .addLinkedEntity({
    label: "Principal location",
    backingField: "principal_location_id",
    linkedEntitySchema: Location,
    mode: EntityLinkEditMode.Select
  })
  .addText({
    backingField: "notes",
    label: "Notes"
  })
  .build()

export const EnslaverAliasWithFKSchema = EnslaverAliasBuilder.clone(
  "EnslaverAliasWithFK"
)
  .addNumber({
    backingField: "identity_id",
    label: "IdentityId"
  })
  .build()

/**
 * Our schemas must form an an acyclic graph, so we create a specialized
 * schema for EnslaverAlias which points to an Enslaver identity which then
 * points to the schema that doesn't point back to the identity.
 */
export const EnslaverAliasWithIdentitySchema = EnslaverAliasBuilder.clone(
  "EnslaverAliasWithIdentity"
)
  .addLinkedEntity({
    backingField: "identity_id",
    linkedEntitySchema: EnslaverSchema,
    label: "Identity",
    mode: EntityLinkEditMode.Create
  })
  .build()

export const EnslavementRelationTypeSchema = mkBuilder({
  name: "EnslavementRelationType",
  backingTable: "past_enslavementrelationtype",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d, short) =>
    short ? d["Relation type"] : `Enslavement relation ${d["Relation type"]}`
})
  .addText({
    label: "Relation type",
    backingField: "name",
    description: "A descriptive name for the type of enslavement relation"
  })
  .build()

export const EnslaverRoleSchema = mkBuilder({
  name: "EnslaverRole",
  backingTable: "past_enslaverrole",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d, short) =>
    short ? d["Enslaver role"] : `Enslaver role ${d["Enslaver role"]}`
})
  .addText({
    label: "Enslaver role",
    backingField: "name",
    description:
      "A descriptive name for the role of the enslaver in an enslavement relation"
  })
  .build()

export const EnslaverRelationRoleConnectionSchema = mkBuilder({
  name: "EnslaverRelationRoleConn",
  backingTable: "past_enslaverinrelation_roles",
  contributionMode: "Owned",
  pkField: "id",
  getLabel: (d) => `Enslaver relation role ${d.Role?.data["Enslaver role"]}`
})
  .addOwnerProp("enslaverinrelation_id")
  .addLinkedEntity({
    backingField: "enslaverrole_id",
    linkedEntitySchema: EnslaverRoleSchema,
    label: "Role",
    mode: EntityLinkEditMode.Select
  })
  .build()

export const EnslaverInRelationSchema = mkBuilder({
  name: "EnslaverInRelation",
  backingTable: "past_enslaverinrelation",
  contributionMode: "Owned",
  pkField: "id",
  getLabel: (d, short) =>
    short
      ? (d["Enslaver alias"]?.data.Alias ?? "")
      : `Enslaver '${d["Enslaver alias"]?.data.Alias}'`
})
  .addOwnerProp("relation_id")
  .addLinkedEntity({
    backingField: "enslaver_alias_id",
    linkedEntitySchema: EnslaverAliasWithIdentitySchema,
    label: "Enslaver alias",
    mode: EntityLinkEditMode.Create
  })
  .addOwnedEntityList({
    childBackingProp: "enslaverinrelation_id",
    editModes: ListEditMode.All,
    label: "Roles",
    linkedEntitySchema: EnslaverRelationRoleConnectionSchema
  })
  .build()

export const EnslavedSchema = mkBuilder({
  name: "Enslaved",
  backingTable: "past_enslaved",
  contributionMode: "Full",
  pkField: "id",
  getLabel: (d, short) =>
    short ? d["Documented name"] : `Enslaved '${d["Documented name"]}'`
})
  .addText({
    label: "Documented name",
    backingField: "documented_name"
  })
  .addNumber({
    label: "Age",
    backingField: "age"
  })
  .addNumber({
    label: "Gender",
    backingField: "gender_int"
  })
  .build()

export const EnslavedInRelationSchema = mkBuilder({
  name: "EnslavedInRelation",
  backingTable: "past_enslavedinrelation",
  contributionMode: "Owned",
  pkField: "id",
  getLabel: (d, short) =>
    short
      ? (d["Enslaved"]?.data["Documented name"] ?? "")
      : `Enslaved '${d["Enslaved"]?.data["Documented name"]}'`
})
  .addOwnerProp("relation_id")
  .addLinkedEntity({
    label: "Enslaved",
    backingField: "enslaved_id",
    linkedEntitySchema: EnslavedSchema,
    mode: EntityLinkEditMode.Create
  })
  .build()

export const EnslavementRelationSchema = mkBuilder({
  name: "EnslavementRelation",
  backingTable: "past_enslavementrelation",
  contributionMode: "Owned",
  pkField: "id",
  getLabel: (d, short) =>
    short
      ? (d["Relation type"]?.data["Relation type"] ?? "")
      : `${d["Relation type"]?.data["Relation type"]} relation (id ${d.id})`
})
  .addOwnerProp("voyage_id")
  .addLinkedEntity({
    label: "Relation type",
    backingField: "relation_type_id",
    linkedEntitySchema: EnslavementRelationTypeSchema,
    mode: EntityLinkEditMode.Select
  })
  .addLinkedEntity({
    label: "Place",
    backingField: "place_id",
    linkedEntitySchema: Location,
    mode: EntityLinkEditMode.Select
  })
  // TODO: it looks like we also have a sparse date for this field?? Check with John.
  // Commented out for now, if it is decided it is not needed, remove the field.
  // .addText({
  //   backingField: "date",
  //   label: "Date",
  //   description: "Date in MM,DD,YYYY format with optional fields"
  // })
  .addNumber({
    backingField: "amount",
    label: "Amount"
  })
  .addOwnedEntityList({
    childBackingProp: "relation_id",
    editModes: ListEditMode.All,
    label: "Enslavers in relation",
    linkedEntitySchema: EnslaverInRelationSchema
  })
  .addOwnedEntityList({
    childBackingProp: "relation_id",
    editModes: ListEditMode.All,
    label: "Enslaved in relation",
    linkedEntitySchema: EnslavedInRelationSchema
  })
  .build()

export const VoyageSourceTypeSchema = mkBuilder({
  name: "Voyage Source Type",
  backingTable: "document_sourcetype",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d) => d.Name
})
  .addText({
    label: "Name",
    backingField: "name"
  })
  .build()

export const VoyageShortRefSchema = mkBuilder({
  name: "Voyage Source Short Reference",
  backingTable: "document_shortref",
  contributionMode: "ReadOnly",
  pkField: "id",
  getLabel: (d) => d.name
})
  .addText({
    label: "Name",
    backingField: "name"
  })
  .build()

export const VoyageSourceSchema = mkBuilder({
  name: "Voyage Source",
  backingTable: "document_source",
  contributionMode: "Owned",
  pkField: "id",
  getLabel: (d) => d.Title
})
  .addText({
    label: "Title",
    backingField: "title"
  })
  .addLinkedEntity({
    label: "Source type",
    backingField: "source_type_id",
    linkedEntitySchema: VoyageSourceTypeSchema,
    mode: EntityLinkEditMode.Select
  })
  .addText({
    label: "Bibliography",
    description: "Formatted bibliography for the Document",
    backingField: "bib"
  })
  .addLinkedEntity({
    label: "Date",
    description: "Date of publication or authorship",
    backingField: "date",
    linkedEntitySchema: SparseDateSchema,
    mode: EntityLinkEditMode.Own
  })
  .addLinkedEntity({
    label: "Short reference",
    backingField: "short_ref_id",
    linkedEntitySchema: VoyageShortRefSchema,
    mode: EntityLinkEditMode.Select
  })
  .addNumber({
    label: "Short reference id",
    backingField: "short_ref_id",
    uid: "voyage_source_numeric_short_ref_id"
  })
  .addText({
    label: "Notes",
    backingField: "notes"
  })
  .build()

export const VoyageSourceConnectionSchema = mkBuilder({
  name: "Voyage Source Connection",
  backingTable: "document_sourcevoyageconnection",
  contributionMode: "Owned",
  pkField: "id",
  getLabel: (d) => `Voyage source ${d.Source?.data.Title}`
})
  .addOwnerProp("voyage_id")
  .addLinkedEntity({
    label: "Source",
    backingField: "source_id",
    linkedEntitySchema: VoyageSourceSchema,
    mode: EntityLinkEditMode.Create,
    notNull: true
  })
  .addText({
    label: "Page range",
    backingField: "page_range"
  })
  .build()

// TODO: this is a work in progress to map the full Voyage Entity to our
// abstractions.
export const VoyageSchema = mkBuilder({
  name: "Voyage",
  backingTable: "voyage_voyage",
  contributionMode: "Full",
  pkField: "voyage_id",
  getLabel: (d) => `Voyage #${d["Voyage ID"]}`
})
  .addNumber({
    label: "Voyage ID",
    backingField: "voyage_id",
    description: "The unique ID of the voyage",
    validation: rangeValidation(1, 99999999999),
    accessLevel: PropertyAccessLevel.Editor
  })
  .addNumber({
    label: "Dataset",
    backingField: "dataset",
    description: "The Dataset to which this voyage is associated",
    notNull: true,
    accessLevel: PropertyAccessLevel.Editor
  })
  .addLinkedEntity({
    label: "Voyage grouping",
    backingField: "voyage_groupings",
    linkedEntitySchema: VoyageGroupingSchema,
    mode: EntityLinkEditMode.Select,
    notNull: false
  })
  .addEntityOwned({
    oneToOneBackingField: "voyage_id",
    linkedEntitySchema: VoyageShipEntitySchema,
    label: "Ship",
    description: "Ship that performed the voyage",
    section: SectionShipNations,
    notNull: true
  })
  .addEntityOwned({
    oneToOneBackingField: "voyage_id",
    linkedEntitySchema: VoyageOutcomeSchema,
    label: "Outcome",
    description: "Outcome of the voyage",
    section: "Voyage Outcome"
  })
  .addEntityOwned({
    oneToOneBackingField: "voyage_id",
    linkedEntitySchema: VoyageCrewSchema,
    label: "Crew",
    description: "Crew of the voyage",
    section: "Crew"
  })
  .addEntityOwned({
    oneToOneBackingField: "voyage_id",
    section: "Voyage Itinerary",
    linkedEntitySchema: VoyageItinerarySchema,
    label: "Itinerary",
    notNull: true
  })
  .addEntityOwned({
    oneToOneBackingField: "voyage_id",
    section: "Voyage Dates",
    linkedEntitySchema: VoyageDatesSchema,
    label: "Dates",
    notNull: true
  })
  .addEntityOwned({
    oneToOneBackingField: "voyage_id",
    linkedEntitySchema: VoyageSlaveNumbersSchema,
    label: "Slave numbers",
    section: "Slave numbers",
    notNull: true
  })
  .addOwnedEntityList({
    label: "Cargo",
    linkedEntitySchema: VoyageCargoConnectionSchema,
    editModes: ListEditMode.All,
    childBackingProp: "voyage_id",
    section: SectionShipNations
  })
  .addOwnedEntityList({
    label: "Enslavement relations",
    linkedEntitySchema: EnslavementRelationSchema,
    editModes: ListEditMode.All,
    childBackingProp: "voyage_id",
    section: "Enslavement Relations"
  })
  .addOwnedEntityList({
    label: "Sources",
    childBackingProp: "voyage_id",
    editModes: ListEditMode.All,
    linkedEntitySchema: VoyageSourceConnectionSchema,
    section: "Sources"
  })
  .build()

export const SchemaIndex = AllSchemas.reduce(
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
  (agg, p) => {
    if (agg[p.uid] !== undefined) {
      throw new Error(
        `Duplicate property uid: ${p.uid} @ schema ${p.schema} (dupe @ ${agg[p.uid].schema})`
      )
    }
    return { ...agg, [p.uid]: p }
  },
  {} as Record<string, Property>
)

export const getSchemaProp = (s: EntitySchema, label: string) =>
  s.properties.find((p) => p.label === label)

const schemaExists = (name: string) => SchemaIndex[name] !== undefined

// Some validation code to make sure that all properties reference existing
// schemas.
for (const prop of Object.values(AllProperties)) {
  if (!schemaExists(prop.schema)) {
    throw Error(`Schema ${prop.schema} does not exists`)
  }
  if (prop.kind === "linkedEntity" && !schemaExists(prop.linkedEntitySchema)) {
    throw Error(`Linked schema ${prop.linkedEntitySchema} does not exists`)
  }
}
