import 'reflect-metadata'

import { importPackage } from './importer'
import { Neo4jService } from './neo4j/neo4j.service'

function run() {
  importPackage('/Users/gouflv/Projects/fujian-lib-graph/01(古籍)')
}

async function neo4j() {
  const service = new Neo4jService()
  await service.connect()

  console.log(1)
}
neo4j()
