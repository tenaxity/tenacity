import { type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
  EmptyState — pattern for "there's nothing here yet." Centered container with
  optional icon, title, description, and CTA. Tenacity-distinctive touch:
  uses a faint outlined stamp shape as the default decorative element —
  echoes the loader vocabulary at rest.
*/

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: ReactNode
  action?: ReactNode
  className?: string
  /** Show the default stamp outline if no icon provided. Default: true */
  showStampDefault?: boolean
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  showStampDefault = true,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center px-6 py-12', className)}>
      <div className="mb-4 flex items-center justify-center">
        {icon ?? (showStampDefault && <DefaultStampIcon />)}
      </div>
      <div className="text-md font-semibold text-foreground">{title}</div>
      {description && (
        <div className="text-base text-subtle-foreground mt-1 max-w-md">{description}</div>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

function DefaultStampIcon() {
  // A faint outlined stamp + imprint at rest. Echoes the loader vocabulary
  // but static — "no document has been stamped yet."
  return (
    <div className="flex flex-col items-center gap-1 opacity-30">
      <div className="h-10 w-10 rounded-sm border-2 border-foreground" />
      <div className="h-1 w-8 rounded-sm bg-foreground/50" />
    </div>
  )
}
