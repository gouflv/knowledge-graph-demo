import { ClassConstructor, plainToInstance } from 'class-transformer'
import { get, isArray } from 'lodash'

export function toMetaClasses<T>(
  cls: ClassConstructor<T>,
  plain: unknown
): T[] {
  // Unwrap `root`
  const data = get(plain, 'root', plain)

  // Normalize `metadata` to array
  const metaArr = (isArray(data) ? data : [data]).map(d => d.metadata)

  return plainToInstance<T, unknown>(cls, metaArr)
}
