declare const wx: any // 微信小程序、微信小游戏
declare const my: any // 支付宝小程序
declare const tt: any // 字节跳动小程序
declare const qq: any // QQ 小程序、QQ 小游戏

export interface SDK {
  request: Function
  getSystemInfoSync: Function
  getLaunchOptionsSync?: Function
  onError?: Function
  onUnhandledRejection?: Function
  onPageNotFound?: Function
  onMemoryWarning?: Function
}

export type AppName = 'wechat' | 'alipay' | 'bytedance' | 'qq' | 'unknown'

export function getSDK(): SDK {
  let sdk: SDK = {
    request: () => {},
    getSystemInfoSync: () => {},
  }

  if (typeof wx === 'object') {
    sdk = wx
  } else if (typeof my === 'object') {
    sdk = my
  } else if (typeof tt === 'object') {
    sdk = tt
  } else if (typeof qq === 'object') {
    sdk = qq
  } else {
    throw new Error(`@ohbug/miniapp does not support this platform`)
  }

  return sdk
}

export function getAppName(): AppName {
  let appName: AppName = 'unknown'

  if (typeof wx === 'object') {
    appName = 'wechat'
  } else if (typeof my === 'object') {
    appName = 'alipay'
  } else if (typeof tt === 'object') {
    appName = 'bytedance'
  } else if (typeof qq === 'object') {
    appName = 'qq'
  }

  return appName
}
