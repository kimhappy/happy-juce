export declare class ListenerList {
  listeners: Map< number, (payload?: any) => void >
  listenerId: number

  constructor()
  addListener(fn: (payload?: any) => void): number
  removeListener(id: number): void
  callListeners(payload?: any): void
}

export declare class EventListenerList {
  eventListeners: Map< string, ListenerList >

  constructor()
  addEventListener(eventId: string, fn: (args?: any) => any): [string, number]
  removeEventListener([eventId, id]: [string, number]): void
  emitEvent(eventId: string, object: any): void
}

export declare class Backend {
  listeners: EventListenerList

  constructor()
  addEventListener(eventId: string, fn: (args?: any) => any): [string, number]
  removeEventListener([eventId, id]: [string, number]): void
  emitEvent(eventId: string, object: any): void
  emitByBackend(eventId: string, object: any): void
}

export declare type Platform = 'windows' | 'android' | 'macos' | 'ios' | 'linux' | ''

export declare type InitialisationData = {
  __juce__platform: Platform[]
  __juce__functions: string[]
  __juce__registeredGlobalEventIds: string[]
  __juce__sliders: string[]
  __juce__toggles: string[]
  __juce__comboBoxes: string[]
  [key: string]: any
}

export declare type Juce = {
  backend: Backend
  initialisationData: InitialisationData

  postMessage: (message: string) => void
  getAndroidUserScripts?: () => string
}

declare global {
  var __JUCE__: Juce
  var inAndroidUserScriptEval: boolean | undefined
}
