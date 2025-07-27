import { createWithKey  } from 'happy-create'
import { getToggleState } from '../juce'

export type ToggleStore = {
  type   : 'checkbox'
  checked: boolean

  setChecked: (checked: boolean) => void
}

export const useToggleStore = createWithKey< ToggleStore >()(< Key extends string >(key: Key) => (set) => {
  const state = getToggleState(key)

  state.valueChangedEvent.addListener(() => set({
    checked: state.getValue()
  }))

  return {
    type   : 'checkbox' as const,
    checked: state.getValue()   ,

    setChecked: state.setValue
  }
})
