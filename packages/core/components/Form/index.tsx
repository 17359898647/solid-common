import { createContext, useContext } from 'solid-js'

interface ICustomFormProps {
  class?: string
  disabled?: boolean
}

const FormContext = createContext<Pick<ICustomFormProps, 'disabled'>>({
  disabled: false,
})

export function useFormContext() {
  return useContext(FormContext)
}
export function Form() {
  return (
    <form>
      {/* <FormContext /> */}
    </form>
  )
}
