import { mergeProps } from 'solid-js'
import { Input } from '../Input'
import type { BaseIMaskProps } from './MaksHelp'
import { MaskHelp, verifyNumber } from './MaksHelp'

export enum PhoneMask {
  allHidden = '(HHH)` HHH`-HHHH',
  allShow = '(SSS)` SSS`-SSSS',
}

export type IPhoneInputProps<T extends string> = BaseIMaskProps<T> & {
  onFocusIn?: (updateMask: (E: PhoneMask) => void) => void
  defaultMask?: PhoneMask
}

export function PhoneInput<T extends string>(initProps: IPhoneInputProps<T>) {
  const props = mergeProps(
    {
      transform: verifyNumber,
      defaultMask: PhoneMask.allShow,
      value: '',
    },
    initProps,
  )

  const { mask, maskRef, valueRef, focusOut } = MaskHelp({
    ...props,
    maskOptions: {
      mask: props.defaultMask,
      lazy: true,
      definitions: {
        H: {
          mask: Number,
          placeholderChar: '#',
          displayChar: '*',
        },
        S: {
          placeholderChar: '#',
          mask: Number,
        },
      },
    },
  })

  const onFocusIn = () => {
    props.onFocusIn?.((maskStr) => {
      mask().updateOptions({
        mask: maskStr,
      })
    })
  }

  return (
    <>
      <input
        ref={valueRef}
        class="pointer-events-none hidden"
        name={props.name}
        value={props.value}
      />
      <Input
        ref={maskRef}
        class={props.class}
        disabled={props.disabled}
        errors={props.errors}
        inputRootClass={props.inputRootClass}
        placeholder={props.placeholder}
        showError={props.showError}
        type="text"
        onFocusIn={onFocusIn}
        onFocusOut={focusOut}
      />
    </>
  )
}
