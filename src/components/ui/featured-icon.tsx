import { cva, type VariantProps } from 'class-variance-authority'
import { cloneElement, isValidElement, type ReactElement } from 'react'
import { cn } from '@/lib/cn'

/*
  FeaturedIcon — solid filled square containing an icon. Used for emphasis at
  the top of modals, empty states, banners, etc.

  Sharp corners, semantic-tone solid fill, white icon inside. The white icon
  on solid color reads as "filled" even though the underlying lucide icons are
  stroke-based — we bump strokeWidth to 2.5 for a chunkier, more committed look.

  No soft tinted variants — per Hard Rule #1, surfaces don't get soft hue.
  The square is either solidly colored or it doesn't exist.
*/

const featuredIconStyles = cva(
  'inline-flex items-center justify-center shrink-0 rounded-md',
  {
    variants: {
      tone: {
        primary: 'bg-primary text-primary-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        danger:  'bg-danger  text-danger-foreground',
        neutral: 'bg-foreground text-background',
      },
      size: {
        sm: 'h-9  w-9',
        md: 'h-11 w-11',
        lg: 'h-14 w-14',
      },
    },
    defaultVariants: { tone: 'primary', size: 'md' },
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
