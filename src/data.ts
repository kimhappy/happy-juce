export const getPlatform          = () => window.__JUCE__.initialisationData.__juce__platform
export const getComboIds          = () => window.__JUCE__.initialisationData.__juce__comboBoxes
export const getSliderIds         = () => window.__JUCE__.initialisationData.__juce__sliders
export const getToggleIds         = () => window.__JUCE__.initialisationData.__juce__toggles
export const getNativeFunctionIds = () => window.__JUCE__.initialisationData.__juce__functions
export const getSendEventIds      = () => window.__JUCE__.initialisationData.__juce__registeredGlobalEventIds.filter(id => !id.startsWith('__juce__'))
export const getRecvEventIds      = () => window.__JUCE__.backend.listeners.eventListeners.keys().filter(key => !key.startsWith('__juce__')).toArray()
export const getInitData          = (key: string) => window.__JUCE__.initialisationData[ key ]
