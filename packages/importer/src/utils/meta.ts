import { DocTypeToDtoMap, MetaType, UnionMateDto } from '@lg/types'
import { plainToInstance } from 'class-transformer'
import { get, isArray } from 'lodash'

export function toMetaInstances(type: MetaType, plain: unknown) {
  // Unwrap `root`
  const data = get(plain, 'root', plain)

  // Normalize `metadata` to array
  const metaArr: any[] = isArray(data.metadata)
    ? data.metadata
    : [data.metadata]

  return plainToInstance<UnionMateDto, unknown>(DocTypeToDtoMap[type], metaArr)
}
