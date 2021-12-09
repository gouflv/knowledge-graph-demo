import { MetaBase } from './meta-base'

export class ObjMetaDto extends MetaBase {
  objectID: string

  identifier: never

  sourceID: string

  objectName: string

  classification: string

  subject: string

  keyword: string

  abstract: string

  toString() {
    return `Obj [${this.objectID}] refTo[${this.sourceID}] ${this.objectName}`
  }

  getId(): string {
    return `${this.sourceID}_${this.objectID}`
  }
}
