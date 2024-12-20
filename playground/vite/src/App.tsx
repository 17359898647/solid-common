import '@gedatou/solid-common/style.css'
import { until } from '@gedatou/solid-common'
import { createSignal } from 'solid-js'

function App() {
  const [show, setShow] = createSignal(false)

  until(show).toBe(true).then((res) => {
    console.log(res)
  })
  return (
    <div>
      <div
        onClick={() => setShow(e => !e)}
      >
        33
      </div>
    </div>
  )
}

export default App
