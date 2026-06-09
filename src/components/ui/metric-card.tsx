import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/cn'

/*
  Metric — open, not boxed (Hard Rule #3). A mono value over an uppercase
  label; compose several in a row and the strip reads as an instrument
  cluster. Color on the value is reserved for genuinely semantic readings
  (a failure count in danger) — default is ink.

  MetricRow wraps a set of metrics with hairline rules above and below.
*/

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
type Trend = 'up' | 'down' | 'flat'

interface MetricCardProps {
  label: string
  value: string | number
  description?: string
  tone?: Tone
  trend?: Trend
  className?: string
}

const toneValueClass: Record<Tone, string> = {
  primary: 'text-foreground',
  success: 'text-success',
  warning: 'text-warning',
  danger:  'text-danger',
  neutral: 'text-foreground',
}

const trendConfig: Record<Trend, { icon: typeof TrendingUp; class: string }> = {
  up:   { icon: TrendingUp,   class: 'text-success' },
  down: { icon: TrendingDown, class: 'text-danger' },
  flat: { icon: Minus,        class: 'text-muted-foreground' },
}

export function MetricCard({ label, value, description, tone = 'neutral', trend, className }: MetricCardProps) {
  const TrendIcon = trend ? trendConfig[trend].icon : null

  return (
    <div className={cn('space-y-1 min-w-0', className)}>
      <div className="flex items-baseline gap-2">
        <div className={cn('font-mono text-2xl font-semibold tabular-nums tracking-tight', toneValueClass[tone])}>
          {value}
        </div>
        {TrendIcon && (
          <TrendIcon className={cn('h-4 w-4', trendConfig[trend!].class)} />
        )}
      </div>
      <div className="text-xs uppercase tracking-wider font-semibold text-subtle-foreground">{label}</div>
      {description && (
        <div className="text-xs text-muted-foreground">{description}</div>
      )}
    </div>
  )
}

/* A ruled strip of metrics — the open instrument cluster. */
export function MetricRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-start gap-12 py-4 border-y border-rule', className)}>
      {children}
    </div>
  )
}
