export class OrgMetaDto {
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

  personalName: string

  personalDescription: string

  event: string

  achievement: string

  toString() {
    return `Org [${this.identifier}] refTo[${this.sourceID}] ${this.chiOrganizationName}`
  }
}
