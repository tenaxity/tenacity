import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  Badge — three variants encoding system intent:

  solid    — committed, weighted. Default for ACTIVE statuses.
             Use when something is happening now, urgent, or primary.

  soft     — calm, ambient. Default for PASSIVE/terminal/info statuses.
             Use when something is settled, secondary, or background info.

  outline  — structural, precise. For categories, types, tags.
             Use when grouping/filtering — not for status.

  Default variant is solid because the Tenacity system favors filled gravity
  over pastel cushioning. Designers must opt-in to soft when they want calm.
*/

const badgeStyles = cva(
  'inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider border',
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

      // soft (ambient tint)
      { tone: 'neutral', variant: 'soft', class: 'bg-muted text-subtle-foreground border-border' },
      { tone: 'primary', variant: 'soft', class: 'bg-primary-subtle text-primary border-primary/20' },
      { tone: 'success', variant: 'soft', class: 'bg-success-subtle text-success border-success/20' },
      { tone: 'warning', variant: 'soft', class: 'bg-warning-subtle text-warning border-warning/20' },
      { tone: 'danger',  variant: 'soft', class: 'bg-danger-subtle  text-danger  border-danger/20'  },

      // outline (structural)
      { tone: 'neutral', variant: 'outline', class: 'bg-background text-foreground border-foreground/40' },
      { tone: 'primary', variant: 'outline', class: 'bg-background text-primary border-primary/60' },
      { tone: 'success', variant: 'outline', class: 'bg-background text-success border-success/60' },
      { tone: 'warning', variant: 'outline', class: 'bg-background text-warning border-warning/60' },
      { tone: 'danger',  variant: 'outline', class: 'bg-background text-danger  border-danger/60'  },
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
