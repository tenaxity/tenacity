import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  Banner — page-top sticky notice. Always solid (full color bg, white text).
  Banners are inherently loud — they sit above content and demand attention.
  No outline variant — if you don't want loud, use Alert instead.
*/

const bannerStyles = cva(
  'flex items-center gap-3 px-6 py-3 text-base',
  {
    variants: {
      tone: {
        info:    'bg-primary text-primary-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        danger:  'bg-danger  text-danger-foreground',
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
        <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
        <div className="flex-1 min-w-0">{children}</div>
        {action && <div className="shrink-0">{action}</div>}
        {onClose && (
          <button onClick={onClose} aria-label="Close banner" className="shrink-0 rounded-sm p-0.5 hover:bg-foreground/10 transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Banner.displayName = 'Banner'
