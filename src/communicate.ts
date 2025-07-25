import * as juce from './juce'

export const callNativeFunction = (
  name   : string,
  ...args: any[]
): Promise< any > => juce.getNativeFunction(name)(...args)

export const sendEvent = (
  sendEventId: string,
  data       : any = {}
): void => {
  window.__JUCE__.backend.emitEvent(sendEventId, data)
}

export const addEventReceiver = (
  recvEventId: string,
  callback   : (data: any) => void
): void => {
  window.__JUCE__.backend.addEventListener(recvEventId, callback)
}
