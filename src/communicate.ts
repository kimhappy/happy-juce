import * as juce from './juce'

type CallbackId = [string, number]

export const callNativeFunction = (
  name   : string,
  ...args: any[]
): Promise< any > => juce.getNativeFunction(name)(...args)

export const fetchResource = (path: string): Promise< Response > => fetch(juce.getBackendResourceAddress(path))

export const sendEvent = (
  sendEventId: string,
  data       : any = {}
): void => window.__JUCE__.backend.emitEvent(sendEventId, data)

export const addEventReceiver = (
  recvEventId: string,
  callback   : (data: any) => CallbackId
): CallbackId => window.__JUCE__.backend.addEventListener(recvEventId, callback)

export const removeEventReceiver = (
  callbackId: CallbackId
): void => window.__JUCE__.backend.removeEventListener(callbackId)
