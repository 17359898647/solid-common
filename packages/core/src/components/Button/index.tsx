import type { Component, ComponentProps, JSX } from 'solid-js'
import { Show, mergeProps, splitProps } from 'solid-js'

import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { useFormContext } from '../Form/FormContext.ts'
import { cn } from '../../utils/cn.ts'

export const buttonVariants = cva(
  'inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 fill-blue-600',
  {
    variants: {
      variant: {
        confirm:
                    'bg-secondary-teal-600 hover:bg-secondary-green-400 text-white rounded-md py-2 px-3 text-sm font-semibold shadow-sm',
        cancel:
                    'border border-2 border-secondary-teal-600 hover:border-secondary-green-400 text-secondary-teal-600 hover:text-secondary-green-400 rounded-md py-2 px-3 text-sm font-semibold shadow-sm',
        disable_confirm: 'bg-[#D9D9D9] text-[#707070] rounded-md py-2 px-3 text-sm font-semibold shadow-sm',
        disable_cancel:
                    'border border-2 border-[#707070] text-[#707070] rounded-md py-2 px-3 text-sm font-semibold shadow-sm',
        default: 'border border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90',
        default1:
                    'border border-2 border-primary-600 bg-primary-600 text-primary-100 hover:text-primary-600 hover:bg-primary-100',
        default2:
                    'border border-2 border-secondary-teal-600 bg-secondary-teal-600 text-white hover:bg-secondary-teal-800 hover:border-secondary-teal-800',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 fill-destructive',
        outline:
                    'border border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-primary-foreground',
        outline_teal:
                    'border border-2 border-secondary-teal-600 text-secondary-teal-600 hover:bg-secondary-teal-600 hover:text-white',
        outline_sm:
                    'border border-1 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        custom: '',
        primary: 'bg-cyan-600 hover:bg-cyan-700 text-white disabled:bg-cyan-600',
        load_more: 'text-gray-700 bg-gray-50 text-sm font-medium h-10',
      },
      size: {
        default: 'h-9 px-6 py-2',
        xs: 'h-6 px-4',
        sm: 'h-9 rounded-md px-3 border-1',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: JSX.Element
}

export const Button: Component<ButtonProps> = (defaultProps) => {
  const formContext = useFormContext()
  const props = mergeProps(formContext, defaultProps)
  const [, rest] = splitProps(props, ['variant', 'size', 'class', 'icon'])
  return (
    <button
      class={cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)}
      {...rest}
      disabled={props.loading || props.disabled}
    >
      <Show
        when={props.loading}
        fallback={(
          <Show when={props.icon}>
            {props.icon}
          </Show>
        )}
      >
        <i class="icon-eos-icons:bubble-loading" />
      </Show>
      {props.children}
    </button>
  )
}
