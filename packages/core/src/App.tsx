import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { createSignal } from 'solid-js'

function App() {
  const [disabled, setDisabled] = createSignal(false)
  return (
    <div class="cn-h-screen">
      <Form disabled={disabled()}>
        <Input />
        <button
          type="button"
          onClick={() => setDisabled(e => !e)}
        >
          button
        </button>
      </Form>
    </div>
  )
}

export default App
