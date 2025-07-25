import * as juce from '../juce'
import { useEffect, useState } from 'react'

export type ComboDefault = {
  choices?: string[]
  index  ?: number
}

export class Combo {
  constructor(
    private _inner : _ComboState,
    private _update: () => void
  ) {
    this._inner.valueChangedEvent.addListener(() => this._update())
  }

  public get data(): string[] {
    return this._inner.properties.choices
  }

  public get index(): number {
    return this._inner.getChoiceIndex()
  }

  public set index(index: number) {
    this._inner.setChoiceIndex(index)
    this._update()
  }

  public get value(): string {
    return this._inner.properties.choices[ this.index ]
  }
}

export const useCombo = (
  parameterId : string,
  comboDefault: ComboDefault = {}
) => {
  const [combo, setCombo] = useState< _ComboState >(new _FakeComboState(comboDefault))
  const [     , update  ] = useState({})

  useEffect(() => {
    setCombo(juce.getComboBoxState(parameterId))
  }, [parameterId])

  return new Combo(combo, () => update({}))
}

type _ComboState = juce.ComboBoxState | _FakeComboState

class _FakeComboState {
  public properties: {
    choices       : string[]
    parameterIndex: number
  }

  constructor(_default: ComboDefault) {
    _default.index   ??= 0
    _default.choices ??= Array(_default.index + 1).fill('')

    this.properties = {
      choices       : _default.choices,
      parameterIndex: _default.index
    }
  }

  public valueChangedEvent = {
    addListener: (_listener: () => void) => {
      console.warn('addListener: Combo is not initialized')
    }
  }

  public getChoiceIndex(): number {
    return this.properties.parameterIndex
  }

  public setChoiceIndex(index: number) {
    console.warn('setChoiceIndex: Combo is not initialized')
    this.properties.parameterIndex = index
  }
}
