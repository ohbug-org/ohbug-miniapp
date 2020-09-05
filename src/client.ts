import type { OhbugClient, OhbugConfig, OhbugSDK } from '@ohbug/types'
import { Client } from '@ohbug/core'
import { getGlobal } from '@ohbug/utils'

import { getDevice } from './device'
import { version } from './version'
import { extension } from './extension'
import { notifier } from './notifier'

interface MiniAppClient {
  _client: OhbugClient | null
  init: (config: OhbugConfig) => OhbugClient
}

function createClient(config: OhbugConfig) {
  const global = getGlobal()

  const sdk: OhbugSDK = {
    platform: 'ohbug-miniapp',
    version,
  }
  const client = new Client({
    sdk,
    config,
    device: getDevice,
    notifier,
  })
  global.__OHBUG__ = { client }
  client.use(extension)
  console.log(
    `%c @ohbug/miniapp %c Detected Ohbug v${version} %c`,
    'background:#333; padding: 2px 1px; color: #FFF',
    'background:#FF6F61; padding: 2px 1px; color: #FFF',
    'background:transparent'
  )

  return client
}

export const MiniAppClient: MiniAppClient = {
  _client: null,
  init(config: OhbugConfig) {
    if (MiniAppClient._client) {
      MiniAppClient._client._logger?.log('init() has been called. Ignored.')
      return MiniAppClient._client
    }
    MiniAppClient._client = createClient(config)

    return MiniAppClient._client
  },
}
