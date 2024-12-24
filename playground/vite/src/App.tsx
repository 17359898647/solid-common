import '@gedatou/solid-common/style.css'
import { _get } from '@felte/common'
import { createForm } from '@felte/solid'
import type { ICreateStoreHelperReturn } from '@gedatou/solid-common'
import { createStoreHelper, FelteHelpKey, noop, useFelteHelp } from '@gedatou/solid-common'
import { Button } from '@kobalte/core/button'
import type { FactoryArg, InputMask } from 'imask'
import imask from 'imask'
import type { UpdateOpts } from 'imask/masked/factory'
import { createEffect, createSignal, onCleanup } from 'solid-js'

export enum PhoneMaskStr {
  allHidden = '(HHH)` HHH`-HHHH',
  allShow = '(SSS)` SSS`-SSSS',
}

export enum maskStr {
  allHidden = '`H`H`H-`H`H-`H`H`H`H',
  allShow = '`S`S`S`-`S`S`-`S`S`S`S`',
  lastShow = '`H`H`H`-`H`H`-`S`S`S`S`',
}

function maskFn(val: string) {
  if (val === ' ')
    return false
  if (val === '*')
    return true
  return !Number.isNaN(Number(val))
}
function maskHelp(options: FactoryArg & { name?: string }) {
  let el: HTMLInputElement
  let felteHelp: ICreateStoreHelperReturn
  const [mask, setMask] = createSignal<InputMask<FactoryArg>>()
  const abort = new AbortController()
  const ref = (e: HTMLInputElement) => {
    el = e
    if (!el)
      return
    setMask(imask(el, options))
    if (!mask())
      return
    const parent = el.closest('form')
    const key = parent?.dataset[FelteHelpKey]
    const { name } = options
    felteHelp = createStoreHelper(key)
    const isFelte = !!name && !!parent
    queueMicrotask(() => {
      mask()!.value = el.value || ''
    })
    el.addEventListener('focusout', () => (isFelte && felteHelp.setTouched(name, true)), {
      signal: abort.signal,
    })
    el.addEventListener('input', () => {
      isFelte && felteHelp.setData(name, mask()!.rawInputValue)
    }, {
      signal: abort.signal,
    })
    const unsubscribe = isFelte
      ? felteHelp.subscribe(
          (data) => {
            const value = _get(data, name)
            queueMicrotask(() => {
              mask()!.value = String(value) ?? ''
            })
          },
        )
      : noop
    mask()!.on('accept', () => {
      console.log(mask()!.rawInputValue)
    })

    onCleanup(() => {
      unsubscribe?.()
      abort.abort()
    })
  }
  return {
    ref,
    mask,
    update: (options: UpdateOpts<FactoryArg>) => mask()?.updateOptions?.(options),
  }
}

function App() {
  const { form, data } = createForm({
    initialValues: {
      phone: '123123123',
    },
    extend: [useFelteHelp],
  })

  createEffect(() => {
    console.log(data())
  })
  let input: HTMLInputElement
  const { ref, update, mask } = maskHelp({
    mask: maskStr.allShow,
    lazy: true,
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
    name: 'phone',
  })
  return (
    <form
      ref={form}
      class="h--h-screen h--flex h--items-center h--justify-center"
    >
      <input
        ref={ref}
        class="h--border-border h--border"
        value={data('phone')}
        // onInput={(e) => {
        //   console.log(e.target.value)
        // }}
      />
      <input
        class="h--border-border h--border"
        name="phone"
        value={data('phone')}
      />
      <Button
        onClick={() => {
          mask()?.updateOptions({
            mask: maskStr.allHidden,
            lazy: true,
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
          })
        }}
      >
        change
      </Button>
    </form>
  )
}

export default App
