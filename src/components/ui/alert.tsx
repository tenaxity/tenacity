import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  Alert — inline notice. Two variants per Hard Rule #1 (no soft tints inside fillable surfaces):
    outline (default): white bg, colored border + colored icon + foreground body text
    solid:             full primary/semantic bg, white text. Use sparingly for urgent/critical alerts.

  No tinted bg variant. Outline is the calm version; solid is the loud version.
*/

const alertStyles = cva(
  'flex items-start gap-3 rounded-md p-4',
  {
    variants: {
      tone: {
        info:    '',
        success: '',
        warning: '',
        danger:  '',
      },
      variant: {
        outline: 'bg-background border',
        solid:   'border',
      },
    },
    compoundVariants: [
      // Outline: colored border + colored icon, foreground body text
      { tone: 'info',    variant: 'outline', class: 'border-primary' },
      { tone: 'success', variant: 'outline', class: 'border-success' },
      { tone: 'warning', variant: 'outline', class: 'border-warning' },
      { tone: 'danger',  variant: 'outline', class: 'border-danger'  },
      // Solid: full bg fill
      { tone: 'info',    variant: 'solid', class: 'bg-primary  text-primary-foreground border-primary' },
      { tone: 'success', variant: 'solid', class: 'bg-success  text-success-foreground border-success' },
      { tone: 'warning', variant: 'solid', class: 'bg-warning  text-warning-foreground border-warning' },
      { tone: 'danger',  variant: 'solid', class: 'bg-danger   text-danger-foreground  border-danger'  },
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
    const isSolid = variant === 'solid'
    return (
      <div ref={ref} role="alert" className={cn(alertStyles({ tone, variant }), className)} {...props}>
        <Icon
          className={cn('h-5 w-5 shrink-0 mt-0.5', isSolid ? 'text-current' : iconToneClass[tone ?? 'info'])}
          strokeWidth={2}
        />
        <div className="flex-1 min-w-0">
          {title && <div className={cn('text-base font-semibold', isSolid ? 'text-current' : 'text-foreground')}>{title}</div>}
          {children && <div className={cn('text-base mt-0.5', isSolid ? 'text-current' : 'text-subtle-foreground', title && 'mt-1')}>{children}</div>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close alert"
            className={cn(
              'shrink-0 rounded-sm p-0.5 transition-colors',
              isSolid ? 'hover:bg-foreground/10 text-current' : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = 'Alert'
