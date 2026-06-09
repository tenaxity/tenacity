import { cn } from '@/lib/cn'

interface ProgressProps {
  value?: number
  max?: number
  indeterminate?: boolean
  tone?: 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}

/*
  Progress — linear bar. Determinate (value/max) or indeterminate (the
  system's only ambient motion, Hard Rule #13). Track is bg-subtle; fill
  is ink. Functional tones are allowed here — progress is data
  visualization (Hard Rule #1). Sharp corners — machined.
*/

const toneClass = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger:  'bg-danger',
} as const

export function Progress({ value = 0, max = 100, indeterminate = false, tone = 'primary', className }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemax={max}
      aria-valuemin={0}
      className={cn('relative h-2 w-full overflow-hidden rounded-sm bg-subtle', className)}
    >
      {indeterminate ? (
        <div className={cn('absolute inset-y-0 w-1/3 animate-progress-indeterminate rounded-sm', toneClass[tone])} />
      ) : (
        <div
          className={cn('h-full rounded-sm transition-[width] duration-seat ease-seat', toneClass[tone])}
          style={{ width: `${pct}%` }}
        />
      )}
    </div>
  )
}
