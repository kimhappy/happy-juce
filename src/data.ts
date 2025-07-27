export const PLATFORM            = window.__JUCE__.initialisationData.__juce__platform
export const COMBO_IDS           = window.__JUCE__.initialisationData.__juce__comboBoxes
export const SLIDER_IDS          = window.__JUCE__.initialisationData.__juce__sliders
export const TOGGLE_IDS          = window.__JUCE__.initialisationData.__juce__toggles
export const NATIVE_FUNCTION_IDS = window.__JUCE__.initialisationData.__juce__functions
export const SEND_EVENT_IDS      = window.__JUCE__.initialisationData.__juce__registeredGlobalEventIds.filter(id => !id.startsWith('__juce__'))
export const RECV_EVENT_IDS      = window.__JUCE__.backend.listeners.eventListeners.keys().filter(key => !key.startsWith('__juce__')).toArray()
export const INIT_DATA           = Object.fromEntries(Object.entries(window.__JUCE__.initialisationData).filter(([key, _value]) => !key.startsWith('__juce__')))
