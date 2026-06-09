import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
  DescriptionList — the label/value strip for detail panels. Open + ruled
  (Hard Rule #3): hairline rules between rows, no box. The mono/sans
  boundary made structural (Hard Rule #2): labels are human (sans),
  values default to machine (mono, right-aligned). `prose` opts a value
  out for human text (names, descriptions).

  Detail drawers, document headers, and config panels live on this.
*/

export function DescriptionList({ className, ...props }: HTMLAttributes<HTMLDListElement>) {
  return <dl className={cn('divide-y divide-rule border-y border-rule', className)} {...props} />
}

interface DescriptionItemProps {
  label: ReactNode
  /** Human text value — Geist left-aligned instead of mono right-aligned */
  prose?: boolean
  children: ReactNode
  className?: string
}

export function DescriptionItem({ label, prose, children, className }: DescriptionItemProps) {
  return (
    <div className={cn('flex items-baseline justify-between gap-6 py-2', className)}>
      <dt className="text-xs font-medium text-subtle-foreground shrink-0">{label}</dt>
      <dd
        className={cn(
          'min-w-0 text-right',
          prose
            ? 'text-base text-foreground'
            : 'font-mono text-xs font-medium text-foreground tabular-nums'
        )}
      >
        {children}
      </dd>
    </div>
  )
}
