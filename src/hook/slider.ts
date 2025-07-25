import * as juce from '../juce'
import { useEffect, useState } from 'react'

export type SliderDefault = {
  start   ?: number
  end     ?: number
  skew    ?: number
  numSteps?: number
  interval?: number
}

export const useSlider = (
  parameterId  : string,
  sliderDefault: SliderDefault = {}
) => {
  const [sliderState, setSliderState] = useState< _SliderState >(new _FakeSliderState(sliderDefault))
  const [           , update        ] = useState({})

  useEffect(() => {
    setSliderState(juce.getSliderState(parameterId))
  }, [parameterId])

  return new Slider(sliderState, () => update({}))
}

export const scaledToNormalised = (
  start: number,
  end  : number,
  skew : number,
  scaled: number
): number => Math.pow((scaled - start) / (end - start), skew)

export const NormalizedToScaled = (
  start     : number,
  end       : number,
  skew      : number,
  normalised: number
): number => Math.pow(normalised, 1 / skew) * (end - start) + start

export class Slider {
  constructor(
    private _inner : _SliderState,
    private _update: () => void
  ) {
    this._inner.valueChangedEvent.addListener(() => this._update())
  }

  public get value(): number {
    return this._inner.getScaledValue()
  }

  public set value(value: number) {
    let normalisedValue = scaledToNormalised(
      this._inner.properties.start,
      this._inner.properties.end,
      this._inner.properties.skew,
      value
    )
    this._inner.setNormalisedValue(normalisedValue)
    this._update()
  }

  public get normalisedValue(): number {
    return this._inner.getNormalisedValue()
  }

  public set normalisedValue(value: number) {
    this._inner.setNormalisedValue(value)
    this._update()
  }

  public get start(): number {
    return this._inner.properties.start
  }

  public get end(): number {
    return this._inner.properties.end
  }

  public get skew(): number {
    return this._inner.properties.skew
  }

  public get numSteps(): number {
    return this._inner.properties.numSteps
  }

  public get interval(): number {
    return this._inner.properties.interval
  }
}

type _SliderState = juce.SliderState | _FakeSliderState

class _FakeSliderState {
  private _normalisedValue: number = 0

  public properties: {
    start   : number
    end     : number
    skew    : number
    numSteps: number
    interval: number
  }

  constructor(_default: SliderDefault) {
    if (_default.start === undefined && _default.end === undefined) {
      _default.start = 0
    }

    if (_default.start === undefined) {
      _default.start = _default.end! - 1
    }
    else if (_default.end === undefined) {
      _default.end = _default.start! + 1
    }

    _default.skew ??= 1

    if (_default.numSteps === undefined && _default.interval === undefined) {
      _default.numSteps = 101
    }

    if (_default.numSteps === undefined) {
      _default.numSteps = Math.round((_default.end! - _default.start!) / _default.interval!) + 1
    }
    else if (_default.interval === undefined) {
      _default.interval = (_default.end! - _default.start!) / (_default.numSteps! - 1)
    }

    this.properties = {
      start   : _default.start   !,
      end     : _default.end     !,
      skew    : _default.skew    !,
      numSteps: _default.numSteps!,
      interval: _default.interval!
    }
  }

  public valueChangedEvent = {
    addListener: (_listener: () => void) => {
      console.warn('addListener: Slider is not initialized')
    }
  }

  public getScaledValue(): number {
    return NormalizedToScaled(
      this.properties.start,
      this.properties.end  ,
      this.properties.skew ,
      this._normalisedValue
    )
  }

  public getNormalisedValue(): number {
    return this._normalisedValue
  }

  public setNormalisedValue(value: number) {
    console.warn('setNormalisedValue: Slider is not initialized')
    this._normalisedValue = value
  }
}
