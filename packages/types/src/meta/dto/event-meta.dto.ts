import { MetaBase } from './meta-base'

export class EventMetaDto extends MetaBase {
  identifier: string

  sourceID: string

  chiEventName: string

  engEventName: string

  abbreviatedEventName: string

  startTime: string

  endTime: string

  place: string

  type: string

  description: string

  /**
   * @Ref
   */
  personalName: string[]

  personalDescription: string

  achievement: string

  toString() {
    return `Event [${this.identifier}] refTo[${this.sourceID}] ${this.chiEventName}`
  }
}
