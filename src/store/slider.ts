import { createWithKey  } from 'happy-create'
import { getSliderState } from '../juce'

export type SliderStore = {
  start     : number
  end       : number
  interval  : number
  numSteps  : number
  skew      : number
  normalised: number
  scaled    : number

  setNormalised: (normalised: number) => boolean
  setScaled    : (scaled    : number) => boolean
}

export const useSliderStore = createWithKey< SliderStore >()(
  < Key extends string >(key: Key) =>
    (set, get) => {
      const state = getSliderState(key)

      state.valueChangedEvent.addListener(() => set({
        normalised: state.getNormalisedValue(),
        scaled    : state.getScaledValue    ()
      }))

      return {
        start     : state.properties.start    ,
        end       : state.properties.end      ,
        interval  : state.properties.interval ,
        skew      : state.properties.skew     ,
        numSteps  : state.properties.numSteps ,
        normalised: state.getNormalisedValue(),
        scaled    : state.getScaledValue    (),

        setNormalised: (normalised: number): boolean => {
          if (normalised < 0 || normalised > 1)
            return false

          state.setNormalisedValue(normalised)
          return true
        },

        setScaled: (scaled: number): boolean =>
          get().setNormalised(
            scaledToNormalised(
              get().start ,
              get().end ,
              get().skew,
              scaled))
      }
    }
)

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
