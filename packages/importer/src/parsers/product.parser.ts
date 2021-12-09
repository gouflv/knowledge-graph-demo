import { GraphNodeEntities, GraphNodeType, ProductMetaDto } from '@lg/types'
import { Neo4jQuery } from '../neo4j/neo4j.query'

export async function productParser(meta: ProductMetaDto) {
  const query = Neo4jQuery.getInstance()

  const docId = meta.sourceID

  const data: GraphNodeEntities.Product = {
    id: meta.recordId,
    docId,
    name: meta.productName,
    meta: JSON.stringify(meta)
  }

  await query.saveNode(GraphNodeType.Product, data)
}
