import { mergeProps } from 'solid-js'

import { Input } from '../Input'

import type { BaseIMaskProps } from './MaksHelp'
import { MaskHelp, verifyNumber } from './MaksHelp'

export function ZipCodeInput<T extends string>(initProps: BaseIMaskProps<T>) {
  const props = mergeProps(
    {
      transform: verifyNumber,
      value: '',
    },
    initProps,
  )
  const { valueRef, maskRef, focusOut } = MaskHelp({
    ...props,
    maskOptions: {
      mask: [
        {
          mask: '00000',
        },
        {
          mask: '00000-0000',
        },
      ],
    },
  })
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
        disabled={props.disabled}
        errors={props.errors}
        placeholder={props.placeholder}
        showError={props.showError}
        type="text"
        onFocusOut={focusOut}
      />
    </>
  )
}
