import { GeoMetaDto, GraphNodeEntities, GraphNodeType } from '@lg/types'
import { Neo4jQuery } from '../neo4j/neo4j.query'

export async function geoParser(meta: GeoMetaDto) {
  const query = Neo4jQuery.getInstance()

  const docId = meta.sourceID

  const data: GraphNodeEntities.Geo = {
    id: meta.recordId,
    docId,
    name: meta.geographicalName,
    meta: JSON.stringify(meta)
  }

  await query.saveNode(GraphNodeType.Geo, data)
}
