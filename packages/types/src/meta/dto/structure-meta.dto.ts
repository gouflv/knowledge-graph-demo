import { DocMetaDto } from './doc-meta.dto'

export class StructureMetaDto extends DocMetaDto {
  toString() {
    return `Structure [${this.identifier}] refTo[${this.sourceID}] type[${this.type}] ${this.title}`
  }
}
