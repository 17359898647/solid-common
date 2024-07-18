import { createEffect, createMemo, createSignal, mergeProps, on } from 'solid-js'

import { cn } from '../../utils/cn.ts'
import { Input } from '../Input'

import type { BaseIMaskProps } from './MaksHelp'
import { MaskHelp, verifyNumber } from './MaksHelp'

function maskFn(val: string) {
  if (val === ' ')
    return false
  if (val === '*')
    return true
  return !Number.isNaN(Number(val))
}

export enum SSNMask {
  allHidden = '`H`H`H-`H`H-`H`H`H`H',
  lastShow = '`H`H`H`-`H`H`-`S`S`S`S`',
  allShow = '`S`S`S`-`S`S`-`S`S`S`S`',
}
export const SSNInputEmptyMask = '###-##-####'
export type ISSNInputProps<T extends string> = BaseIMaskProps<T> & {
  hiddenMask?: SSNMask
  showMask?: SSNMask
  /**
   * @description when FocusIn clean InputValue
   */
  clean?: boolean
}

export function SSNInput<T extends string>(initProps: ISSNInputProps<T>) {
  const props = mergeProps(
    {
      transform: verifyNumber,
      hiddenMask: SSNMask.lastShow,
      showMask: SSNMask.allShow,
      value: '',
    },
    initProps,
  )
  const { mask, maskRef, valueRef, focusOut, clear } = MaskHelp({
    ...props,
    maskOptions: {
      // eslint-disable-next-line solid/reactivity
      mask: props.hiddenMask,
      lazy: false,
      definitions: {
        H: {
          mask: maskFn,
          placeholderChar: '#',
          displayChar: '*',
        },
        S: {
          mask: maskFn,
          placeholderChar: '#',
        },
      },
    },
  })
  const [show, setShow] = createSignal(false)
  createEffect(
    on(
      show,
      (verify) => {
        mask().updateOptions({
          mask: verify ? props.showMask : props.hiddenMask,
        })
      },
      { defer: true },
    ),
  )
  const rightSection = createMemo(() => {
    const size = 'size-4'
    return !show()
      ? (
          <i
            class={cn('icon-tabler:eye', size)}
            onClick={(e) => {
              e.stopPropagation()
              setShow(true)
            }}
          />
        )
      : (
          <i
            class={cn('icon-tabler:eye-off', size)}
            onClick={(e) => {
              e.stopPropagation()
              setShow(false)
            }}
          />
        )
  })

  return (
    <div>
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
        inputRootClass="relative"
        placeholder={props.placeholder}
        rightSection={rightSection()}
        rightSectionClass="cursor-pointer absolute right-0 h-full"
        showError={props.showError}
        type="text"
        onFocusOut={focusOut}
        onFocusIn={() => {
          props.clean && clear()
          props.onFocusIn?.()
        }}
      />
    </div>
  )
}
