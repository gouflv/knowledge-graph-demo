import { plainToInstance } from 'class-transformer'
import { ClassConstructor } from 'class-transformer/types/interfaces'
import { get, isArray } from 'lodash'
import {
  EventMetaDto,
  GeoMetaDto,
  MetaDto,
  ObjMetaDto,
  OrgMetaDto,
  PersonMetaDto,
  PicMetaDto,
  TopicMetaDto,
  UnionMateDto
} from '../dto'
import { MetaType } from '../types'

const TypeMap: Record<keyof typeof MetaType, ClassConstructor<any>> = {
  Base: MetaDto,
  Structure: MetaDto,
  Pic: PicMetaDto,
  Person: PersonMetaDto,
  Org: OrgMetaDto,
  Event: EventMetaDto,
  Geo: GeoMetaDto,
  Topic: TopicMetaDto,
  Obj: ObjMetaDto
}

export function toMetaInstances(type: MetaType, plain: unknown) {
  // Unwrap `root`
  const data = get(plain, 'root', plain)

  // Normalize `metadata` to array
  const metaArr: any[] = isArray(data.metadata)
    ? data.metadata
    : [data.metadata]

  return plainToInstance<UnionMateDto, unknown>(TypeMap[type], metaArr)
}
