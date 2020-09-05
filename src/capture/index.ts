import { onError } from './globalHandler/onError'
import { onUnhandledRejection } from './globalHandler/onUnhandledRejection'
import { onPageNotFound } from './globalHandler/onPageNotFound'
import { onMemoryWarning } from './globalHandler/onMemoryWarning'
import { captureConsole } from './console/captureConsole'

export function handleCapture() {
  onError()
  onUnhandledRejection()
  onPageNotFound()
  onMemoryWarning()

  captureConsole()
}
