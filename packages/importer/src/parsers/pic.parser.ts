import { GraphNodeEntities, GraphNodeType, StructureMetaDto } from '@lg/types'
import { Neo4jQuery } from '../neo4j/neo4j.query'

export async function picParser(meta: StructureMetaDto) {
  const query = Neo4jQuery.getInstance()

  const docId = meta.sourceID

  const data: GraphNodeEntities.Pic = {
    id: meta.recordId,
    docId,
    type: meta.type,
    name: meta.title,
    meta: JSON.stringify(meta)
  }

  await query.saveNode(GraphNodeType.Pic, data)
}
