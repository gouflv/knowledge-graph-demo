import {
  GraphNodeEntities,
  GraphNodeRelations,
  GraphNodeType,
  StructureMetaDto
} from '@lg/types'
import { node, relation } from 'cypher-query-builder'
import { Neo4jQuery } from '../neo4j/neo4j.query'

export async function structureParser(meta: StructureMetaDto) {
  const query = Neo4jQuery.getInstance()
  const { conn } = query

  const docId = meta.sourceID

  const data: GraphNodeEntities.Structure = {
    id: meta.identifier,
    docId,
    type: meta.type,
    name: meta.title,
    meta: JSON.stringify(meta)
  }

  await query.saveNode(GraphNodeType.Structure, data)

  await conn
    .matchNode('d', GraphNodeType.Doc)
    .with('d')
    .matchNode('s', GraphNodeType.Structure)
    .with(['d', 's'])
    .where({
      'd.id': docId,
      's.id': data.id
    })
    .create([
      node('d'),
      relation('out', '', GraphNodeRelations.Contain),
      node('s')
    ])
    .run()
}
