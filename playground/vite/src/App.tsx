import { Button, until, useAxios } from '@gedatou/solid-common'
import { createSignal, untrack } from 'solid-js'
import '@gedatou/solid-common/style.css'

function App() {
  const [show, setShow] = createSignal(false)

  const { loading, execute } = useAxios(() => !untrack(show), async (e) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    setShow(e)
  }, {
    immediate: false,
  })

  until(show).toBe(true).then((res) => {
    console.log(res)
  })
  return (
    <div>
      <Button
        loading={loading()}
        onClick={() => execute(!show())}
      >
        Primary
      </Button>
      <Button
        variant="secondary"
      >
        Secondary
      </Button>
      <Button
        variant="destructive"
      >
        Destructive
      </Button>
      <Button
        variant="outline"
      >
        Outline
      </Button>
      <Button
        variant="ghost"
      >
        Ghost
      </Button>
      <Button
        variant="link"
      >
        Link
      </Button>
    </div>
  )
}

export default App
