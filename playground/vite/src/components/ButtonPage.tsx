import { Button } from '@gedatou/solid-common'
import { For } from 'solid-js'

export function ButtonPage() {
  const arr: ['link', 'confirm', 'cancel', 'disable_confirm', 'disable_cancel', 'default', 'default1', 'default2', 'destructive', 'outline', 'outline_teal', 'outline_sm', 'secondary', 'ghost', 'custom', 'primary', 'load_more'] = [
    'link',
    'confirm',
    'cancel',
    'disable_confirm',
    'disable_cancel',
    'default',
    'default1',
    'default2',
    'destructive',
    'outline',
    'outline_teal',
    'outline_sm',
    'secondary',
    'ghost',
    'custom',
    'primary',
    'load_more',
  ]
  return (
    <div
      class="grid cols-3 rows-3 gap-2"
    >
      <For
        each={arr}
      >
        {item => (
          <Button
            class="slef-center"
            variant={item}
          >
            {item}
          </Button>
        )}
      </For>
    </div>
  )
}
