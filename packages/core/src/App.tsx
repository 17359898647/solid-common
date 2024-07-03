import { createSignal } from 'solid-js'
import { Form } from './components/Form'
import { Input } from './components/Input'

function App() {
  const [disabled, setDisabled] = createSignal(false)
  return (
    <div class="cn-h-screen">
      <Form disabled={disabled()}>
        <Input
          required
          label="demo"
        />
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
