import '@gedatou/solid-common/style.css'
import { Form } from '@gedatou/solid-common/Form'
import { Input } from '@gedatou/solid-common/Input'
import { ButtonPage } from './components/ButtonPage.tsx'

function App() {
  return (
    <Form
      class="px-4"
      loading={true}
    >
      <Input
        errors={['error1', 'error2']}
        label="demo"
      />
      <ButtonPage />
    </Form>
  )
}

export default App
