import { MetaBase } from './meta-base'

export class OrgMetaDto extends MetaBase {
  identifier: string

  sourceID: string

  chiOrganizationName: string

  engOrganizationName: string

  abbreviatedOrganizationName: string

  address: string

  previousOrganization: string

  nextOrganization: string

  startTime: string

  endTime: string

  type: string

  description: string

  /**
   * @Ref
   */
  personalName: string[]

  personalDescription: string

  /**
   * @Ref
   */
  event: string[]

  achievement: string

  toString() {
    return `Org [${this.identifier}] refTo[${this.sourceID}] ${this.chiOrganizationName}`
  }
}
