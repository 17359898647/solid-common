import type { JSX } from 'solid-js'
import { createEffect, on, splitProps } from 'solid-js'
import { createStore } from 'solid-js/store'
import { FormContext } from './FormContext.ts'

export interface ICustomFormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {
  class?: string
  disabled?: boolean
}
export function Form(props: ICustomFormProps) {
  const [,rest] = splitProps(props, ['disabled'])
  const [state, setState] = createStore({
    // eslint-disable-next-line solid/reactivity
    disabled: props.disabled,
  })

  createEffect(on(() => props.disabled, (e) => {
    setState('disabled', e)
  }, { defer: true }))

  return (
    <FormContext.Provider value={state}>
      <form {...rest} />
    </FormContext.Provider>
  )
}
