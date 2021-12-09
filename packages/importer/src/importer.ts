import {
  DocMetaDto,
  DocType,
  GeoMetaDto,
  GraphNodeRelations,
  GraphNodeType,
  MetaType,
  ObjMetaDto,
  PicMetaDto,
  ProductMetaDto,
  StructureMetaDto
} from '@lg/types'
import { isArray } from 'lodash'
import { Neo4jQuery } from './neo4j/neo4j.query'
import { NodeIdentity } from './neo4j/types'
import { docParser } from './parsers/doc.parser'
import { geoParser } from './parsers/geo.parser'
import { objParser } from './parsers/obj.parser'
import { picParser } from './parsers/pic.parser'
import { productParser } from './parsers/product.parser'
import { structureParser } from './parsers/structure.parser'
import { readFile, readPackage } from './reader'
import { logger } from './utils/logger'
import { toMetaInstances } from './utils/meta'

export async function importPackage(path: string) {
  const pkg = await readPackage(path)
  const query = Neo4jQuery.getInstance()

  const postRelations: {
    from: NodeIdentity
    rel: GraphNodeRelations
    to: NodeIdentity
  }[] = []

  // File parser
  for (const { type: fileType, file } of pkg.metadata) {
    logger.debug(`[${fileType}] ${file}`)

    const metaObj = await readFile(file)

    const metaArr = toMetaInstances(fileType, metaObj)

    for (const unionMeta of metaArr) {
      logger.info(unionMeta.toString())

      if (fileType === MetaType.Doc) {
        await docParser(DocType.Ancient, unionMeta as DocMetaDto)
      }

      if (fileType === MetaType.Structure) {
        const meta = unionMeta as StructureMetaDto
        await structureParser(meta)

        // tableID
        postRelations.push(
          ...createPostRelationsOnToMany(
            { id: meta.recordId, label: GraphNodeType.Structure },
            GraphNodeRelations.Contain,
            {
              idArray: normalArray(meta.tableID).map(
                id => `${meta.sourceID}_${id}`
              ),
              label: GraphNodeType.Pic
            }
          )
        )
      }

      if (fileType === MetaType.Pic) {
        const meta = unionMeta as PicMetaDto
        await picParser(meta)

        // geographicalName
        if (meta.geographicalName) {
          const geoId = normalArray(meta.geographicalName).map(
            id => `${meta.sourceID}_${pickId(id)}`
          )
          postRelations.push(
            ...createPostRelationsOnToMany(
              { id: meta.recordId, label: GraphNodeType.Pic },
              GraphNodeRelations.Ref,
              {
                idArray: geoId,
                label: GraphNodeType.Geo
              }
            )
          )
        }
      }

      if (fileType === MetaType.Geo) {
        await geoParser(unionMeta as GeoMetaDto)
      }

      if (fileType === MetaType.Product) {
        await productParser(unionMeta as ProductMetaDto)
      }

      if (fileType === MetaType.Obj) {
        await objParser(unionMeta as ObjMetaDto)
      }
    }
  }

  // Ref parser
  for (const { from, rel, to } of postRelations) {
    await query.saveRelation(from, rel, to)
  }

  // Optimize
  await createIdIndexes()
}

function createPostRelationsOnToMany(
  from: NodeIdentity,
  rel: GraphNodeRelations,
  to: {
    idArray: string[]
    label: GraphNodeType
  }
) {
  if (!to.idArray) return []
  return normalArray(to.idArray).map(id => ({
    from,
    rel,
    to: {
      id,
      label: to.label
    }
  }))
}

async function createIdIndexes() {
  const query = Neo4jQuery.getInstance()
  for (let node in GraphNodeType) {
    try {
      await query.conn
        .raw(
          `CREATE INDEX ${node.toLowerCase()}_id_index FOR (n:${node}) ON (n.id)`
        )
        .run()
    } catch (e) {}
  }
}

function pickId(str: string) {
  return str.replace(/^[^\[]*\[(\d+)\]$/, '$1')
}

function normalArray<T>(data: T | T[]): T[] {
  return isArray(data) ? data : [data]
}
