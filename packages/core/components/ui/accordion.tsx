import * as AccordionPrimitive from '@kobalte/core/accordion'
import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { JSX, ValidComponent } from 'solid-js'
import { splitProps } from 'solid-js'

import { cn } from '@/utils/cn'

const Accordion = AccordionPrimitive.Root

type AccordionItemProps<T extends ValidComponent = 'div'> =
  AccordionPrimitive.AccordionItemProps<T> & {
    class?: string | undefined
  }

function AccordionItem<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, AccordionItemProps<T>>) {
  const [local, others] = splitProps(props as AccordionItemProps, ['class'])
  return (
    <AccordionPrimitive.Item
      class={cn('h--border-b', local.class)}
      {...others}
    />
  )
}

type AccordionTriggerProps<T extends ValidComponent = 'button'> =
  AccordionPrimitive.AccordionTriggerProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

function AccordionTrigger<T extends ValidComponent = 'button'>(props: PolymorphicProps<T, AccordionTriggerProps<T>>) {
  const [local, others] = splitProps(props as AccordionTriggerProps, ['class', 'children'])
  return (
    <AccordionPrimitive.Header
      class="h--flex"
    >
      <AccordionPrimitive.Trigger
        class={cn(
          'h--flex h--flex-1 h--items-center h--justify-between h--py-4 h--font-medium h--transition-all hover:h--underline [&[data-expanded]>svg]:h--rotate-180',
          local.class,
        )}
        {...others}
      >
        {local.children}
        <svg
          class="h--size-4 h--shrink-0 h--transition-transform h--duration-200"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9l6 6l6 -6"
          />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

type AccordionContentProps<T extends ValidComponent = 'div'> =
  AccordionPrimitive.AccordionContentProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

function AccordionContent<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, AccordionContentProps<T>>) {
  const [local, others] = splitProps(props as AccordionContentProps, ['class', 'children'])
  return (
    <AccordionPrimitive.Content
      class={cn(
        'h--animate-accordion-up h--overflow-hidden h--text-sm h--transition-all data-[expanded]:h--animate-accordion-down',
        local.class,
      )}
      {...others}
    >
      <div
        class="h--pb-4 h--pt-0"
      >
        {local.children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
