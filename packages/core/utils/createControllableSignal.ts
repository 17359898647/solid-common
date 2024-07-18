import type { Accessor } from 'solid-js'
import { createMemo, createSignal, untrack } from 'solid-js'

import { accessWith } from './access.ts'

export interface CreateControllableSignalProps<T> {
  /** The value to be used, in controlled mode. */
  value?: Accessor<T | undefined>

  /** The initial value to be used, in uncontrolled mode. */
  defaultValue?: Accessor<T | undefined>

  /** A function that will be called when the value changes. */
  onChange?: (value: T) => void
}

/**
 * Creates a simple reactive state with a getter and setter,
 * that can be controlled with `value` and `onChange` props.
 */
export function createControllableSignal<T>(
  props: CreateControllableSignalProps<T>,
) {
  // Internal uncontrolled value
  const [_value, _setValue] = createSignal(props.defaultValue?.())

  const isControlled = createMemo(() => props.value?.() !== undefined)

  const value = createMemo(() => (isControlled() ? props.value?.() : _value()))

  const setValue = (next: Exclude<T, Function> | ((prev: T) => T)) => {
    untrack(() => {
      const nextValue = accessWith(next, value() as T)

      if (!Object.is(nextValue, value())) {
        if (!isControlled())
          _setValue(nextValue as Exclude<T, Function>)

        props.onChange?.(nextValue)
      }

      return nextValue
    })
  }

  return [value, setValue] as const
}
