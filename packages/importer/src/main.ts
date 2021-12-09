import 'reflect-metadata'

import { importPackage } from './importer'
import { Neo4jQuery } from './neo4j/neo4j.query'

async function run() {
  const query = Neo4jQuery.getInstance()

  await importPackage('/Users/gouflv/Projects/fujian-lib-graph/01(古籍)')

  await importPackage(
    '/Users/gouflv/Projects/fujian-lib-graph/02(期刊)/02(期刊)'
  )

  await importPackage('/Users/gouflv/Projects/fujian-lib-graph/03(图书)')

  await query.disconnect()
}
run()
