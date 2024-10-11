import { PropertyValidation } from "./validation"

export interface BaseProperty {
  uid: string
  kind: string
  label: string
  schema: string
  backingField: string
  description?: string
  /**
   * An optional logical grouping of properties.
   */
  section?: string
  validation?: PropertyValidation
}

export interface TextProperty extends BaseProperty {
  readonly kind: "text"
}

export interface NumberProperty extends BaseProperty {
  readonly kind: "number"
}

export interface PartialDate {
  year: number
  month?: number
  day?: number
}

export const isPartialDate = (value: any): value is PartialDate =>
  value && value.year

export interface DateProperty extends BaseProperty {
  readonly kind: "date"
}

export interface EntityLinkBaseProperty extends BaseProperty {
  /**
   * The type of the linked entity.
   */
  linkedEntitySchema: string
}

export interface EntityValueProperty extends EntityLinkBaseProperty {
  readonly kind: "entityValue"
  /**
   * When this field is not null, the FK that links the value to the parent
   * entity is at the child entity.
   */
  oneToOneBackingField?: string
}

export enum ListEditMode {
  None = 0,
  Add = 1,
  Remove = 2,
  Modify = 4,
  All = 7
}

export interface EntityListProperty extends EntityLinkBaseProperty {
  readonly kind: "entityList"
  /**
   * The entity that backs this many-to-many relationship.
   */
  manyToManyEntity: string
  rithSideEntity: string
  leftSideBackingField: string
  rightSideBackingField: string
  editModes: ListEditMode
}

export interface TableProperty extends Omit<BaseProperty, "backingField"> {
  readonly kind: "table"
  columns: string[]
  rows: string[]
  /**
   * Determines the backing field for this table cell.
   */
  cellField: (col: number, row: number) => string
}

export type Property =
  | TextProperty
  | NumberProperty
  | EntityValueProperty
  | EntityListProperty
  | TableProperty
