import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/cn'

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
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger:  'text-danger',
  neutral: 'text-foreground',
}

const trendConfig: Record<Trend, { icon: typeof TrendingUp; class: string }> = {
  up:   { icon: TrendingUp,   class: 'text-success' },
  down: { icon: TrendingDown,  class: 'text-danger' },
  flat: { icon: Minus,         class: 'text-muted-foreground' },
}

export function MetricCard({ label, value, description, tone = 'neutral', trend, className }: MetricCardProps) {
  const TrendIcon = trend ? trendConfig[trend].icon : null

  return (
    <div className={cn('rounded-md border border-border bg-background p-4 space-y-1', className)}>
      <div className="text-xs uppercase tracking-wider font-semibold text-subtle-foreground">{label}</div>
      <div className="flex items-baseline gap-2">
        <div className={cn('text-2xl font-semibold tabular-nums tracking-tight', toneValueClass[tone])}>
          {value}
        </div>
        {TrendIcon && (
          <TrendIcon className={cn('h-4 w-4', trendConfig[trend!].class)} />
        )}
      </div>
      {description && (
        <div className="text-xs text-muted-foreground">{description}</div>
      )}
    </div>
  )
}
