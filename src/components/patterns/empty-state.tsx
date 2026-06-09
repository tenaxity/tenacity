import { type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
  EmptyState — pattern for "there's nothing here yet." Centered container
  with optional icon, title, description, and CTA. Default decoration is a
  faint hollow square — the system's "hasn't happened" marker (StatusMark
  vocabulary) at display size.
*/

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: ReactNode
  action?: ReactNode
  className?: string
  /** Show the default hollow-square mark if no icon provided. Default: true */
  showDefaultMark?: boolean
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  showDefaultMark = true,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center px-6 py-12', className)}>
      <div className="mb-4 flex items-center justify-center">
        {icon ?? (showDefaultMark && <DefaultMark />)}
      </div>
      <div className="text-md font-semibold text-foreground">{title}</div>
      {description && (
        <div className="text-base text-subtle-foreground mt-1 max-w-md">{description}</div>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

function DefaultMark() {
  // Hollow square over a hairline — "this slot exists; nothing has filled
  // it yet." The hollow idiom from StatusMark, scaled up and kept faint.
  return (
    <div className="flex flex-col items-center gap-2 opacity-40">
      <div className="h-10 w-10 rounded-sm border-2 border-rule-strong" />
      <div className="h-px w-12 bg-rule-strong" />
    </div>
  )
}
