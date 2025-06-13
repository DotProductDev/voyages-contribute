import {
  EntityRef,
  EntitySchema,
  EntityUpdate,
  getSchema,
  materializeNew,
  OwnedEntityChange,
  Property,
  PropertyChange
} from "../models"
import { randomUUID } from "crypto"

export interface DataMappingBase {
  kind:
    | "direct"
    | "linked"
    | "owned"
    | "ownedList"
    | "const"
    | "conditional"
    | "multiple"
  targetField: string
}

export interface ConstMapping extends DataMappingBase {
  readonly kind: "const"
  value: string | number | boolean
}

export interface DirectColumnMapping extends DataMappingBase {
  readonly kind: "direct"
  header: string
}

export interface LinkedColumnMapping extends DataMappingBase {
  readonly kind: "linked"
  header: string
  lookupField: string
  createIfMissing?: Omit<OwnedColumnMapping, "targetField">
}

export interface OwnedColumnMapping extends DataMappingBase {
  readonly kind: "owned"
  importUpdates: DataMapping[]
}

export interface ConditionalMapping {
  readonly kind: "conditional"
  /**
   * The mapping will be applied as long as at least one of the
   * fields in this array is non-empty.
   */
  anyNonEmpty: string[]
  mappings: DataMapping[]
}

export interface MultipleMapping {
  readonly kind: "multiple"
  bindings: Record<string, string>[]
  mappings: DataMapping[]
}

/**
 * We only support adding to owned lists, not removing or updating.
 * Here header allows multiple columns to be mapped to entities in the
 * list.
 *
 * If the addedToList produces an empty change set, the const mappings
 * will be ignored and
 */
export interface OwnedListColumnMapping extends DataMappingBase {
  readonly kind: "ownedList"
  addedToList: Omit<OwnedColumnMapping, "targetField">[]
}

export type DataMapping =
  | ConstMapping
  | DirectColumnMapping
  | LinkedColumnMapping
  | OwnedColumnMapping
  | OwnedListColumnMapping
  | ConditionalMapping
  | MultipleMapping

const newUid = randomUUID

export interface EntityLookUp {
  lookup: (
    schema: EntitySchema,
    field: string,
    value: string
  ) => Promise<EntityRef | null>
}

export const MapRow = async (
  row: Record<string, string>,
  mapping: DataMapping,
  schema: EntitySchema,
  lookup: EntityLookUp,
  context: Record<string, string> = {}
): Promise<PropertyChange[]> => {
  // Helper to resolve binding variables in strings
  const resolveBinding = (
    value: string,
    ctx: Record<string, string> = context
  ): string => {
    const remapped = ctx[value]
    return remapped || value
  }
  // Helper to get property from schema
  const getProperty = (
    fieldLabel: string,
    targetSchema: EntitySchema
  ): Property => {
    const property = targetSchema.properties.find((p) => p.label === fieldLabel)
    if (!property) {
      throw new Error(
        `Property ${fieldLabel} not found in schema ${targetSchema.name}`
      )
    }
    return property
  }
  // Process a single mapping and return property changes for current entity
  const processMapping = async (
    mapping: DataMapping,
    currentSchema: EntitySchema,
    localContext: Record<string, string> = context
  ): Promise<PropertyChange[]> => {
    if (mapping.kind === "const") {
      const property = getProperty(mapping.targetField, currentSchema)
      return [
        {
          kind: "direct",
          property: property.uid,
          changed: mapping.value
        }
      ]
    }
    if (mapping.kind === "direct") {
      const property = getProperty(mapping.targetField, currentSchema)
      const header = resolveBinding(mapping.header, localContext)
      const value = row[header]
      return !value || value.trim() === ""
        ? []
        : [
            {
              kind: "direct",
              property: property.uid,
              changed: value.trim()
            }
          ]
    }
    if (mapping.kind === "linked") {
      const property = getProperty(mapping.targetField, currentSchema)
      if (property.kind !== "linkedEntity") {
        throw new Error("Invalid linked mapping target field")
      }
      const header = resolveBinding(mapping.header, localContext)
      const value = row[header]
      if (!value || value.trim() === "") {
        return []
      }
      // For now, assume entity exists - in real implementation would do lookup
      const referencedSchema = getSchema(property.linkedEntitySchema)
      const entityRef: EntityRef | null = await lookup.lookup(
        referencedSchema,
        mapping.lookupField,
        value.trim()
      )
      // If createIfMissing is specified and lookup fails, create new entity
      if (entityRef === null && mapping.createIfMissing) {
        const createChanges = await Promise.all(
          mapping.createIfMissing.importUpdates.map((m) =>
            processMapping(m, referencedSchema, localContext)
          )
        )
        return [
          {
            kind: "linked",
            property: property.uid,
            changed: materializeNew(referencedSchema, newUid()),
            linkedChanges: createChanges.flat()
          }
        ]
      }
      return [
        {
          kind: "linked",
          property: property.uid,
          changed:
            entityRef === null
              ? null
              : {
                  entityRef,
                  data: {},
                  state: "lazy"
                }
        }
      ]
    }
    if (mapping.kind === "owned") {
      const property = getProperty(mapping.targetField, currentSchema)
      if (property.kind !== "entityOwned") {
        throw new Error("Invalid owned mapping target field")
      }
      const ownedSchema = getSchema(property.linkedEntitySchema)
      // Process nested mappings for the owned entity
      const ownedChanges: PropertyChange[] = []
      for (const nestedMapping of mapping.importUpdates) {
        ownedChanges.push(
          ...(await processMapping(nestedMapping, ownedSchema, localContext))
        )
      }
      return ownedChanges.length === 0
        ? []
        : [
            {
              kind: "owned",
              property: property.uid,
              ownedEntity: materializeNew(ownedSchema, newUid()),
              changes: ownedChanges
            }
          ]
    }
    if (mapping.kind === "conditional") {
      // Check if any required fields are non-empty.
      const hasNonEmptyField = mapping.anyNonEmpty.some((header) => {
        const resolvedHeader = resolveBinding(header, localContext)
        const value = row[resolvedHeader]
        return value && value.trim() !== ""
      })
      // Apply the nested mapping only if at least one field is non-empty.
      return !hasNonEmptyField
        ? []
        : (
            await Promise.all(
              mapping.mappings.map((m) =>
                processMapping(m, currentSchema, localContext)
              )
            )
          ).flat()
    }
    if (mapping.kind === "ownedList") {
      const property = getProperty(mapping.targetField, currentSchema)
      if (property.kind !== "ownedEntityList") {
        throw new Error("Invalid owned list mapping target field")
      }
      const itemSchema = getSchema(property.linkedEntitySchema)
      const addedEntities: Omit<OwnedEntityChange, "property">[] = []
      for (const itemMapping of mapping.addedToList) {
        const itemChanges = await Promise.all(
          itemMapping.importUpdates.map((m) =>
            processMapping(m, itemSchema, localContext)
          )
        )
        if (itemChanges.length > 0) {
          addedEntities.push({
            kind: "owned" as const,
            ownedEntity: materializeNew(itemSchema, newUid()),
            changes: itemChanges.flat()
          })
        }
      }
      return addedEntities.length === 0
        ? []
        : [
            {
              kind: "ownedList",
              property: property.uid,
              removed: [],
              modified: addedEntities
            }
          ]
    }
    if (mapping.kind === "multiple") {
      const allChanges: PropertyChange[] = []
      for (const binding of mapping.bindings) {
        // Merge contexts.
        const localContext = {
          ...context,
          ...binding
        }
        // Process each nested mapping with the current context.
        for (const nestedMapping of mapping.mappings) {
          const nestedChanges = await processMapping(
            nestedMapping,
            currentSchema,
            localContext
          )
          allChanges.push(...nestedChanges)
        }
      }
      return allChanges
    }
    throw new Error(`Unknown mapping kind: ${(mapping as any).kind}`)
  }
  // Process the mapping and create entity changes
  return processMapping(mapping, schema, context)
}

export const MapDataSourceToChangeSets = async (
  rows: Record<string, string>[],
  mapping: DataMapping,
  schema: EntitySchema,
  lookup: EntityLookUp
): Promise<EntityUpdate[]> => {
  const changes: EntityUpdate[] = []
  for (const row of rows) {
    const propChanges = await MapRow(row, mapping, schema, lookup)
    if (propChanges.length > 0) {
      changes.push({
        type: "update",
        entityRef: {
          id: newUid(),
          schema: schema.name,
          type: "new"
        },
        changes: propChanges
      })
    }
  }
  return changes
}
