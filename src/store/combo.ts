import { createWithKey    } from 'happy-create'
import { createComputed   } from 'zustand-computed'
import { getComboBoxState } from '../juce'

export type ComboStore = {
  choices: string[]
  index  : number
  value  : string

  setIndex: (index: number) => boolean
  setValue: (value: string) => boolean
}

const _computed = createComputed((state: ComboStore) => ({
  comboProps: {
    choices         : state.choices,
    selected        : state.index  ,
    onSelectedChange: state.setIndex
  }
}))

export const useComboStore = createWithKey< ComboStore >()(
  < Key extends string >(key: Key) =>
    _computed((set, get) => {
      const state = getComboBoxState(key)

      state.valueChangedEvent.addListener(() => set({
        index: state.getChoiceIndex(),
        value: state.properties.choices[ state.getChoiceIndex() ]
      }))

      return {
        choices: state.properties.choices                          ,
        index  : state.getChoiceIndex()                            ,
        value  : state.properties.choices[ state.getChoiceIndex() ],

        setIndex: (index: number): boolean => {
          if (index < 0 || index >= get().choices.length)
            return false

          state.setChoiceIndex(index)
          return true
        },

        setValue: (value: string): boolean => {
          const index = state.properties.choices.indexOf(value)

          if (index === -1)
            return false

          state.setChoiceIndex(index)
          return true
        }
      }
    }
  )
)
