import type { OhbugGetDevice, OhbugDevice } from '@ohbug/types'
import { getSDK, getAppName } from './crossPlatform'

export const getDevice: OhbugGetDevice = () => {
  const sdk = getSDK()
  const currentAppName = getAppName()
  const systemInfo = sdk.getSystemInfoSync()

  const {
    brand,
    model,
    pixelRatio,
    screenWidth,
    screenHeight,
    windowWidth,
    windowHeight,
    statusBarHeight,
    language,
    version,
    system,
    platform,
    fontSizeSetting,
    SDKVersion,
    benchmarkLevel,
    albumAuthorized,
    cameraAuthorized,
    locationAuthorized,
    microphoneAuthorized,
    notificationAuthorized,
    notificationAlertAuthorized,
    notificationBadgeAuthorized,
    notificationSoundAuthorized,
    bluetoothEnabled,
    locationEnabled,
    wifiEnabled,
    safeArea,
    theme,

    app, // 支付宝小程序
    appName, // 字节跳动小程序
    battery, // 字节跳动小程序
    batteryLevel, // 微信小程序
    currentBattery, // 支付宝小程序
    storage, // 支付宝小程序、钉钉小程序
    wifiSignal, // 字节跳动小程序
  } = systemInfo

  const device: OhbugDevice = {
    device: {
      brand,
      battery: batteryLevel || currentBattery || battery,
      model,
      pixelRatio,
      screenWidth,
      screenHeight,
      windowWidth,
      windowHeight,
    },

    statusBarHeight,
    language,
    version,
    system,
    platform,
    fontSizeSetting,
    SDKVersion,
    benchmarkLevel,
    albumAuthorized,
    cameraAuthorized,
    locationAuthorized,
    microphoneAuthorized,
    notificationAuthorized,
    notificationAlertAuthorized,
    notificationBadgeAuthorized,
    notificationSoundAuthorized,
    bluetoothEnabled,
    locationEnabled,
    wifiEnabled,
    safeArea,
    theme,

    battery,
    batteryLevel,
    currentBattery,
    storage,
    wifiSignal,

    app: app || appName || currentAppName,
  }

  return device
}
