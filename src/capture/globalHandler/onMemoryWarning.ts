import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { getSDK } from '../../crossPlatform'
import { MINIAPP_MEMORYWARNING_ERROR } from '../../types'

const sdk = getSDK()

interface MemoryWarningRes {
  level: number | string
}
export interface MemoryWarningDetail
  extends OhbugBaseDetail,
    MemoryWarningRes {}

const levelMap = [
  { level: 5, description: 'TRIM_MEMORY_RUNNING_MODERATE' },
  { level: 10, description: 'TRIM_MEMORY_RUNNING_LOW' },
  { level: 15, description: 'TRIM_MEMORY_RUNNING_CRITICAL' },
]

export function onMemoryWarning() {
  if (sdk.onMemoryWarning) {
    sdk.onMemoryWarning((res: MemoryWarningRes) => {
      const detail: MemoryWarningDetail = {
        ...res,
        message: `MemoryWarning: ${
          levelMap.find(({ level }) => level == res.level)?.description ??
          'No alarm level information is obtained'
        }`,
      }
      const { client } = getOhbugObject()
      const event = client.createEvent<MemoryWarningDetail>({
        category: 'error',
        type: MINIAPP_MEMORYWARNING_ERROR,
        detail,
      })
      client.notify(event)
    })
  }
}
