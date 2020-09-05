import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { getSDK } from '../../crossPlatform'
import { MINIAPP_UNHANDLEDREJECTION_ERROR } from '../../types'

const sdk = getSDK()

export interface UnhandledrejectionDetail extends OhbugBaseDetail {
  stack: string
}

export function onUnhandledRejection() {
  if (sdk.onUnhandledRejection) {
    sdk.onUnhandledRejection((error: PromiseRejectionEvent) => {
      const detail: UnhandledrejectionDetail = {
        message: error.reason.message || error.reason,
        stack: error.reason.stack,
      }
      const { client } = getOhbugObject()
      const event = client.createEvent<UnhandledrejectionDetail>({
        category: 'error',
        type: MINIAPP_UNHANDLEDREJECTION_ERROR,
        detail,
      })
      client.notify(event)
    })
  }
}
