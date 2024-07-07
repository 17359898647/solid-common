import { createContext, useContext } from 'solid-js'
import type { ICustomFormProps } from './index'

export const FormContext = createContext<Pick<ICustomFormProps, 'disabled'>>({
  disabled: false,
})

export function useFormContext() {
  return useContext(FormContext)
}
