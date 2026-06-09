import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  Banner — page-top notice. Same accent grammar as Alert: 4px left bar +
  colored icon on a white body (Hard Rules #1/#4 — functional color lives
  only in bars and icons, never as fill). Full-bleed: a bottom rule seats
  it against the page; no rounding, no shadow — it's content, not overlay.
*/

const bannerStyles = cva(
  'flex items-center gap-3 px-4 py-2 text-base bg-surface border-b border-rule border-l-4',
  {
    variants: {
      tone: {
        info:    'border-l-primary',
        success: 'border-l-success',
        warning: 'border-l-warning',
        danger:  'border-l-danger',
      },
    },
    defaultVariants: { tone: 'info' },
  }
)

const iconForTone = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
}

const iconToneClass = {
  info: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

export interface BannerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerStyles> {
  action?: ReactNode
  onClose?: () => void
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ className, tone = 'info', children, action, onClose, ...props }, ref) => {
    const Icon = iconForTone[tone ?? 'info']
    return (
      <div ref={ref} role="alert" className={cn(bannerStyles({ tone }), className)} {...props}>
        <Icon className={cn('h-5 w-5 shrink-0', iconToneClass[tone ?? 'info'])} strokeWidth={2} />
        <div className="flex-1 min-w-0 text-foreground">{children}</div>
        {action && <div className="shrink-0">{action}</div>}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close banner"
            className="shrink-0 rounded-sm p-0.5 transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Banner.displayName = 'Banner'
