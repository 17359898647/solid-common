import '@gedatou/solid-common/style.css'
import { Form } from '@gedatou/solid-common/Form'
import { Input } from '@gedatou/solid-common/Input'
import { Button } from '@gedatou/solid-common/Button'

function App() {
  return (
    <Form>
      <Input
        errors={['error1', 'error2']}
        label="demo"
      />
      <Button loading={true}>
        loading
      </Button>
    </Form>
  )
}

export default App
