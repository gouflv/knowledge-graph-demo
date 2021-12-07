import { Type } from 'class-transformer'

export class GeoMetaDto {
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

class EvolutionEvent {
  evolutionEventType: string

  evolutionTime: string

  notes: string
}
