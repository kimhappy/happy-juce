import { createWithKey    } from 'happy-create'
import { getComboBoxState } from '../juce'

export type ComboStore = {
  choices: string[]
  index  : number

  setIndex: (index: number) => boolean
}

export const useComboStore = createWithKey< ComboStore >((key, set) => {
  const state = getComboBoxState(key)

  state.valueChangedEvent.addListener(() => set({
    index: state.getChoiceIndex()
  }))

  return {
    choices: state.properties.choices,
    index  : state.getChoiceIndex()  ,

    setIndex: (index: number): boolean => {
      if (index < 0 || index >= state.properties.choices.length) {
        return false
      }

      state.setChoiceIndex(index)
      return true
    }
  }
})
