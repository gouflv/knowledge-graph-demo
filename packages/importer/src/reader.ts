import * as xml2js from 'xml2js'
import * as fs from 'fs'

const parser = new xml2js.Parser({
  explicitArray: false
})

export async function readFile(filename: string): Promise<unknown> {
  const file = fs.readFileSync(filename)
  return await parser.parseStringPromise(file)
}
