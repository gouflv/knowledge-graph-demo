import { EventMetaDto } from './event-meta.dto'
import { GeoMetaDto } from './geo-meta.dto'
import { MetaDto } from './meta.dto'
import { ObjMetaDto } from './obj-meta.dto'
import { OrgMetaDto } from './org-meta.dto'
import { PersonMetaDto } from './person-meta.dto'
import { PicMetaDto } from './pic-meta.dto'
import { TopicMetaDto } from './topic-meta.dto'

export {
  MetaDto,
  PicMetaDto,
  PersonMetaDto,
  OrgMetaDto,
  EventMetaDto,
  GeoMetaDto,
  TopicMetaDto,
  ObjMetaDto
}

export type UnionMateDto =
  | MetaDto
  | PicMetaDto
  | PersonMetaDto
  | OrgMetaDto
  | EventMetaDto
  | GeoMetaDto
  | TopicMetaDto
  | ObjMetaDto
