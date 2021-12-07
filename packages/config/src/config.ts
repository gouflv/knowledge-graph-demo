import { existsSync, readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'

export type Configuration = {
  neo4j: {
    scheme: string
    url: string
    port: string
    username: string
    password: string
    database: string
  }
}

const YAML_FILES = ['config.production.yml', 'config.yml']

export const config = (): Configuration => {
  let source: string
  YAML_FILES.reverse().forEach(yf => {
    const path = join(process.cwd(), yf)
    if (existsSync(path)) source = path
  })
  if (!source) {
    throw new Error(`Failed to read configuration`)
  }
  const file = readFileSync(source, { encoding: 'utf-8' })
  return yaml.load(file) as Configuration
}
