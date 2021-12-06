import 'reflect-metadata'
import { MetaDto } from './dto/meta.dto'
import { toMetaClasses } from './parsers/meta.parser'
import { readFile } from './reader'

async function run() {
  const file = await readFile(
    '/Users/gouflv/Projects/fujian-lib-graph/01(古籍)/metadata/1300130202101(基础信息).xml'
  )
  const obj = toMetaClasses(MetaDto, file)

  debugger
}

run()
