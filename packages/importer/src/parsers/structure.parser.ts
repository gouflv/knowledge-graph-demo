import {
  GraphNodeEntities,
  GraphNodeRelations,
  GraphNodeType,
  StructureMetaDto
} from '@lg/types'
import { Neo4jQuery } from '../neo4j/neo4j.query'

export async function structureParser(meta: StructureMetaDto) {
  const query = Neo4jQuery.getInstance()

  const docId = meta.sourceID

  const data: GraphNodeEntities.Structure = {
    id: meta.identifier,
    docId,
    type: meta.type,
    name: meta.type,
    meta: JSON.stringify(meta)
  }

  await query.saveNode(GraphNodeType.Structure, data)

  await query.saveRelation(
    {
      label: GraphNodeType.Doc,
      id: docId
    },
    GraphNodeRelations.Contain,
    {
      label: GraphNodeType.Structure,
      id: data.id
    }
  )
}
