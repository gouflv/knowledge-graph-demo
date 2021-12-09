import { GraphNodeEntities, GraphNodeType, ObjMetaDto } from '@lg/types'
import { Neo4jQuery } from '../neo4j/neo4j.query'

export async function objParser(meta: ObjMetaDto) {
  const query = Neo4jQuery.getInstance()

  const docId = meta.sourceID

  const data: GraphNodeEntities.Obj = {
    id: meta.objectID,
    docId,
    name: meta.objectName,
    meta: JSON.stringify(meta)
  }

  await query.saveNode(GraphNodeType.Obj, data)
}
