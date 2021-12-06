import { Transform } from 'class-transformer'
import get from 'lodash/get'

export const TransformKey = (key: string, defaults = '') =>
  Transform(({ obj }) => get(obj, key, defaults), { toClassOnly: true })
