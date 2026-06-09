import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  Button — ink is the only interactive color (Hard Rule #1).

  Buttons are KEYS. Rest state carries a raised 1px bevel; :active inverts
  the bevel and dips the face 1px — the key physically sinks (Hard Rule #13).
  Bevels snap with no transition. Ghost/link variants are not keys (no
  bevel) but still dip. Disabled keys go flat — a dead key has no relief.
*/

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap rounded-md select-none transition-colors duration-micro focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 active:translate-y-[1px] disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground disabled:border-border disabled:shadow-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover key-raised-dark active:key-pressed-dark active:bg-primary',
        secondary:
          'bg-surface text-foreground border border-border hover:bg-muted key-raised active:key-pressed',
        ghost:
          'bg-transparent text-foreground hover:bg-muted',
        destructive:
          'bg-danger text-danger-foreground hover:opacity-90 active:opacity-100 key-raised-dark active:key-pressed-dark',
        link:
          'bg-transparent text-foreground underline-offset-2 hover:underline px-0 h-auto active:translate-y-0',
        'link-secondary':
          'bg-transparent text-subtle-foreground underline-offset-2 hover:underline hover:text-foreground px-0 h-auto active:translate-y-0',
      },
      size: {
        xs: 'h-6 px-2 text-xs gap-1',
        sm: 'h-7 px-2.5 text-xs',
        md: 'h-8 px-3 text-base',
        lg: 'h-9 px-4 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'
