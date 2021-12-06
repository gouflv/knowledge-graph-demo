import { Transform, Type } from 'class-transformer'
import get from 'lodash/get'

export class MetaDto {
  identifier: string

  sourceID: string

  type: string

  //
  // Meta
  //
  language: string

  title: string

  parallelTitleProper: string

  otherVariantTitle: string

  /**
   * As alias of `contributorInfo` if docType is magazine
   */
  @Type(of => Contributor)
  @Transform(({ value, obj }) => value || get(obj, 'contributorInfo'), {
    toClassOnly: true
  })
  contributor: Contributor

  originDate: string

  originPlace: string

  extent: string

  pageNumber: string

  classification: string

  // #Magazine Only
  volume: string

  // #Magazine Only
  column: string

  //
  // Contents
  //
  content: string[]

  notes: string

  abstract: string

  keyword: string[]

  personalName: string

  organizationName: string

  geographicalName: string

  eventName: string

  tableID: string[]

  tableNumber: string

  // #Magazine Only
  reference: string[]

  //
  // Files
  //
  filePath: string

  startFileName: string

  endFileName: string
}

class Contributor {
  contributorName: string

  role: string

  // #Magazine Only
  institution: string

  // #Magazine Only
  contributorDescription: string

  // #Magazine Only
  originDate: string
}
