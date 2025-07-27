import { createWithKey  } from 'happy-create'
import { getToggleState } from '../juce'

export type ToggleStore = {
  value: boolean

  setValue: (value: boolean) => void
  toggle  : () => void
}

export const useToggleStore = createWithKey< ToggleStore >((key, set) => {
  const state = getToggleState(key)

  state.valueChangedEvent.addListener(() => set({
    value: state.getValue()
  }))

  return {
    value: state.getValue(),

    setValue: (value: boolean): void => {
      state.setValue(value)
    },

    toggle: (): void => {
      state.setValue(!state.getValue())
    }
  }
})
