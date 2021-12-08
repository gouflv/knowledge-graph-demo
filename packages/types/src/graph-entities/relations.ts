export enum Relations {
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
