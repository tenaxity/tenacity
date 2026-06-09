import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  StatusMark — the status idiom for dense data (CLAUDE.md → System patterns).

  A small sharp square + uppercase mono label in ink. The square carries the
  color; the text stays ink. Twenty green rows stay quiet; one red square jumps.

    filled  — the state happened (active or terminal)
    hollow  — the state hasn't happened (draft, not-run, pending-nothing)

  Never interactive, never gets hover states (Hard Rule #11). For emphasis
  contexts (page headers, cards) reach for Badge instead.
*/

const squareStyles = cva('h-2 w-2 shrink-0', {
  variants: {
    tone: {
      neutral: '',
      ink: '',
      success: '',
      warning: '',
      danger: '',
    },
    filled: {
      true: '',
      false: 'border border-rule-strong bg-transparent',
    },
  },
  compoundVariants: [
    { tone: 'neutral', filled: true, class: 'bg-muted-foreground' },
    { tone: 'ink',     filled: true, class: 'bg-primary' },
    { tone: 'success', filled: true, class: 'bg-success' },
    { tone: 'warning', filled: true, class: 'bg-warning' },
    { tone: 'danger',  filled: true, class: 'bg-danger' },
  ],
  defaultVariants: { tone: 'neutral', filled: true },
})

export interface StatusMarkProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof squareStyles> {}

export function StatusMark({ className, tone, filled, children, ...props }: StatusMarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)} {...props}>
      <span aria-hidden className={squareStyles({ tone, filled })} />
      <span className="font-mono text-xs font-medium uppercase tracking-wide text-foreground whitespace-nowrap">
        {children}
      </span>
    </span>
  )
}
