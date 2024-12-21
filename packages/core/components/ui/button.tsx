import * as ButtonPrimitive from '@kobalte/core/button'
import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { JSX, ValidComponent } from 'solid-js'
import { Show, splitProps } from 'solid-js'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'h--inline-flex h--items-center h--justify-center h--gap-2 h--whitespace-nowrap h--rounded-md h--text-sm h--font-medium h--ring-offset-background h--transition-colors focus-visible:h--outline-none focus-visible:h--ring-2 focus-visible:h--ring-ring focus-visible:h--ring-offset-2 disabled:h--pointer-events-none disabled:h--opacity-50 [&_svg]:h--pointer-events-none [&_svg]:h--size-4 [&_svg]:h--shrink-0',
  {
    variants: {
      variant: {
        default: 'h--bg-primary h--text-primary-foreground hover:h--bg-primary/90',
        destructive: 'h--bg-destructive h--text-destructive-foreground hover:h--bg-destructive/90',
        outline: 'h--border h--border-input hover:h--bg-accent hover:h--text-accent-foreground',
        secondary: 'h--bg-secondary h--text-secondary-foreground hover:h--bg-secondary/80',
        ghost: 'hover:h--bg-accent hover:h--text-accent-foreground',
        link: 'h--text-primary h--underline-offset-4 hover:h--underline',
      },
      size: {
        default: 'h--h-10 h--px-4 h--py-2',
        sm: 'h--h-9 h--px-3 h--text-xs',
        lg: 'h--h-11 h--px-8',
        icon: 'h--size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps<T extends ValidComponent = 'button'> = ButtonPrimitive.ButtonRootProps<T> &
  VariantProps<typeof buttonVariants> & { class?: string | undefined, children?: JSX.Element, loading?: boolean }

function Button<T extends ValidComponent = 'button'>(props: PolymorphicProps<T, ButtonProps<T>>) {
  const [local, others] = splitProps(props as ButtonProps, ['variant', 'size', 'class', 'disabled', 'loading', 'children'])
  return (
    <ButtonPrimitive.Root
      class={cn(buttonVariants({ variant: local.variant, size: local.size }), 'gap-x-2', local.class)}
      disabled={local.loading || local.disabled}
      {...others}
    >
      <Show
        when={local.loading}
      >
        loading
      </Show>
      {local.children}
    </ButtonPrimitive.Root>
  )
}

export type { ButtonProps }
export { Button, buttonVariants }
