import { replace, getOhbugObject } from '@ohbug/utils'

type Level = 'log' | 'info' | 'warn' | 'error'
const levels: Level[] = ['log', 'info', 'warn', 'error']
const consoleOriginal = Object.keys(levels).reduce<Record<Level, any>>(
  (acc, cur: Level) => ({
    ...acc,
    [cur]: console[cur],
  }),
  {
    log: null,
    info: null,
    warn: null,
    error: null,
  }
)

export function captureConsole() {
  const { client } = getOhbugObject()
  levels.forEach((level) => {
    consoleOriginal[level] = replace(
      console,
      level,
      (origin) =>
        function (...args: any[]) {
          const isOhbugConsole = args.some(
            (arg) => typeof arg === 'string' && arg.includes('Ohbug')
          )
          if (!isOhbugConsole) {
            client.addAction(`console.${level}`, args, 'console')
          }

          return origin.apply(this, args)
        }
    )
  })
}
