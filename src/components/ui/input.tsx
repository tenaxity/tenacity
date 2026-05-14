import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/*
  Input — single committed focus behavior, no opt-out.

  Default state: 1px gray border, all sides symmetric.
  Focus state:   border becomes primary + 3px primary bar slides in on the left
                 via inset box-shadow (no layout shift).

  This pattern (primary-colored left edge = active/focused) is part of a
  system-wide visual idiom. Same idiom should apply to:
    - Sidebar nav active items
    - Selected table rows
    - Active accordion sections
    - Any "this is the active thing" affordance

  Rules referenced: CLAUDE.md → Hard Rule #1 (no soft hue inside fillable surfaces),
  Hard Rule #3 (no glow rings), Hard Rule #8 (locked decisions remove alternatives).
*/

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-md border border-border bg-background px-3 text-base text-foreground',
        'placeholder:text-muted-foreground',
        'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
        'transition-colors outline-none',
        'focus-visible:border-primary focus-visible:shadow-bar-focus',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
