import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  OTPField,
  OTPFieldGroup,
  OTPFieldInput,
  OTPFieldSlot,
  until,
  useAxios,
} from '@gedatou/solid-common'
import { createSignal, untrack } from 'solid-js'
import '@gedatou/solid-common/style.css'

function App() {
  const [show, setShow] = createSignal(true)

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
      <OTPField
        maxLength={6}
      >
        <OTPFieldInput />
        <OTPFieldGroup>
          <OTPFieldSlot
            index={0}
          />
          <OTPFieldSlot
            index={1}
          />
          <OTPFieldSlot
            index={2}
          />
          <OTPFieldSlot
            index={3}
          />
          <OTPFieldSlot
            index={4}
          />
          <OTPFieldSlot
            index={5}
          />
        </OTPFieldGroup>
      </OTPField>
      <Accordion
        collapsible
        class="w-full"
        multiple={true}
      >
        <AccordionItem
          disabled
          value="item-1"
        >
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
        >
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
        >
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default App
