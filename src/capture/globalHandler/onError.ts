import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { getSDK } from '../../crossPlatform'
import { MINIAPP_ERROR } from '../../types'

const sdk = getSDK()

export interface ErrorDetail extends OhbugBaseDetail {
  stack: string
}

export function onError() {
  if (sdk.onError) {
    sdk.onError((error: string) => {
      const detail: ErrorDetail = {
        stack: error,
      }
      const { client } = getOhbugObject()
      const event = client.createEvent<ErrorDetail>({
        category: 'error',
        type: MINIAPP_ERROR,
        detail,
      })
      client.notify(event)
    })
  }
}
