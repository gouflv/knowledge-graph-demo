export abstract class MetaBase {
  /**
   * The identifier may duplicate between difference type of doc
   */
  identifier: string

  sourceID: string

  /**
   * Get source relation id
   */
  get recordId() {
    return this.sourceID
      ? `${this.sourceID}_${this.identifier}`
      : this.identifier
  }

  abstract toString(): void
}
