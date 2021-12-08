import { ClassConstructor } from 'class-transformer/types/interfaces'
import { MetaType } from '../types'
import { DocMetaDto } from './doc-meta.dto'
import { EventMetaDto } from './event-meta.dto'
import { GeoMetaDto } from './geo-meta.dto'
import { ObjMetaDto } from './obj-meta.dto'
import { OrgMetaDto } from './org-meta.dto'
import { PersonMetaDto } from './person-meta.dto'
import { PicMetaDto } from './pic-meta.dto'
import { ProductMetaDto } from './product-meta.dto'
import { StructureMetaDto } from './structure-meta.dto'

export {
  DocMetaDto,
  StructureMetaDto,
  PicMetaDto,
  PersonMetaDto,
  OrgMetaDto,
  EventMetaDto,
  GeoMetaDto,
  ProductMetaDto,
  ObjMetaDto
}

export type UnionMateDto =
  | DocMetaDto
  | PicMetaDto
  | PersonMetaDto
  | OrgMetaDto
  | EventMetaDto
  | GeoMetaDto
  | ProductMetaDto
  | ObjMetaDto

export const DocTypeToDtoMap: Record<
  keyof typeof MetaType,
  ClassConstructor<any>
> = {
  Doc: DocMetaDto,
  Structure: StructureMetaDto,
  Pic: PicMetaDto,
  Person: PersonMetaDto,
  Org: OrgMetaDto,
  Event: EventMetaDto,
  Geo: GeoMetaDto,
  Product: ProductMetaDto,
  Obj: ObjMetaDto
}
