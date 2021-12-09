import { config as loadConfig } from '@lg/config'
import { GraphNodeRelations, GraphNodeType } from '@lg/types'
import { Connection, node, relation } from 'cypher-query-builder'
import { NodeIdentity } from './types'

let instance: Neo4jQuery

export class Neo4jQuery {
  private config = loadConfig().neo4j

  conn: Connection

  constructor() {
    this.connect()
  }

  connect() {
    this.conn = new Connection(this.config.url, {
      username: this.config.username,
      password: this.config.password
    })
  }

  async disconnect() {
    await this.conn.close()
  }

  async findNode<T>(label: GraphNodeType, id: string): Promise<T | null> {
    const [result] = await this.conn
      .matchNode('node', label, { id })
      .returnDistinct('node')
      .run()
    return result ? result.node : null
  }

  async createNode<T extends Record<string, any>>(
    label: GraphNodeType,
    data: T
  ): Promise<T> {
    const [{ node }] = await this.conn
      .createNode('node', label, data)
      .return('node')
      .run()
    return node
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
    return this.createNode(label, data)
  }

  async findRelation(
    from: NodeIdentity,
    rel: GraphNodeRelations,
    to: NodeIdentity
  ): Promise<any> {
    const [match] = await this.conn
      .match([
        node('from', from.label, { id: from.id }),
        relation('out', 'rel', rel),
        node('to', to.label, { id: to.id })
      ])
      .return('*')
      .run()
    return match
  }

  async createRelation(
    from: NodeIdentity,
    rel: GraphNodeRelations,
    to: NodeIdentity
  ): Promise<any> {
    return await this.conn
      .matchNode('from', from.label)
      .with('from')
      .matchNode('to', to.label)
      .with('*')
      .where({
        'from.id': from.id,
        'to.id': to.id
      })
      .create([node('from'), relation('out', 'rel', rel), node('to')])
      .return(['from', 'rel', 'to'])
      .run()
  }

  async saveRelation(
    from: NodeIdentity,
    rel: GraphNodeRelations,
    to: NodeIdentity
  ): Promise<any> {
    const found = await this.findRelation(from, rel, to)
    if (found) {
      return found
    }
    return this.createRelation(from, rel, to)
  }

  static getInstance() {
    instance ??= new Neo4jQuery()
    return instance
  }
}
