import { cn } from '@/lib/cn'

/*
  ScoreMeter — radial gauge for a 0–100 reading. Track is bg-subtle; the
  fill is ink by default. Functional color is allowed only when the reading
  is semantically a pass/fail signal (Hard Rule #1). The number is data —
  mono, tabular. No round caps, no entrance animation: data renders
  instantly (Hard Rule #13).
*/

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
type Size = 'sm' | 'md' | 'lg'

interface ScoreMeterProps {
  value: number
  max?: number
  label?: string
  tone?: Tone
  size?: Size
  className?: string
}

const toneStroke: Record<Tone, string> = {
  primary: 'stroke-primary',
  success: 'stroke-success',
  warning: 'stroke-warning',
  danger:  'stroke-danger',
  neutral: 'stroke-foreground',
}

const toneText: Record<Tone, string> = {
  primary: 'text-foreground',
  success: 'text-success',
  warning: 'text-warning',
  danger:  'text-danger',
  neutral: 'text-foreground',
}

const sizeConfig: Record<Size, { px: number; stroke: number; fontSize: string }> = {
  sm: { px: 48, stroke: 4, fontSize: 'text-xs' },
  md: { px: 72, stroke: 6, fontSize: 'text-md' },
  lg: { px: 96, stroke: 8, fontSize: 'text-xl' },
}

export function ScoreMeter({ value, max = 100, label, tone = 'primary', size = 'md', className }: ScoreMeterProps) {
  const { px, stroke, fontSize } = sizeConfig[size]
  const radius = (px - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className={cn('inline-flex flex-col items-center gap-1', className)}>
      <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`} className="-rotate-90">
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-subtle"
        />
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={toneStroke[tone]}
        />
      </svg>
      <div className={cn('font-mono font-semibold tabular-nums', fontSize, toneText[tone])}>{Math.round(pct)}%</div>
      {label && <div className="text-xs uppercase tracking-wider font-semibold text-subtle-foreground">{label}</div>}
    </div>
  )
}
