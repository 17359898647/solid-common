import type { JSX } from 'solid-js'
import { For, Show } from 'solid-js'

import { cn } from '../../utils/cn.ts'

interface InputErrorProps {
  errors?: string[] | JSX.Element[] | null
  class?: string
}

export function InputError(props: InputErrorProps) {
  return (
    <Show
      when={props.errors && props.errors.length > 0}
    >
      <For
        each={props.errors}
      >
        {error => (
          <div
            class={cn('text-red-500 text-xs w-full text-left', props.class)}
          >
            {error}
          </div>
        )}
      </For>
    </Show>
  )
}
