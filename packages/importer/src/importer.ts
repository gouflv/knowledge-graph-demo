import { DocMetaDto, DocType, MetaType, StructureMetaDto } from '@lg/types'
import { Neo4jQuery } from './neo4j/neo4j.query'
import { docParser } from './parsers/doc.parser'
import { structureParser } from './parsers/structure.parser'
import { readFile, readPackage } from './reader'
import { logger } from './utils/logger'
import { toMetaInstances } from './utils/meta'

export async function importPackage(path: string) {
  const pkg = await readPackage(path)
  const query = Neo4jQuery.getInstance()

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
        await structureParser(unionMeta as StructureMetaDto)
      }
    }
  }

  await query.conn.close()
}
