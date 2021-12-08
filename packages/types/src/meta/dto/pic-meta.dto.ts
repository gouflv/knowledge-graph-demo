import { DocMetaDto } from './doc-meta.dto'

export class PicMetaDto extends DocMetaDto {
  toString() {
    return `Pic [${this.identifier}] refTo[${this.sourceID}] type[${this.type}] ${this.title}`
  }
}
