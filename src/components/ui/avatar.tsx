import * as RadixAvatar from '@radix-ui/react-avatar'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  Avatar — circular by design (per Hard Rule #4 exception: circles are meaningful for
  identity/person representation, not decorative rounding).

  Sizes follow the system scale: 24/32/40/48 px (all even).
  Initials use neutral muted bg + foreground text — no per-user random colors.
  Image fallback handled via Radix.
  Status dot is optional, sits at bottom-right.
*/

const avatarStyles = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-foreground font-semibold uppercase select-none',
  {
    variants: {
      size: {
        sm: 'h-6 w-6 text-xs',
        md: 'h-8 w-8 text-xs',
        lg: 'h-10 w-10 text-base',
        xl: 'h-12 w-12 text-md',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

interface AvatarProps
  extends Omit<ComponentPropsWithoutRef<typeof RadixAvatar.Root>, 'children'>,
    VariantProps<typeof avatarStyles> {
  src?: string
  alt?: string
  initials?: string
  status?: 'online' | 'away' | 'offline'
}

export const Avatar = forwardRef<ElementRef<typeof RadixAvatar.Root>, AvatarProps>(
  ({ className, size, src, alt, initials, status, ...props }, ref) => (
    <RadixAvatar.Root
      ref={ref}
      className={cn(avatarStyles({ size }), className)}
      {...props}
    >
      {src && <RadixAvatar.Image src={src} alt={alt ?? ''} className="h-full w-full object-cover" />}
      <RadixAvatar.Fallback className="flex h-full w-full items-center justify-center">
        {initials}
      </RadixAvatar.Fallback>
      {status && <StatusDot status={status} size={size ?? 'md'} />}
    </RadixAvatar.Root>
  )
)
Avatar.displayName = 'Avatar'

function StatusDot({ status, size }: { status: 'online' | 'away' | 'offline'; size: 'sm' | 'md' | 'lg' | 'xl' }) {
  const dotSize = { sm: 'h-2 w-2', md: 'h-2 w-2', lg: 'h-2.5 w-2.5', xl: 'h-3 w-3' }[size]
  const tone = { online: 'bg-success', away: 'bg-warning', offline: 'bg-muted-foreground' }[status]
  return (
    <span
      className={cn(
        'absolute bottom-0 right-0 rounded-full ring-2 ring-background',
        dotSize,
        tone
      )}
    />
  )
}
