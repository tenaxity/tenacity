import { cn } from '@/lib/cn'

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
  primary: 'text-primary',
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
          className="stroke-muted"
        />
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn('transition-[stroke-dashoffset] duration-500', toneStroke[tone])}
        />
      </svg>
      <div className={cn('font-semibold tabular-nums', fontSize, toneText[tone])}>{Math.round(pct)}%</div>
      {label && <div className="text-xs text-subtle-foreground">{label}</div>}
    </div>
  )
}
