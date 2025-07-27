import * as juce from './juce'

export type ReceiverId = [string, number]

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
  callback   : (data?: any) => any
): ReceiverId => window.__JUCE__.backend.addEventListener(recvEventId, callback)

export const removeEventReceiver = (
  receiverId: ReceiverId
): void => window.__JUCE__.backend.removeEventListener(receiverId)
