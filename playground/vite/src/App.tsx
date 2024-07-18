import '@gedatou/solid-common/style.css'
import { Form, Input, NationPhoneInput, PhoneInput, SSNInput, ZipCodeInput } from '@gedatou/solid-common'

import { ButtonPage } from './components/ButtonPage'

function App() {
  return (
    <Form
      class="flex flex-col gap-2 px-4"
      disabled={false}
    >
      <Input
        errors={['error1', 'error2']}
        label="demo"
      />
      <SSNInput
        errors={['SSNError']}
        placeholder="SSN"
      />
      <PhoneInput
        errors={['PhoneError']}
        placeholder="Phone"
      />
      <NationPhoneInput
        errors={['Nation-PhoneErrors']}
        placeholder="Nation-Phone"
      />
      <ZipCodeInput
        errors={['Zip-CodeErrors']}
        placeholder="Zip-Code"
      />
      <ButtonPage />
    </Form>
  )
}

export default App
