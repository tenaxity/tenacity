import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/*
  Skeleton — content loading placeholder. Flat bg-subtle blocks, sharp
  corners. Pulse capped at 1.2s (Hard Rule #13 — no shimmer slower than
  that, and no shimmer at all: industrial systems don't shimmer).
  Preserves layout to prevent reflow when data arrives.
*/

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn('animate-pulse [animation-duration:1.2s] rounded-sm bg-subtle', className)}
      {...props}
    />
  )
}
