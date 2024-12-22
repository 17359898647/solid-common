import type { DynamicProps, RootProps } from '@corvu/otp-field'
import OtpField from '@corvu/otp-field'
import type { Component, ComponentProps, ValidComponent } from 'solid-js'
import { Show, splitProps } from 'solid-js'

import { cn } from '@/utils/cn'

export const REGEXP_ONLY_DIGITS = '^\\d*$'
export const REGEXP_ONLY_CHARS = '^[a-zA-Z]*$'
export const REGEXP_ONLY_DIGITS_AND_CHARS = '^[a-zA-Z0-9]*$'

type OTPFieldProps<T extends ValidComponent = 'div'> = RootProps<T> & { class?: string }

function OTPField<T extends ValidComponent = 'div'>(props: DynamicProps<T, OTPFieldProps<T>>) {
  const [local, others] = splitProps(props as OTPFieldProps, ['class'])
  return (
    <OtpField
      class={cn(
        'h--flex h--items-center h--gap-2 disabled:h--cursor-not-allowed has-[:disabled]:h--opacity-50',
        local.class,
      )}
      {...others}
    />
  )
}

const OTPFieldInput = OtpField.Input

const OTPFieldGroup: Component<ComponentProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return (
    <div
      class={cn('h--flex h--items-center', local.class)}
      {...others}
    />
  )
}

const OTPFieldSlot: Component<ComponentProps<'div'> & { index: number }> = (props) => {
  const [local, others] = splitProps(props, ['class', 'index'])
  const context = OtpField.useContext()
  const char = () => context.value()[local.index]
  const showFakeCaret = () => context.value().length === local.index && context.isInserting()

  return (
    <div
      class={cn(
        'h--group h--relative h--flex h--size-10 h--items-center h--justify-center h--border-y h--border-r h--border-input h--text-sm first:h--rounded-l-md first:h--border-l last:h--rounded-r-md',
        local.class,
      )}
      {...others}
    >
      <div
        class={cn(
          'h--absolute h--inset-0 h--z-10 h--transition-all group-first:h--rounded-l-md group-last:h--rounded-r-md',
          context.activeSlots().includes(local.index) && 'h--ring-2 h--ring-ring h--ring-offset-background',
        )}
      />
      {char()}
      <Show
        when={showFakeCaret()}
      >
        <div
          class="h--pointer-events-none h--absolute h--inset-0 h--flex h--items-center h--justify-center"
        >
          <div
            class="h--h-4 h--w-px h--animate-caret-blink h--bg-foreground h--duration-1000"
          />
        </div>
      </Show>
    </div>
  )
}

const OTPFieldSeparator: Component<ComponentProps<'div'>> = (props) => {
  return (
    <div
      {...props}
    >
      <svg
        class="h--size-6"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12.1"
          cy="12.1"
          r="1"
        />
      </svg>
    </div>
  )
}

export { OTPField, OTPFieldGroup, OTPFieldInput, OTPFieldSeparator, OTPFieldSlot }
