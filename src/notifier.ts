import type { OhbugEventWithMethods } from '@ohbug/types'
import { getOhbugObject } from '@ohbug/utils'
import { getSDK } from './crossPlatform'

const sdk = getSDK()

export function notifier<D>(event: OhbugEventWithMethods<D>) {
  const request = sdk.request
  const client = getOhbugObject().client
  const url = client._config.endpoint!

  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'POST',
      data: JSON.stringify(event),
      header: {
        'content-type': 'application/json',
      },
      success(res: { statusCode: number }): void {
        resolve(res)
      },
      fail(error: object): void {
        reject(error)
      },
    })
  })
}
