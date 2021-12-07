import { toMetaInstances } from './parsers/meta.parser'
import { readFile, readPackage } from './reader'
import { logger } from './utils/logger'

export async function importPackage(path: string) {
  const pkg = await readPackage(path)

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
