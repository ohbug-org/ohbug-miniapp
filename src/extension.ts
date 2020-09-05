import { createExtension } from '@ohbug/core'
import { handleCapture } from './capture'

export const extension = createExtension({
  name: 'OhbugMiniApp',
  init: () => {
    handleCapture()
  },
  created: (event) => {
    // @ts-ignore
    const routers = (getCurrentPages?.() ?? []).map(
      (route: { route: string; options: object }) => ({
        route: route.route,
        options: route.options,
      })
    )
    if (Array.isArray(routers) && routers.length) {
      event.addMetaData('router', routers)
    }

    return event
  },
})
