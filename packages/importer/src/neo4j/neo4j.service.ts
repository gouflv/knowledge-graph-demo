import { config as loadConfig } from '@lg/config'
import { Driver, driver, Session } from 'neo4j-driver'

export class Neo4jService {
  private config = loadConfig().neo4j
  private driver: Driver

  async connect() {
    const instance = (this.driver = driver(this.config.url))
    await instance.verifyConnectivity()
    console.log(`[Neo4jService]: connected to ${this.config.url}`)
    return instance
  }

  async disconnect() {
    if (this.driver) await this.driver.close()
  }

  getSession(): Session {
    return this.driver.session({
      database: this.config.database
    })
  }

  async run(query: string, params?: Record<string, any>) {
    const session = this.getSession()
    try {
      const res = await session.run(query, params)
      return res
    } catch (e) {
      console.error(e)
    } finally {
      await session.close()
    }
  }
}
