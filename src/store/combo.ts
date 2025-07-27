import { createWithKey    } from 'happy-create'
import { getComboBoxState } from '../juce'

export type ComboStore = {
  choices: string[]
  index  : number
  value  : string

  setIndex: (index: number) => boolean
}

export const useComboStore = createWithKey< ComboStore >((key, set, get) => {
  const state = getComboBoxState(key)

  state.valueChangedEvent.addListener(() => set({
    index: state.getChoiceIndex(),
    value: get().choices[ state.getChoiceIndex() ]
  }))

  return {
    choices: state.properties.choices                          ,
    index  : state.getChoiceIndex()                            ,
    value  : state.properties.choices[ state.getChoiceIndex() ],

    setIndex: (index: number): boolean => {
      if (index < 0 || index >= get().choices.length) {
        return false
      }

      state.setChoiceIndex(index)
      return true
    }
  }
})
