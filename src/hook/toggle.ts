import * as juce from '../juce'
import { useEffect, useState } from 'react'

export type ToggleDefault = {
  value?: boolean
}

export class Toggle {
  constructor(
    private _inner : juce.ToggleState | _FakeToggleState,
    private _update: () => void
  ) {
    this._inner.valueChangedEvent.addListener(() => this._update())
  }

  public get value(): boolean {
    return this._inner.getValue()
  }

  public set value(value: boolean) {
    this._inner.setValue(value)
    this._update()
  }
}

export const useToggle = (
  parameterId  : string,
  toggleDefault: ToggleDefault = {}
) => {
  const [toggle, setToggle] = useState< juce.ToggleState | _FakeToggleState >(new _FakeToggleState(toggleDefault))
  const [      , update   ] = useState({})

  useEffect(() => {
    setToggle(juce.getToggleState(parameterId))
  }, [parameterId])

  return new Toggle(toggle, () => update({}))
}

class _FakeToggleState {
  constructor(private _default: ToggleDefault) {}

  public valueChangedEvent = {
    addListener: (_listener: () => void) => {
      console.warn('addListener: Toggle is not initialized')
    }
  }

  public getValue(): boolean {
    return this._default.value ?? false
  }

  public setValue(value: boolean) {
    console.warn('setValue: Toggle is not initialized')
    this._default.value = value
  }
}
