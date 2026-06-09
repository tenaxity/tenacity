import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  Badge — emphasis contexts only (page headers, cards, summaries).
  For repeating status in dense tables, use StatusMark instead.

  Badges speak machine: ALL CAPS mono, small, letter-spaced — they read
  as metadata, never as actions (Hard Rule #11).

  solid    — committed, weighted. Default for ACTIVE statuses.
  soft     — calm, ambient. For settled/terminal/info statuses.
  outline  — structural, precise. For categories, types, tags.
*/

const badgeStyles = cva(
  'inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider border whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: '',
        primary: '',
        success: '',
        warning: '',
        danger:  '',
      },
      variant: {
        solid:   '',
        soft:    '',
        outline: '',
      },
    },
    compoundVariants: [
      // solid (filled)
      { tone: 'neutral', variant: 'solid', class: 'bg-foreground text-background border-foreground' },
      { tone: 'primary', variant: 'solid', class: 'bg-primary text-primary-foreground border-primary' },
      { tone: 'success', variant: 'solid', class: 'bg-success text-success-foreground border-success' },
      { tone: 'warning', variant: 'solid', class: 'bg-warning text-warning-foreground border-warning' },
      { tone: 'danger',  variant: 'solid', class: 'bg-danger  text-danger-foreground  border-danger'  },

      // soft (ambient — the deliberate exception to Hard Rule #4)
      { tone: 'neutral', variant: 'soft', class: 'bg-muted text-subtle-foreground border-border' },
      { tone: 'primary', variant: 'soft', class: 'bg-subtle text-foreground border-border' },
      { tone: 'success', variant: 'soft', class: 'bg-success-subtle text-success border-success/20' },
      { tone: 'warning', variant: 'soft', class: 'bg-warning-subtle text-warning border-warning/20' },
      { tone: 'danger',  variant: 'soft', class: 'bg-danger-subtle  text-danger  border-danger/20'  },

      // outline (structural)
      { tone: 'neutral', variant: 'outline', class: 'bg-transparent text-foreground border-rule-strong' },
      { tone: 'primary', variant: 'outline', class: 'bg-transparent text-foreground border-foreground/60' },
      { tone: 'success', variant: 'outline', class: 'bg-transparent text-success border-success/60' },
      { tone: 'warning', variant: 'outline', class: 'bg-transparent text-warning border-warning/60' },
      { tone: 'danger',  variant: 'outline', class: 'bg-transparent text-danger  border-danger/60'  },
    ],
    defaultVariants: { tone: 'neutral', variant: 'solid' },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeStyles> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeStyles({ tone, variant }), className)} {...props} />
  )
)
Badge.displayName = 'Badge'
