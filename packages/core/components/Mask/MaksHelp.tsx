import imask from 'imask'
import type InputMask from 'imask/controls/input'
import type { FactoryArg } from 'imask/masked/factory'
import type { Signal } from 'solid-js'
import { createSignal } from 'solid-js'

/**
 * The touch corresponding to the key must be set using setTouched to trigger the verification properly
 */
export interface BaseIMaskProps<T extends string> {
  placeholder?: string
  transform?: (value?: string) => string | undefined
  onInput?: (e: Pick<InputMask, 'value' | 'unmaskedValue' | 'rawInputValue'>) => void
  name?: T
  value?: string
  errors?: string[] | null
  disabled?: boolean
  class?: string
  inputRootClass?: string
  ref?: (el: HTMLInputElement) => void
  onFocusOut?: () => void
  onFocusIn?: () => void
  showError?: boolean
  /**
   * @deprecated
   */
  setIsDirty?: (e: boolean) => void
  /**
   * @deprecated
   */
  setTouched?: (key: T, val?: boolean) => void
  /**
   * @deprecated
   */
  setData?: (key: T, val: any) => void
}

const defaultEventOptions = { bubbles: true, cancelable: true }
const onInputEvent = new Event('input', defaultEventOptions)
const onFocusOutEvent = new Event('focusout', defaultEventOptions)

export function disPatchInput(el: HTMLElement) {
  el.dispatchEvent(onInputEvent)
}

export function disPatchFocusOut(el: HTMLElement) {
  el.dispatchEvent(onFocusOutEvent)
}

interface IMaskHelp<T extends FactoryArg> {
  value: string
  onInput?: (e: Pick<InputMask, 'value' | 'unmaskedValue' | 'rawInputValue'>) => void
  maskOptions: T
  transform?: (value?: string) => string | undefined
}

export function MaskHelp<T extends FactoryArg>(props: IMaskHelp<T>) {
  const [mask, setMask] = createSignal() as Signal<InputMask<FactoryArg>>
  const [valueEl, setValueEl] = createSignal() as Signal<HTMLInputElement>
  const maskRef = (el: HTMLInputElement) => {
    setMask(imask(el, props.maskOptions))
    !!props.value && (valueEl().value = props.value)
    setTimeout(() => {
      mask().value = valueEl().value ?? ''
      // eslint-disable-next-line solid/reactivity
      mask().on('accept', () => {
        valueEl().value = props.transform?.(mask().value) ?? mask().value
        props.onInput?.(mask())
        disPatchInput(valueEl())
      })
    }, 10)
  }
  return {
    mask,
    valueEl,
    maskRef,
    valueRef: setValueEl,
    focusOut: () => {
      disPatchFocusOut(valueEl())
    },
    clear: () => {
      mask().value = ''
      valueEl().value = ''
      disPatchInput(valueEl())
    },
  }
}

/**
 * @description If there are no digits included, return an empty string.
 * @param val
 */
export function verifyNumber(val?: string) {
  if (!val)
    return undefined
  const hasNumber = /\d/.test(val)
  return hasNumber ? val : ''
}

/**
 * @description Returns a purely numeric string
 * @param value
 */
export function transformNumber(value = '') {
  return value.replace(/\D/g, '')
}
