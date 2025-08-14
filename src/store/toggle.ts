import { createWithKey  } from 'happy-create'
import { getToggleState } from '../juce'

export type ToggleStore = {
  checked: boolean

  setChecked: (checked: boolean) => void
  toggle    : () => void
}

export const useToggleStore = createWithKey< ToggleStore >()(
  < Key extends string >(key: Key) =>
    (set, get) => {
      const state = getToggleState(key)

      state.valueChangedEvent.addListener(() => set({
        checked: state.getValue()
      }))

      return {
        checked: state.getValue(),

        setChecked: (checked: boolean) => state.setValue(checked),
        toggle    : () => get().setChecked(!get().checked)
      }
    }
)
