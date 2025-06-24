import { EntitySchema, BuilderEntityProp } from "./entities"
import {
  Property,
  TextProperty,
  NumberProperty,
  TableProperty,
  LinkedEntityProperty,
  EntityOwnedProperty,
  OwnedEntityListProperty,
  BoolProperty,
  PropertyAccessLevel
} from "./properties"

/**
A helper class to build entities, allowing some fields to be automatically set
and ensuring that all built schemas are added to the collection of all schemas.
*/
export class EntitySchemaBuilder {
  disposed: boolean = false
  props: Property[]

  constructor(
    private info: Omit<EntitySchema, "properties">,
    private built: EntitySchema[],
    initProps?: Property[]
  ) {
    this.props = initProps ?? []
  }

  add = <T extends Property>(prop: Omit<T, "schema">) => {
    if (this.disposed) {
      throw new Error("disposed")
    }
    this.props.push({ ...prop, schema: this.info.name } as T)
    return this
  }

  _mkUid = (suffix: string) => `${this.info.name}_${suffix}`

  addBool = <T extends Omit<BoolProperty, "uid" | "kind" | "schema">>(
    prop: T
  ) =>
    this.add<BoolProperty>({
      uid: this._mkUid(prop.backingField),
      ...prop,
      kind: "bool"
    })

  addText = <T extends Omit<TextProperty, "uid" | "kind" | "schema">>(
    prop: T
  ) =>
    this.add<TextProperty>({
      uid: this._mkUid(prop.backingField),
      ...prop,
      kind: "text"
    })

  addNumber = <T extends Omit<NumberProperty, "uid" | "kind" | "schema">>(
    prop: T
  ) =>
    this.add<NumberProperty>({
      uid: this._mkUid(prop.backingField),
      ...prop,
      kind: "number"
    })

  addOwnerProp = (backingField: string, fkType?: "number" | "text") =>
    this.add<NumberProperty | TextProperty>({
      kind: fkType ?? "number",
      uid: this._mkUid(`owner_${backingField}`),
      backingField,
      label: backingField,
      accessLevel: PropertyAccessLevel.Hidden
    })

  addTable = (prop: Omit<TableProperty, "kind" | "schema">) =>
    this.add<TableProperty>({ ...prop, kind: "table" })

  addLinkedEntity = <T extends BuilderEntityProp<LinkedEntityProperty>>(
    prop: T
  ) =>
    this.add<LinkedEntityProperty>({
      uid: this._mkUid(prop.backingField || prop.label),
      ...prop,
      kind: "linkedEntity",
      linkedEntitySchema: prop.linkedEntitySchema.name
    })

  addEntityOwned = <
    T extends Omit<BuilderEntityProp<EntityOwnedProperty>, "backingField">
  >(
    prop: T
  ) =>
    this.add<EntityOwnedProperty>({
      uid: this._mkUid(prop.label),
      ...prop,
      backingField: "",
      kind: "entityOwned",
      linkedEntitySchema: prop.linkedEntitySchema.name
    })

  addOwnedEntityList = <
    T extends Omit<BuilderEntityProp<OwnedEntityListProperty>, "backingField">
  >(
    prop: T
  ) =>
    this.add<OwnedEntityListProperty>({
      uid: this._mkUid(prop.label),
      ...prop,
      backingField: "",
      kind: "ownedEntityList",
      linkedEntitySchema: prop.linkedEntitySchema.name
    })

  build = (): EntitySchema => {
    if (this.disposed) {
      throw new Error("disposed")
    }
    this.disposed = true
    const schema = { ...this.info, properties: [...this.props] }
    this.built.push(schema)
    return schema
  }

  clone = (name: string) =>
    new EntitySchemaBuilder({ ...this.info, name }, this.built, [
      ...this.props.map((p) => ({
        ...p,
        uid: `${p.uid}_${name}`,
        schema: name
      }))
    ])

  setInfo = (
    info: Partial<Omit<EntitySchema, "properties">>
  ): EntitySchemaBuilder => ({ ...this, info: { ...this.info, ...info } })
}
