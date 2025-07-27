import { createWithKey  } from 'happy-create'
import { getSliderState } from '../juce'

export type SliderStore = {
  start     : number
  end       : number
  skew      : number
  numSteps  : number
  interval  : number
  normalized: number
  scaled    : number

  setNormalized: (normalized: number) => boolean
  setScaled    : (scaled    : number) => boolean
}

export const useSliderStore = createWithKey< SliderStore >((key, set, get) => {
  const state = getSliderState(key)

  state.valueChangedEvent.addListener(() => set({
    normalized: state.getNormalisedValue(),
    scaled    : state.getScaledValue    ()
  }))

  return {
    start     : state.properties.start    ,
    end       : state.properties.end      ,
    skew      : state.properties.skew     ,
    numSteps  : state.properties.numSteps ,
    interval  : state.properties.interval ,
    normalized: state.getNormalisedValue(),
    scaled    : state.getScaledValue    (),

    setNormalized: (normalized: number): boolean => {
      if (normalized < 0 || normalized > 1) {
        return false
      }

      state.setNormalisedValue(normalized)
      return true
    },

    setScaled: (scaled: number): boolean =>
      get().setNormalized(
        scaledToNormalized(
          get().start,
          get().end  ,
          get().skew ,
          scaled))
  }
})

export const scaledToNormalized = (
  start : number,
  end   : number,
  skew  : number,
  scaled: number
): number => Math.pow((scaled - start) / (end - start), skew)

export const normalizedToScaled = (
  start     : number,
  end       : number,
  skew      : number,
  normalized: number
): number => Math.pow(normalized, 1 / skew) * (end - start) + start
