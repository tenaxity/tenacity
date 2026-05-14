import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/*
  Skeleton — content loading placeholder. Gentle pulse on bg-muted.
  Sharp corners (no rounded-full pills). Use to fill space while content loads,
  preserving layout to prevent reflow when data arrives.

  No shimmer — shimmer reads as performative / 2020s SaaS. Tenacity uses calm
  pulse. Industrial systems don't shimmer; they glow steadily.
*/

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn('animate-pulse rounded-sm bg-muted', className)}
      {...props}
    />
  )
}
