import 'reflect-metadata'
import { toMetaInstances } from './parsers/meta.parser'
import { readFile, readPackage } from './reader'
import { logger } from './utils/logger'

async function run() {
  const pkg = await readPackage(
    '/Users/gouflv/Projects/fujian-lib-graph/01(古籍)'
  )

  console.log(pkg)

  for (const { type, file } of pkg.metadata) {
    logger.debug(`[${type}] ${file}`)

    const metaObj = await readFile(file)

    const metaArr = toMetaInstances(type, metaObj)

    metaArr.forEach(m => {
      logger.info(m.toString())
    })
  }
}

run()
