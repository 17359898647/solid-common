import type { JSX } from 'solid-js'
import { createEffect, on, splitProps } from 'solid-js'
import { createStore } from 'solid-js/store'
import { FormContext } from './FormContext.ts'

export interface ICustomFormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {
  class?: string
  disabled?: boolean
  loading?: boolean
}
export function Form(props: ICustomFormProps) {
  const [,rest] = splitProps(props, ['disabled'])
  const [state, setState] = createStore({
    // eslint-disable-next-line solid/reactivity
    disabled: props.disabled,
    // eslint-disable-next-line solid/reactivity
    loading: props.loading,
  })

  createEffect(on([() => props.disabled, () => props.loading], ([disabled, loading]) => {
    setState({ disabled, loading })
  }, { defer: true }))

  return (
    <FormContext.Provider value={state}>
      <form
        {...rest}
      />
    </FormContext.Provider>
  )
}
