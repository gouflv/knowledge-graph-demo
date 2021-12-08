import { MetaType, MetaTypeToFileNameMap } from '@lg/types'
import * as fs from 'fs'
import { basename } from 'path'
import * as walkdir from 'walkdir'
import * as xml2js from 'xml2js'

type Package = {
  metadata: {
    type: MetaType
    file: string
  }[]
  object: {
    type: 'PDF'
    file: string
  }[]
}

const parser = new xml2js.Parser({
  explicitArray: false
})

export async function readPackage(path: string): Promise<Package> {
  return new Promise(resolve => {
    const result: Package = {
      metadata: [],
      object: []
    }

    readFolder(
      path,
      () => {
        //
      },
      (type, file) => {
        result.metadata.push({
          type,
          file
        })
      },
      () => {
        resolve(result)
      }
    )
  })
}

export async function readFile(path: string): Promise<unknown> {
  const file = fs.readFileSync(path)
  return await parser.parseStringPromise(file)
}

async function readFolder(
  path: string,
  onDirectory: (path: string) => void,
  onFile: (type: MetaType, path: string) => void,
  onEnd: () => void
) {
  const walker = walkdir(path)

  walker.on('directory', onDirectory)
  walker.on('file', path => {
    if (isValidateMetaFile(path)) {
      onFile(getMetaType(basename(path)), path)
    }
  })
  walker.on('end', onEnd)
}

function isValidateMetaFile(path: string) {
  return /\.xml$/.test(basename(path))
}

function getMetaType(filename: string): MetaType {
  for (let type in MetaTypeToFileNameMap) {
    if (!!~filename.indexOf(MetaTypeToFileNameMap[type])) {
      return type as MetaType
    }
  }
  throw new Error(`unknown file ${filename}`)
}
