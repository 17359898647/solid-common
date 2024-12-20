import { until } from '@gedatou/solid-common'
import { createSignal } from 'solid-js'

function App() {
  const [show, setShow] = createSignal(false)

  until(show).toBe(true).then((res) => {
    console.log(res)
  })
  return (
    <div>
      <button
        class="border text-blue-700"
        onClick={() => setShow(e => !e)}
      >
        33
      </button>
    </div>
  )
}

export default App
