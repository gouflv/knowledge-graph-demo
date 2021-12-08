export class ProductMetaDto {
  identifier: string

  sourceID: string

  productName: string

  type: string

  /**
   * @Ref
   */
  originPlace: string

  description: string

  yield: string

  toString() {
    return `Product [${this.identifier}] refTo[${this.sourceID}] ${this.productName}`
  }
}
