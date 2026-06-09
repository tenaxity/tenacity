import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  Alert — inline notice. The accent is a 4px left bar + colored icon; the
  body stays white (Hard Rule #4: no tinted backgrounds, and Hard Rule #1:
  functional color appears only in accent bars and icons).

    outline (default): hairline neutral border + tone left bar. The calm version.
    solid:             full 1px border in the tone color + tone left bar.
                       The loud version — stroke loudness, never fill.
*/

const alertStyles = cva(
  'flex items-start gap-3 rounded-md border border-l-4 bg-surface p-3',
  {
    variants: {
      tone: {
        info:    '',
        success: '',
        warning: '',
        danger:  '',
      },
      variant: {
        outline: '',
        solid:   '',
      },
    },
    compoundVariants: [
      // Outline: neutral frame, tone bar on the left edge
      { tone: 'info',    variant: 'outline', class: 'border-border border-l-primary' },
      { tone: 'success', variant: 'outline', class: 'border-border border-l-success' },
      { tone: 'warning', variant: 'outline', class: 'border-border border-l-warning' },
      { tone: 'danger',  variant: 'outline', class: 'border-border border-l-danger'  },
      // Solid: the whole frame takes the tone — louder stroke, same white body
      { tone: 'info',    variant: 'solid', class: 'border-primary' },
      { tone: 'success', variant: 'solid', class: 'border-success' },
      { tone: 'warning', variant: 'solid', class: 'border-warning' },
      { tone: 'danger',  variant: 'solid', class: 'border-danger'  },
    ],
    defaultVariants: { tone: 'info', variant: 'outline' },
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

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertStyles> {
  title?: ReactNode
  onClose?: () => void
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, tone = 'info', variant = 'outline', title, children, onClose, ...props }, ref) => {
    const Icon = iconForTone[tone ?? 'info']
    return (
      <div ref={ref} role="alert" className={cn(alertStyles({ tone, variant }), className)} {...props}>
        <Icon
          className={cn('h-5 w-5 shrink-0 mt-0.5', iconToneClass[tone ?? 'info'])}
          strokeWidth={2}
        />
        <div className="flex-1 min-w-0">
          {title && <div className="text-base font-semibold text-foreground">{title}</div>}
          {children && <div className={cn('text-base mt-0.5 text-subtle-foreground', title && 'mt-1')}>{children}</div>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close alert"
            className="shrink-0 rounded-sm p-0.5 transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = 'Alert'
