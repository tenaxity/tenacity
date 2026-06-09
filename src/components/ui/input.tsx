import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/*
  Input — single committed focus behavior, no opt-out.

  Recessed = accepts (Hard Rule #7): a fillable surface is a well — faint
  dark inner edge top-left, machined into the surface. On focus the border
  turns ink and the 4px ink bar joins the recess (`well-focus`; no layout
  shift, no glow — Hard Rule #5). Relief snaps — no box-shadow transition.
  Disabled wells go flat: a dead well has no relief.

  The ink left edge = "this is the active thing" is a system-wide idiom:
  sidebar active items, selected table rows, active accordion sections.

  Dense: 32px tall (h-8), matching the terminal row rhythm.
*/

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-8 w-full rounded-md border border-border bg-surface px-3 text-base text-foreground well',
        'placeholder:text-muted-foreground',
        'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none',
        'transition-colors duration-micro outline-none',
        'focus-visible:border-primary focus-visible:well-focus',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
