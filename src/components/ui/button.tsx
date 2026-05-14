import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap rounded-md transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground disabled:border-border',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover',
        secondary:
          'bg-background text-foreground border border-border hover:bg-muted',
        ghost:
          'bg-transparent text-foreground hover:bg-muted',
        destructive:
          'bg-danger text-danger-foreground hover:opacity-90',
        link:
          'bg-transparent text-primary hover:underline px-0 h-auto',
        'link-secondary':
          'bg-transparent text-foreground hover:underline px-0 h-auto',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs gap-1',
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-3.5 text-base',
        lg: 'h-10 px-4 text-base',
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
