import {
  DirectPropertyChange,
  EntitySchema,
  EntityUpdate,
  getSchema,
  MaterializedEntity,
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
  mode: "direct" | "linked"
}

export interface DirectColumnMapping extends DataMappingBase {
  readonly kind: "direct"
  header: string
  formula?: (value: string) => string | null
}

export type CreateIfMissing = Omit<OwnedColumnMapping, "targetField"> & {
  canonicalId?: (
    | Omit<ConstMapping, "mode" | "targetField">
    | Omit<DirectColumnMapping, "targetField">
  )[]
}

export interface LinkedColumnMapping extends DataMappingBase {
  readonly kind: "linked"
  header: string
  lookupField: string
  createIfMissing?: CreateIfMissing
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

const getBlank = (schema: string, id?: string): MaterializedEntity => ({
  entityRef: {
    id: id ?? newUid(),
    schema,
    type: "new"
  },
  data: {},
  state: "new"
})

export interface EntityLookUp {
  lookup: (
    schema: EntitySchema,
    field: string,
    value: string
  ) => Promise<MaterializedEntity | null>
}

const applyFormula = (
  formula: ((x: string) => string | null) | undefined,
  value: string | null | undefined
): string | null => {
  if (formula === undefined || !value) {
    return value ?? null
  }
  try {
    return formula(value)
  } catch (error) {
    console.error(`Error applying formula "${formula}":`, error)
    return value
  }
}

export const MapRow = async (
  row: Record<string, string>,
  mapping: DataMapping,
  schema: EntitySchema,
  lookup: EntityLookUp,
  errors: string[],
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
      const property = getProperty(
        resolveBinding(mapping.targetField, localContext),
        currentSchema
      )
      const mappedValue =
        typeof mapping.value === "string" && mapping.value.at(0) === "$"
          ? (localContext[mapping.value] ?? mapping.value)
          : mapping.value
      if (mapping.mode === "direct") {
        return [
          {
            kind: "direct",
            property: property.uid,
            changed: mappedValue
          }
        ]
      }
      if (mapping.mode === "linked") {
        if (property.kind !== "linkedEntity") {
          throw new Error("Invalid linked mapping target field")
        }
        const linkedSchema = getSchema(property.linkedEntitySchema)
        const changed = await lookup.lookup(
          linkedSchema,
          linkedSchema.pkField,
          String(mappedValue)
        )
        if (changed === null) {
          errors.push(
            `Failed to lookup linked entity ${linkedSchema.name} for const mapping: ${mappedValue}`
          )
          return []
        }
        return [
          {
            kind: "linked",
            property: property.uid,
            changed
          }
        ]
      }
      throw new Error(
        `Invalid const mapping mode: ${mapping.mode} for property ${property.label}`
      )
    }
    if (mapping.kind === "direct") {
      const property = getProperty(
        resolveBinding(mapping.targetField, localContext),
        currentSchema
      )
      const header = resolveBinding(mapping.header, localContext)
      const value = applyFormula(mapping.formula, row[header])
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
      const property = getProperty(
        resolveBinding(mapping.targetField, localContext),
        currentSchema
      )
      if (property.kind !== "linkedEntity") {
        throw new Error("Invalid linked mapping target field")
      }
      const header = resolveBinding(mapping.header, localContext)
      const value = row[header]
      if (!value || value.trim() === "") {
        return []
      }
      const referencedSchema = getSchema(property.linkedEntitySchema)
      const entity: MaterializedEntity | null = mapping.lookupField
        ? await lookup.lookup(
            referencedSchema,
            mapping.lookupField,
            value.trim()
          )
        : null
      // If createIfMissing is specified and lookup fails, create new entity
      if (entity === null && mapping.createIfMissing) {
        const createChanges = await Promise.all(
          mapping.createIfMissing.importUpdates.map((m) =>
            processMapping(m, referencedSchema, localContext)
          )
        )
        let linkedId: string | undefined = undefined
        if (mapping.createIfMissing.canonicalId) {
          // Compute a canonical ID for the new entity
          linkedId = ""
          for (const idMapping of mapping.createIfMissing.canonicalId) {
            if (idMapping.kind === "const") {
              linkedId += String(idMapping.value)
            } else if (idMapping.kind === "direct") {
              const header = resolveBinding(idMapping.header, localContext)
              const idValue = applyFormula(idMapping.formula, row[header])
              linkedId += idValue ? idValue.toString() : undefined
            }
          }
          if (linkedId === "") {
            linkedId = undefined
          }
        }
        return [
          {
            kind: "linked",
            property: property.uid,
            changed: getBlank(referencedSchema.name, linkedId),
            linkedChanges: createChanges.flat()
          }
        ]
      } else if (entity === null) {
        errors.push(
          `Failed to lookup linked entity ${referencedSchema.name} on "${property.label}" for mapping: ${value}.`
        )
      }
      return [
        {
          kind: "linked",
          property: property.uid,
          changed: entity
        }
      ]
    }
    if (mapping.kind === "owned") {
      const property = getProperty(
        resolveBinding(mapping.targetField, localContext),
        currentSchema
      )
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
              ownedEntity: getBlank(ownedSchema.name),
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
      const property = getProperty(
        resolveBinding(mapping.targetField, localContext),
        currentSchema
      )
      if (property.kind !== "ownedEntityList") {
        throw new Error("Invalid owned list mapping target field")
      }
      const itemSchema = getSchema(property.linkedEntitySchema)
      const addedEntities: Omit<OwnedEntityChange, "property">[] = []
      for (const itemMapping of mapping.addedToList) {
        const itemChanges = (
          await Promise.all(
            itemMapping.importUpdates.map((m) =>
              processMapping(m, itemSchema, localContext)
            )
          )
        ).flat()
        if (itemChanges.length > 0) {
          addedEntities.push({
            kind: "owned" as const,
            ownedEntity: getBlank(itemSchema.name),
            changes: itemChanges
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
  lookup: EntityLookUp,
  errors: Record<string, number[]>,
  maxRows?: number
): Promise<EntityUpdate[]> => {
  const changes: EntityUpdate[] = []
  const pkProp = schema.properties.find(
    (p) => p.kind !== "table" && p.backingField === schema.pkField
  )
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    if (maxRows && i >= maxRows) {
      break
    }
    try {
      const rowErrors: string[] = []
      const propChanges = await MapRow(row, mapping, schema, lookup, rowErrors)
      for (const e of rowErrors) {
        (errors[e] ??= []).push(i)
      }
      if (propChanges.length > 0) {
        const pkSet = propChanges.find(
          (c) => c.kind === "direct" && c.property === pkProp?.uid
        ) as DirectPropertyChange | undefined
        changes.push({
          type: "update",
          entityRef: {
            id: pkSet?.changed ? String(pkSet?.changed) : crypto.randomUUID(),
            schema: schema.name,
            type: "new"
          },
          changes: propChanges
        })
      }
    } catch (error) {
      console.error(
        `Error processing row ${i + 1}: ${(error as Error).message}`
      )
    }
  }
  return changes
}
