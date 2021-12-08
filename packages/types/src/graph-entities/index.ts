export * as GraphNodeEntities from './nodes'

export enum GraphNodeType {
  Doc = 'Doc',
  Structure = 'Structure',
  Pic = 'Pic',
  Person = 'Person',
  Org = 'Org',
  Event = 'Event',
  Geo = 'Geo',
  Product = 'Product',
  Obj = 'Obj'
}

export enum GraphNodeRelations {
  /**
   * R belong to L
   *
   * @example
   *
   * Doc-[Contain]->Structure
   *
   * Structure-[Contain]->Pic
   *
   */
  Contain = 'CONTAIN',

  /**
   * Weak relationship between L|R, or R is shared
   *
   * @example
   *
   * Pic-[Ref]-Goe
   */
  Ref = 'REF'
}
