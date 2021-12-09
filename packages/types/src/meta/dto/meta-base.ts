export abstract class MetaBase {
  identifier: string

  sourceID: string

  get recordId() {
    return this.sourceID
      ? `${this.sourceID}_${this.identifier}`
      : this.identifier
  }

  abstract toString(): void
}
