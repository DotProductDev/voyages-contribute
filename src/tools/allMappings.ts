import { EntitySchema, VoyageSchema } from "../models"
import { DataMapping } from "./importer"
import { voyageMapping } from "./voyageMapping"

export const AllMappings: Record<
  string,
  { mapping: DataMapping; schema: EntitySchema }
> = {
  Voyage: { mapping: voyageMapping, schema: VoyageSchema }
}
