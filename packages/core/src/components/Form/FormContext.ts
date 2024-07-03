import { createContext, useContext } from 'solid-js'
import type { ICustomFormProps } from './index.tsx'

export const FormContext = createContext<Pick<ICustomFormProps, 'disabled'>>({
  disabled: false,
})

export function useFormContext() {
  return useContext(FormContext)
}
