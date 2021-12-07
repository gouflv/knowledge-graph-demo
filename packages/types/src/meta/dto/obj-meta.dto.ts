export class ObjMetaDto {
  objectID: string

  sourceID: string

  objectName: string

  classification: string

  subject: string

  keyword: string

  abstract: string

  toString() {
    return `Obj [${this.objectID}] refTo[${this.sourceID}] ${this.objectName}`
  }
}
