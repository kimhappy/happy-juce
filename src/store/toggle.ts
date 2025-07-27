import { createWithKey  } from 'happy-create'
import { createComputed } from 'zustand-computed'
import { getToggleState } from '../juce'

export type ToggleStore = {
  checked: boolean

  setChecked: (checked: boolean) => void
  toggle    : () => void
}

const _computed = createComputed((state: ToggleStore) => ({
  props: {
    type   : 'checkbox' as const,
    checked: state.checked
  }
}))

export const useToggleStore = createWithKey< ToggleStore >()(
  < Key extends string >(key: Key) =>
    _computed((set, get) => {
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
)
