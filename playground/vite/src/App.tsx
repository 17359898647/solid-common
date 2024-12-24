import '@gedatou/solid-common/style.css'
import { _get } from '@felte/common'
import { createForm } from '@felte/solid'
import type { ICreateStoreHelperReturn } from '@gedatou/solid-common'
import { createStoreHelper, FelteHelpKey, useFelteHelp } from '@gedatou/solid-common'
import imask from 'imask'
import { createEffect, onCleanup } from 'solid-js'

export enum PhoneMaskStr {
  allHidden = '(HHH)` HHH`-HHHH',
  allShow = '(SSS)` SSS`-SSSS',
}
function maskHelp() {
  let el: HTMLInputElement
  const formatValue = imask.createPipe({
    mask: PhoneMaskStr.allHidden,
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
  })
  let felteHelp: ICreateStoreHelperReturn
  const abort = new AbortController()
  const ref = (e: HTMLInputElement) => {
    el = e
    const name = e.name
    const parent = el.closest('form')
    const key = parent?.dataset[FelteHelpKey]
    felteHelp = createStoreHelper(key)
    const isFelte = !!name && !!parent
    queueMicrotask(() => {
      el.value = formatValue(el.value)
    })

    el.addEventListener('input', () => {
      el.value = formatValue(el.value || '')
      isFelte && felteHelp.setData(name, el.value)
    }, {
      signal: abort.signal,
    })
    const unsubscribe = name
      ? felteHelp.subscribe(
          (data) => {
            const value = _get(data, name)
            el.value = value ? formatValue(String(value)) : ''
          },
        )
      : () => {}
    onCleanup(() => {
      unsubscribe?.()
      abort.abort()
    })
  }
  return {
    ref,
    formatValue,
  }
}

function App() {
  const { form, data, setData, touched } = createForm({
    initialValues: {
      phone: '123123123',
    },
    extend: [useFelteHelp],
  })
  createEffect(() => {
    console.log(data(), touched())
  })
  const { ref, formatValue } = maskHelp()
  return (
    <form
      ref={form}
      class="h--h-screen h--flex h--items-center h--justify-center"
    >
      <input
        // ref={ref}
        class="h--border-border h--border"
        name="phone"
        // value={formatValue(data('phone'))}
        // onInput={(e) => {
        //   console.log(e.target.value)
        // }}
      />
      <input
        class="h--border-border h--border"
        value={data('phone')}
        onInput={(e) => {
          setData('phone', formatValue(e.currentTarget.value))
        }}
      />
    </form>
  )
}

export default App
