import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { getSDK } from '../../crossPlatform'
import { MINIAPP_PAGENOTFOUND_ERROR } from '../../types'

const sdk = getSDK()

interface PageNotFoundRes {
  path: string
  query: object
  isEntryPage: boolean
}
export interface PageNotFoundDetail extends OhbugBaseDetail, PageNotFoundRes {}

export function onPageNotFound() {
  if (sdk.onPageNotFound) {
    sdk.onPageNotFound((res: PageNotFoundRes) => {
      const detail: PageNotFoundDetail = {
        ...res,
        message: `Page not found: ${res.path}`,
      }
      const { client } = getOhbugObject()
      const event = client.createEvent<PageNotFoundDetail>({
        category: 'error',
        type: MINIAPP_PAGENOTFOUND_ERROR,
        detail,
      })
      client.notify(event)
    })
  }
}
