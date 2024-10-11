import { AllProperties } from "./entities"
import { EntityListProperty, EntityValueProperty, Property } from "./properties"

export interface DirectPropertyChange {
  readonly kind: "direct"
  property: string
  changed: string | number | EntityRef | null
  comments: string
}

export const isDirectChange = (
  change: PropertyChange
): change is DirectPropertyChange => change.kind === "direct"

export interface NewEntityRef {
  type: "newEntityRef"
  /**
   * A temporary unique id (there should not be collisions even across
   * different entity types).
   */
  tempId: string
}

export type EntityRef = string | NewEntityRef

export const isNewEntityRef = (ref: EntityRef | null): ref is NewEntityRef =>
  !!ref && (ref as NewEntityRef).type === "newEntityRef"

export const isMatch = (a: EntityRef, b: EntityRef) =>
  a === b || (isNewEntityRef(a) && isNewEntityRef(b) && a.tempId === b.tempId)

export interface LinkedEntitySelectionChange {
  readonly kind: "linked"
  property: string
  /**
   * The id of the selected entity in the change.
   */
  next: EntityRef | null
  comments: string
}

export interface OwnedEntityChange {
  readonly kind: "owned"
  property: string
  ownedEntityId: EntityRef
  changes: PropertyChange[]
  comments: string
}

export const isOwnedEntityChange = (
  change: PropertyChange
): change is OwnedEntityChange => (change as OwnedEntityChange).kind === "owned"

export interface ManyToManyUpdate {
  idConn: EntityRef
  connection: PropertyChange[]
  ownedChanges: OwnedEntityChange
}

export interface EntityListChange {
  readonly kind: "list"
  property: string
  /**
   * A list of refs to the connection (M2M) entity.
   */
  removed: EntityRef[]
  modified: ManyToManyUpdate[]
  comments: string
}

export type PropertyChange =
  | DirectPropertyChange
  | LinkedEntitySelectionChange
  | OwnedEntityChange
  | EntityListChange

export interface EntityUpdate<TChange extends PropertyChange = PropertyChange> {
  readonly type: "update"
  schema: string
  entityId: EntityRef
  changes: TChange[]
}

export interface EntityDeletion {
  readonly type: "deletion"
  schema: string
  entityId: EntityRef
}

export interface EntityDelCancel {
  readonly type: "delCancel"
  schema: string
  entityId: EntityRef
}

export type EntityChange = EntityUpdate | EntityDeletion | EntityDelCancel

export interface ChangeSet {
  title: string
  comments: string
  entityChanges: EntityChange[]
}

type Ordered<T> = T & { order: number }

// This conditional type associates a PropertyChange type to the source Property
// type. This is useful later when we need to process a change and need the
// matching type.
type MatchingPropertyChangeType<T> = T extends
  | OwnedEntityChange
  | LinkedEntitySelectionChange
  ? EntityValueProperty
  : T extends EntityListChange
  ? EntityListProperty
  : Property

const isMatchingPropertyChangeType = <T extends PropertyChange>(
  prop: Property,
  change: T
): prop is MatchingPropertyChangeType<T> => {
  if (change.kind === "owned" || change.kind === "linked") {
    // A LinkedEntitySelectionChange requires that the FK be stored on the
    // parent entity, so we also validate this.
    return (
      prop.kind === "entityValue" &&
      (change.kind !== "linked" || !prop.oneToOneBackingField)
    )
  }
  if (change.kind === "list") {
    return prop.kind === "entityList"
  }
  return true
}

const validateAndGetProperty = <T extends PropertyChange>(
  change: T
): MatchingPropertyChangeType<T> => {
  const { property } = change
  const prop = AllProperties[property]
  if (!prop) {
    throw new Error(`Property ${property} not found`)
  }
  if (!isMatchingPropertyChangeType(prop, change)) {
    throw new Error(
      `Property ${property}'s type ${prop.kind} not compatible with change ${change.kind}`
    )
  }
  if (isOwnedEntityChange(change)) {
    const isValid =
      (prop as EntityValueProperty).linkedEntitySchema === change.ownedEntityId
    if (isValid) {
      throw new Error(
        `Owned entity is different than its corresponding property`
      )
    }
  }
  return prop
}

export interface CombinedChangeSet {
  deletions: EntityDeletion[]
  updates: EntityUpdate<DirectPropertyChange>[]
}

/**
 * Combine an ordered sequence of change sets into a flat list of deletes and
 * updates containing only direct changes that should be easy to apply within a
 * transaction.
 */
export const combineChangeSets = (
  changeSets: ChangeSet[]
): CombinedChangeSet => {
  const deletedEntries: Ordered<EntityDeletion>[] = []
  const delCancelEntries: Ordered<EntityDelCancel>[] = []
  const updatedEntries: Ordered<EntityUpdate>[] = []
  const allChanges = changeSets.flatMap((c) => c.entityChanges)
  let order = 0
  for (const change of allChanges) {
    ++order
    if (change.type === "deletion") {
      deletedEntries.push({ ...change, order })
    } else if (change.type === "delCancel") {
      delCancelEntries.push({ ...change, order })
    } else if (change.type === "update") {
      updatedEntries.push({ ...change, order })
    } else {
      throw new Error(`Unknown change type ${JSON.stringify(change)}`)
    }
  }
  // Process and simplify/expand updates. For instance, a complex list update
  // may involve changes to the Many-to-Many model (connection) as well as
  // changes in the right-side entity.
  //
  // Note: new update entries are created and pushed to the end of the list.
  // Any entry processed and left on the array must contain only direct
  // updates to an entity. Therefore, a nested update A.B.C.x = "hello" is
  // first transformed to an update of "B", which is further processed to an
  // update of C (which is then a direct update).
  for (const u of updatedEntries) {
    const { order } = u
    for (let i = u.changes.length; i >= 0; --i) {
      const uc = u.changes[i]
      if (uc.kind === "owned") {
        const prop = validateAndGetProperty(uc)
        // Move the changes to a linked entity update entry.
        const ownedChanges: PropertyChange[] = [...uc.changes]
        if (prop.oneToOneBackingField) {
          ownedChanges.push({
            kind: "direct",
            property: prop.oneToOneBackingField,
            changed: u.entityId,
            comments: uc.comments
          })
        } else {
          // We also need to update the parent entity to point to the
          // owned entity.
          updatedEntries.push({
            type: "update" as const,
            schema: u.schema,
            changes: [
              {
                kind: "direct",
                property: prop.backingField,
                changed: uc.ownedEntityId,
                comments: uc.comments
              }
            ],
            entityId: u.entityId,
            order
          })
        }
        updatedEntries.push({
          type: "update" as const,
          schema: prop.linkedEntitySchema,
          changes: ownedChanges,
          entityId: uc.ownedEntityId,
          order
        })
        u.changes.splice(i, 1)
      } else if (uc.kind === "list") {
        const prop = validateAndGetProperty(uc)
        for (const r of uc.removed) {
          deletedEntries.push({
            type: "deletion",
            schema: prop.manyToManyEntity,
            entityId: r,
            order
          })
        }
        for (const m of uc.modified) {
          // Process changes to the right side of the M2M
          // relationship.
          if (m.ownedChanges.changes.length > 0) {
            updatedEntries.push({
              type: "update" as const,
              schema: prop.linkedEntitySchema,
              changes: m.ownedChanges.changes,
              entityId: m.ownedChanges.ownedEntityId,
              order
            })
          }
          // Process changes made to the connection table of the M2M
          // relation.
          updatedEntries.push({
            type: "update" as const,
            schema: prop.manyToManyEntity,
            changes: [
              ...m.connection,
              {
                kind: "direct" as const,
                property: prop.leftSideBackingField,
                changed: u.entityId,
                comments: ""
              },
              {
                kind: "direct" as const,
                property: prop.rightSideBackingField,
                changed: m.ownedChanges.ownedEntityId,
                comments: ""
              }
            ],
            entityId: m.idConn,
            order
          })
        }
        u.changes.splice(i, 1)
      } else if (uc.kind === "linked") {
        const prop = validateAndGetProperty(uc)
        // This is a direct update on a FK value of the entity.
        updatedEntries.push({
          type: "update" as const,
          schema: prop.schema,
          changes: [
            {
              kind: "direct" as const,
              property: prop.backingField,
              changed: uc.next,
              comments: uc.comments
            }
          ],
          entityId: u.entityId,
          order
        })
        u.changes.splice(i, 1)
      } else if (uc.kind !== "direct") {
        throw new Error(
          `Unknown property change kind in: ${JSON.stringify(uc)}`
        )
      }
    }
  }
  // After expansion, sort by order.
  updatedEntries.sort((x, y) => x.order - y.order)
  deletedEntries.sort((x, y) => x.order - y.order)
  // Remove any updates with zero changes (which could happen after
  // simplification, or perhaps the UI allowed them just to allow for a
  // comment).
  for (let i = updatedEntries.length - 1; i >= 0; --i) {
    const { changes } = updatedEntries[i]
    if (changes.length === 0) {
      updatedEntries.splice(i, 1)
    } else if (changes.findIndex((c) => c.kind !== "direct") >= 0) {
      // At this point, only direct changes should appear in updated
      // entries.
      throw new Error("[BUG]: Could not simplify change sets")
    }
  }
  // First match delete-Cancel x deleted.
  for (const dc of delCancelEntries) {
    let match = -1
    for (let i = 0; i < deletedEntries.length; ++i) {
      const d = deletedEntries[i]
      if (dc.order < d.order) {
        break
      }
      if (d.schema === dc.schema && isMatch(d.entityId, dc.entityId)) {
        match = i
      }
    }
    if (match < 0) {
      throw new Error(
        `A delete cancel operation ${JSON.stringify(
          dc
        )} does not match a previous delete operation.`
      )
    }
    // Remove the matched delete.
    deletedEntries.splice(match, 1)
  }
  // At this point any surviving delete entry should be applied to the
  // combined change set. We delete any updates referencing the deleted entity
  // (which could also be a New entity).
  for (let i = deletedEntries.length - 1; i >= 0; --i) {
    // We iterate in reverse order to allow removing entries from the array
    // without impacting the enumeration.
    const { order, entityId } = deletedEntries[i]
    // An existing entity was marked for deletion, clear any updates to
    // the same entity appearing before the deletion and raise an error
    // if any update occurs *after* the deletion.
    for (let j = updatedEntries.length - 1; j >= 0; --j) {
      const u = updatedEntries[j]
      if (isMatch(u.entityId, entityId)) {
        if (u.order > order) {
          throw new Error(`Update on ${entityId} after its deletion`)
        }
        updatedEntries.splice(j, 1)
      }
    }
  }
  // We next merge the updates so that all changes to a given entity appear in
  // a single update.
  const mergedUpdates: Record<string, EntityUpdate<DirectPropertyChange>> = {}
  for (const u of updatedEntries) {
    const id = `${u.schema}_${
      typeof u.entityId === "string" ? u.entityId : u.entityId.tempId
    }`
    const prev = mergedUpdates[id]
    let changes = u.changes.filter(isDirectChange)
    if (prev) {
      changes = [...prev.changes, ...changes]
    }
    mergedUpdates[id] = { ...u, changes }
  }
  return {
    deletions: deletedEntries,
    updates: Object.values(mergedUpdates)
  }
}
