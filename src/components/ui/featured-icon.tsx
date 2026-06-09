import { cva, type VariantProps } from 'class-variance-authority'
import { cloneElement, isValidElement, type ReactElement } from 'react'
import { cn } from '@/lib/cn'

/*
  FeaturedIcon — sharp square containing an icon. Used for emphasis at the
  top of modals, empty states, banners, etc.

  Color is scarce (Hard Rule #1): the default is a neutral gray square.
  Ink (primary) is solid for committed emphasis; success/warning/danger
  solids are reserved for genuine alert semantics (destructive confirms,
  failure states) — never decoration. No soft tints at any opacity.
  strokeWidth bumps to 2.5 for a chunkier, more committed mark.
*/

const featuredIconStyles = cva(
  'inline-flex items-center justify-center shrink-0 rounded-md',
  {
    variants: {
      tone: {
        neutral: 'bg-muted text-subtle-foreground',
        primary: 'bg-primary text-primary-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        danger:  'bg-danger  text-danger-foreground',
        outline: 'bg-transparent border border-rule-strong text-subtle-foreground',
      },
      size: {
        sm: 'h-8  w-8',
        md: 'h-10 w-10',
        lg: 'h-14 w-14',
      },
    },
    defaultVariants: { tone: 'neutral', size: 'md' },
  }
)

const iconSize = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' } as const

interface FeaturedIconProps extends VariantProps<typeof featuredIconStyles> {
  icon: ReactElement
  className?: string
}

export function FeaturedIcon({ tone, size = 'md', icon, className }: FeaturedIconProps) {
  const sizedIcon = isValidElement(icon)
    ? cloneElement(icon as ReactElement<{ className?: string; strokeWidth?: number }>, {
        className: cn(iconSize[size ?? 'md'], (icon as ReactElement<{ className?: string }>).props.className),
        strokeWidth: 2.5,
      })
    : icon

  return <span className={cn(featuredIconStyles({ tone, size }), className)}>{sizedIcon}</span>
}
