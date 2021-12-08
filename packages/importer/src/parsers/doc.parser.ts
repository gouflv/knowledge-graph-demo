import {
  DocMetaDto,
  DocType,
  GraphNodeEntities,
  GraphNodeType
} from '@lg/types'
import { Neo4jQuery } from '../neo4j/neo4j.query'

export async function docParser(type: DocType, meta: DocMetaDto) {
  const query = Neo4jQuery.getInstance()

  const data: GraphNodeEntities.Doc = {
    id: meta.identifier,
    type,
    name: meta.title,
    meta: JSON.stringify(meta)
  }

  await query.saveNode(GraphNodeType.Doc, data)
}
