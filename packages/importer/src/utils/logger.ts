import * as path from 'path'
import { createLogger, format, transports } from 'winston'

const logFileBase = path.join(process.cwd(), '../../logs/')

export const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      format: format.simple()
    }),
    new transports.File({
      filename: `${logFileBase}import.log`,
      level: 'info',
      options: { flags: 'w' }
    })
  ]
})
