export class TopicMetaDto {
  identifier: string

  sourceID: string

  productName: string

  type: string

  originPlace: string

  description: string

  yield: string

  toString() {
    return `Topic [${this.identifier}] refTo[${this.sourceID}] ${this.productName}`
  }
}
