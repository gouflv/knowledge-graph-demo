import {
  DocMetaDto,
  DocType,
  EventMetaDto,
  GeoMetaDto,
  ObjMetaDto,
  OrgMetaDto,
  PersonMetaDto,
  PicMetaDto,
  ProductMetaDto,
  StructureMetaDto
} from '../meta'

export type Doc = {
  id: string
  type: DocType
  /**
   * alias title
   */
  name: string
  meta: DocMetaDto
}

export type Structure = {
  docId: string
  id: string
  type: string
  /**
   * alias title
   */
  name: string
  meta: StructureMetaDto
}

export type Pic = {
  docId: string
  id: string
  type: string
  /**
   * alias title
   */
  name: string
  meta: PicMetaDto
}

export type Person = {
  docId: string
  id: string
  /**
   * alias personalName
   */
  name: string
  meta: PersonMetaDto
}

export type Org = {
  docId: string
  id: string
  /**
   * alias chiOrganizationName
   */
  name: string
  meta: OrgMetaDto
}

export type Event = {
  docId: string
  id: string
  /**
   * alias chiEventName
   */
  name: string
  meta: EventMetaDto
}

export type Geo = {
  docId: string
  id: string
  /**
   * alias geographicalName
   */
  name: string
  meta: GeoMetaDto
}

export type Product = {
  docId: string
  id: string
  /**
   * alias productName
   */
  name: string
  meta: ProductMetaDto
}

export type Obj = {
  docId: string
  id: string
  /**
   * alias objectName
   */
  name: string
  meta: ObjMetaDto
}
