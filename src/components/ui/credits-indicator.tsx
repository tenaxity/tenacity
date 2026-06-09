import { cn } from '@/lib/cn'

/*
  CreditsIndicator — radial gauge showing % remaining of e-sign credits.
  The gauge is data visualization, so functional color is allowed: ink by
  default, warning/danger only as the balance genuinely runs low.
  The count is a data value — mono, tabular (Hard Rule #2).
*/

interface CreditsIndicatorProps {
  remaining: number
  total: number
  label?: string
  className?: string
}

export function CreditsIndicator({ remaining, total, label = 'Credits', className }: CreditsIndicatorProps) {
  const pct = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0
  const tone = pct < 0.15 ? 'danger' : pct < 0.35 ? 'warning' : 'primary'
  const r = 14
  const c = 2 * Math.PI * r
  const dash = c * pct

  const toneClass = { primary: 'stroke-primary', warning: 'stroke-warning', danger: 'stroke-danger' }[tone]

  return (
    <div className={cn('flex items-center gap-2 px-2 h-9 rounded-md hover:bg-muted transition-colors cursor-pointer', className)}>
      <svg width="32" height="32" viewBox="0 0 32 32" className="-rotate-90 shrink-0">
        <circle cx="16" cy="16" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
        <circle
          cx="16" cy="16" r={r}
          fill="none"
          className={toneClass}
          strokeWidth="3"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="text-xs uppercase tracking-wider font-semibold text-subtle-foreground">{label}</span>
        <span className="font-mono text-xs font-medium tabular-nums text-foreground">
          {remaining.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  )
}
