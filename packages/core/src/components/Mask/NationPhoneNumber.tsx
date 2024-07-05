import { createEffect, createSignal, mergeProps, on } from 'solid-js'
import { cn } from '../../utils/cn.ts'
import { useFormContext } from '../Form/FormContext.ts'
import { Input } from '../Input'
import { PhoneInput } from './PhoneInput'
import { MaskHelp, transformNumber } from './MaksHelp'
import type { BaseIMaskProps } from './MaksHelp'

export function NationPhoneInput<T extends string>(
  defaultProps: Omit<BaseIMaskProps<T>, 'setData' | 'setTouched' | 'setIsDirty' | 'onInput' | 'transform'> & {
    nationName?: string
    phoneName?: string
    /**
     * @default "01"
     */
    nationValue?: string
    phoneValue?: string
    onInput?: (e: { nation: string, phone: string }) => void
  },
) {
  const formContext = useFormContext()
  const props = mergeProps(
    {
      transform: (v: string) => v,
      nationValue: '01',
      phoneValue: '',
      ...formContext,
    },
    defaultProps,
  )
  const [NationValue, setNationValue] = createSignal<string>()
  const {
    maskRef: NationMaskRef,
    valueRef: NationValueRef,
    focusOut,
  } = MaskHelp({
    // eslint-disable-next-line solid/reactivity
    value: props.nationValue,
    maskOptions: {
      mask: '`+000',
      lazy: true,
    },
    onInput: ({ value }) => {
      setNationValue(value)
    },
    transform: transformNumber,
  })
  const [PhoneValue, setPhoneValue] = createSignal<string>()
  createEffect(
    on(
      [NationValue, PhoneValue],
      ([N, P]) => {
        props.onInput?.({
          nation: N ?? '',
          phone: P ?? '',
        })
      },
      { defer: true },
    ),
  )
  return (
    <Input
      errors={props.errors}
      inputRootClass={cn(
        'flex h-10 overflow-hidden border group rounded border-gray-300 hover:border-blue-500 group focus-within:!border-blue-500',
        props.errors && props.errors.length > 0 ? 'border-red-500 ' : '',
        props.inputRootClass,
        props.disabled ? '!border-gray-300 pointer-events-none' : '',
      )}
    >
      <input
        ref={NationValueRef}
        class="pointer-events-none hidden"
        name={props.nationName}
      />

      <input
        ref={NationMaskRef}
        disabled={props.disabled}
        class={
          cn('w-12 items-center border-0 border-r border-gray-300 p-2 text-sm text-gray-950 outline-none file:border-0 group-hover:border-blue-500 hover:border-blue-500 file:bg-transparent file:text-sm placeholder:text-gray-400 file:font-medium disabled:opacity-50 focus:ring-0 group-focus-within:!border-blue-500', (props.errors && props.errors.length > 0) && 'border-red-500')
        }
        onFocusOut={focusOut}
      />

      <PhoneInput
        disabled={props.disabled}
        inputRootClass="border-none"
        name={props.phoneName}
        placeholder={props.placeholder}
        transform={transformNumber}
        value={props.value}
        onInput={({ value }) => {
          setPhoneValue(value)
        }}
      />
    </Input>
  )
}
