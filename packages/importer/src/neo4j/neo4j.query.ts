import { config as loadConfig } from '@lg/config'
import { GraphNodeType } from '@lg/types'
import { Connection } from 'cypher-query-builder'

let instance: Neo4jQuery

export class Neo4jQuery {
  private config = loadConfig().neo4j

  conn: Connection

  constructor() {
    this.conn = new Connection(this.config.url, {
      username: this.config.username,
      password: this.config.password
    })
  }

  async findNode<T>(label: GraphNodeType, id: string): Promise<T | null> {
    const [result] = await this.conn
      .matchNode('node', label, { id })
      .returnDistinct('node')
      .run()
    return result ? result.node : null
  }

  async saveNode<T extends Record<string, any>>(
    label: GraphNodeType,
    data: T
  ): Promise<T> {
    const found = await this.findNode<T>(label, data.id)
    if (found) {
      // TODO update exists record
      return found
    }

    const [{ node }] = await this.conn
      .createNode('node', label, data)
      .return('node')
      .run()
    return node
  }

  static getInstance() {
    instance ??= new Neo4jQuery()
    return instance
  }
}
