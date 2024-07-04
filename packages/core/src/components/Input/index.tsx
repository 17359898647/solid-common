import type { JSX } from 'solid-js'
import { Show, mergeProps, splitProps } from 'solid-js'
import { useFormContext } from '../Form/FormContext.ts'
import { cn } from '../../utils/cn.ts'
import { InputError } from './InputError.tsx'

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element | null
  iconClass?: string
  rightSection?: JSX.Element | null
  rightSectionClass?: string
  inputRootClass?: string
  children?: JSX.Element
  errors?: string[] | null
  errorClass?: string
  label?: string
  labelClass?: string
  required?: boolean
  showError?: boolean
}

function Input(props: InputProps) {
  const formContext = useFormContext()
  const defaultProps = mergeProps(formContext, props)
  const [, rest] = splitProps(defaultProps, ['type', 'class'])
  return (
    <div class="w-full flex flex-col gap-y-2">
      <Show when={props.label}>
        <label class={cn('block text-sm font-medium text-gray-700', props.labelClass)}>
          {props.label}
          &nbsp
          {props.required && <span class="text-red-600">*</span>}
        </label>
      </Show>
      <div
        class={cn(
          'w-full flex h-10 overflow-hidden border border-gray-300 rounded hover:border-blue-500 group focus-within:!border-blue-500',
          props.errors && props.errors.length > 0 ? 'border-red-500 ' : '',
          props.inputRootClass,
          props.disabled ? '!border-gray-300' : '',
        )}
      >
        <Show when={props.icon}>
          <div
            class={cn(
              'px-3 h-auto flex items-center justify-center text-xs border-r',
              props.iconClass,
              props.disabled ? 'group-hover:border-gray-300' : 'group-hover:border-blue-500',
            )}
          >
            {props.icon}
          </div>
        </Show>
        <Show
          when={props.children}
          fallback={(
            <input
              type={props.type}
              class={cn(
                'w-full border-none focus:border-none p-2 text-sm items-center file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400  disabled:opacity-50 outline-none focus:ring-0 text-gray-950',
                props.class,
              )}
              {...rest}
            />
          )}
        >
          {props.children}
        </Show>

        <Show when={props.rightSection}>
          <div class={cn('w-6 h-auto flex items-center justify-center text-xs ', props.rightSectionClass)}>
            {props.rightSection}
          </div>
        </Show>
      </div>
      <Show when={props.showError !== false}>
        <InputError
          class={props.errorClass}
          errors={props.errors}
        />
      </Show>
    </div>
  )
}

export { Input }
