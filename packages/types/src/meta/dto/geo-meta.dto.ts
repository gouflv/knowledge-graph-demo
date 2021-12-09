import { Type } from 'class-transformer'
import { MetaBase } from './meta-base'
import { EvolutionEvent } from './shared'

export class GeoMetaDto extends MetaBase {
  identifier: string

  sourceID: string

  geographicalName: string

  abbreviatedGeo: string

  graphicalName: string

  variantGeographicalName: string

  administrativeLevel: string

  startTime: string

  endTime: string

  @Type(() => EvolutionEvent)
  evolutionEvent: EvolutionEvent

  authorityDocument: string

  underJurisdiction: string

  jurisdiction: string

  coordinate: string

  azimuth: string

  toString() {
    return `Geo [${this.identifier}] refTo[${this.sourceID}] ${this.geographicalName}`
  }
}
