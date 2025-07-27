import { createWithKey  } from 'happy-create'
import { getSliderState } from '../juce'

export type SliderStore = {
  type      : 'range'
  min       : number
  max       : number
  step      : number
  value     : number
  skew      : number
  normalised: number
  numSteps  : number

  setNormalised: (normalised: number) => boolean
  setValue     : (value     : number) => boolean
}

export const useSliderStore = createWithKey< SliderStore >()(< Key extends string >(key: Key) => (set, get) => {
  const state = getSliderState(key)

  state.valueChangedEvent.addListener(() => set({
    value     : state.getScaledValue    (),
    normalised: state.getNormalisedValue()
  }))

  return {
    type      : 'range' as const          ,
    min       : state.properties.start    ,
    max       : state.properties.end      ,
    step      : state.properties.interval ,
    value     : state.getScaledValue    (),
    skew      : state.properties.skew     ,
    normalised: state.getNormalisedValue(),
    numSteps  : state.properties.numSteps ,

    setNormalised: (normalised: number): boolean => {
      if (normalised < 0 || normalised > 1) {
        return false
      }

      state.setNormalisedValue(normalised)
      return true
    },

    setValue: (value: number): boolean =>
      get().setNormalised(
        scaledToNormalised(
          get().min ,
          get().max ,
          get().skew,
          value))
  }
})

export const scaledToNormalised = (
  start : number,
  end   : number,
  skew  : number,
  scaled: number
): number => Math.pow((scaled - start) / (end - start), skew)

export const normalisedToScaled = (
  start     : number,
  end       : number,
  skew      : number,
  normalised: number
): number => Math.pow(normalised, 1 / skew) * (end - start) + start
