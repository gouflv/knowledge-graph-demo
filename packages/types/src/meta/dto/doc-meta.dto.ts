import { Transform, Type } from 'class-transformer'
import { get } from 'lodash'
import { MetaBase } from './meta-base'
import { Contributor } from './shared'

export class DocMetaDto extends MetaBase {
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
  @Type(() => Contributor)
  @Transform(
    ({ value, obj }) => {
      // Magazine only
      if (get(obj, 'contributorInfo')) {
        return get(obj, 'contributorInfo')
      }
      // Transform contributorName to instance
      if (get(obj, 'contributorName')) {
        const obj = new Contributor()
        obj.contributorName = get(obj, 'contributorName')
        return obj
      }
      return value
    },
    {
      toClassOnly: true
    }
  )
  contributor: Contributor[]

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

  /**
   * @Ref
   */
  personalName: string[]

  /**
   * @Ref
   */
  organizationName: string[]

  /**
   * @Ref
   */
  geographicalName: string[]

  /**
   * @Ref
   */
  eventName: string[]

  /**
   * @Ref
   */
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

  toString() {
    return `Doc [${this.identifier}] refTo[${this.sourceID}] type[${this.type}] ${this.title}`
  }
}
