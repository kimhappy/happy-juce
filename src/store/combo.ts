import { createWithKey    } from 'happy-create'
import { createComputed   } from 'zustand-computed'
import { getComboBoxState } from '../juce'

export type ComboStore = {
  choices: string[]
  index  : number

  setIndex: (index: number) => boolean
}

const _computed = createComputed((state: ComboStore) => ({
  value: state.choices[ state.index ],

  props: {
    value: state.choices[ state.index ]
  }
}))

export const useComboStore = createWithKey< ComboStore >()(
  < Key extends string >(key: Key) =>
    _computed((set, get) => {
      const state = getComboBoxState(key)

      state.valueChangedEvent.addListener(() => set({
        index: state.getChoiceIndex()
      }))

      return {
        choices: state.properties.choices,
        index  : state.getChoiceIndex()  ,

        setIndex: (index: number): boolean => {
          if (index < 0 || index >= get().choices.length) {
            return false
          }

          state.setChoiceIndex(index)
          return true
        }
      }
    }
  )
)
