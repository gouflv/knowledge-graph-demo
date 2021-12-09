import { MetaBase } from './meta-base'

export class PersonMetaDto extends MetaBase {
  identifier: string

  sourceID: string

  personalName: string

  variantPersonalName: string

  gender: string

  period: string

  birthDate: string

  deathDate: string

  nationality: string

  nativePlace: string

  ethnicGroup: string

  kinship: string

  /**
   * @Ref
   */
  kinshipPerson: string[]

  noKinship: string

  /**
   * @Ref
   */
  noKinshipPerson: string[]

  biography: string

  institution: string

  positions: string

  employTime: string

  writings: string

  notes: string

  toString() {
    return `Person [${this.identifier}] refTo[${this.sourceID}] ${this.personalName}`
  }
}
