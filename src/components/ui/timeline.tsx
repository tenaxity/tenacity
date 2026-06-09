import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

/*
  Timeline — vertical event log. Each item has a marker on the left, a
  hairline connector (bg-rule) running to the next marker, and content on
  the right (title, timestamp, optional detail).

  Markers follow the StatusMark vocabulary: small sharp squares. Icon events
  get a 24px square (neutral gray by default — color only when the event is
  genuinely semantic); plain events get an 8px square. The square carries
  the color; titles stay sans, timestamps are mono (Hard Rule #2).

  Composition:
    <Timeline>
      <TimelineItem icon={<Send/>} tone="primary" timestamp="...">
        Title text
      </TimelineItem>
      ...
    </Timeline>
*/

interface TimelineProps {
  children: ReactNode
  className?: string
}

export function Timeline({ children, className }: TimelineProps) {
  const items = Children.toArray(children)
  return (
    <div className={cn('flex flex-col', className)}>
      {items.map((child, i) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<{ __isLast?: boolean }>, { __isLast: i === items.length - 1 })
          : child
      )}
    </div>
  )
}

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral'

/* Icon markers: neutral is a quiet gray square; functional tones are solid. */
const toneBoxClass: Record<Tone, string> = {
  neutral: 'bg-muted text-subtle-foreground',
  primary: 'bg-primary text-primary-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  danger:  'bg-danger  text-danger-foreground',
}

/* Plain markers: the 8px StatusMark square. */
const toneSquareClass: Record<Tone, string> = {
  neutral: 'bg-muted-foreground',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger:  'bg-danger',
}

type State = 'completed' | 'active' | 'pending'

interface TimelineItemProps {
  icon?: ReactElement
  tone?: Tone
  /**
   * State for stepper-style timelines (process / progression).
   *  - completed: solid success square with check icon
   *  - active:    solid ink square, semibold title — "you are here"
   *  - pending:   hollow square (the state hasn't happened), muted text
   *
   * If unset, falls back to chronological log mode (uses tone + icon directly).
   */
  state?: State
  /** Title row content — typically the event summary (Person + action) */
  children: ReactNode
  /** Right-side timestamp (e.g. "2 days ago", "Mar 28, 14:32") — renders mono */
  timestamp?: ReactNode
  /** Optional sub-block below title — additional metadata, longer description */
  detail?: ReactNode
  /** Internal: set by Timeline to suppress the trailing connector on the last item */
  __isLast?: boolean
  className?: string
}

export function TimelineItem({
  icon,
  tone = 'neutral',
  state,
  children,
  timestamp,
  detail,
  __isLast = false,
  className,
}: TimelineItemProps) {
  // Stepper mode — state overrides tone/icon
  if (state) {
    return <StepperItem state={state} timestamp={timestamp} detail={detail} __isLast={__isLast} className={className}>{children}</StepperItem>
  }

  // Chronological log mode (default)
  return (
    <div className={cn('flex gap-3', className)}>
      <div className="flex flex-col items-center shrink-0 w-6">
        {icon ? (
          <div className={cn('flex items-center justify-center h-6 w-6 rounded-sm', toneBoxClass[tone])}>
            {cloneElement(icon, {
              className: cn('h-4 w-4', (icon.props as { className?: string }).className),
              strokeWidth: 2.5,
            } as Partial<{ className: string; strokeWidth: number }>)}
          </div>
        ) : (
          <span className={cn('h-2 w-2 mt-1.5 shrink-0', toneSquareClass[tone])} />
        )}
        {!__isLast && <div className="w-px flex-1 min-h-4 bg-rule my-1" />}
      </div>

      <div className={cn('flex-1 min-w-0', !__isLast && 'pb-5')}>
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-base text-foreground min-w-0">{children}</div>
          {timestamp && <div className="font-mono text-xs font-medium text-muted-foreground shrink-0">{timestamp}</div>}
        </div>
        {detail && <div className="text-base text-subtle-foreground mt-1">{detail}</div>}
      </div>
    </div>
  )
}

function StepperItem({
  state,
  children,
  timestamp,
  detail,
  __isLast,
  className,
}: {
  state: State
  children: ReactNode
  timestamp?: ReactNode
  detail?: ReactNode
  __isLast: boolean
  className?: string
}) {
  return (
    <div className={cn('flex gap-3', className)}>
      <div className="flex flex-col items-center shrink-0 w-6">
        {/* Marker: filled = happened, ink = happening, hollow = hasn't happened */}
        {state === 'completed' && (
          <div className="flex items-center justify-center h-6 w-6 rounded-sm bg-success text-success-foreground">
            <Check className="h-4 w-4" strokeWidth={3} />
          </div>
        )}
        {state === 'active' && (
          <div className="flex items-center justify-center h-6 w-6 rounded-sm bg-primary text-primary-foreground">
            <span className="h-2 w-2 bg-current" />
          </div>
        )}
        {state === 'pending' && (
          <div className="h-6 w-6 rounded-sm border border-rule-strong bg-transparent" />
        )}
        {/* Connector: hairline rule throughout — the markers carry the state */}
        {!__isLast && <div className="w-px flex-1 min-h-4 my-1 bg-rule" />}
      </div>

      <div className={cn('flex-1 min-w-0', !__isLast && 'pb-5')}>
        <div className="flex items-baseline justify-between gap-3">
          <div className={cn(
            'text-base min-w-0',
            state === 'completed' && 'text-foreground',
            state === 'active' && 'text-foreground font-semibold',
            state === 'pending' && 'text-muted-foreground'
          )}>
            {children}
          </div>
          {timestamp && (
            <div className={cn(
              'font-mono text-xs font-medium shrink-0',
              state === 'pending' ? 'text-muted-foreground/60' : 'text-muted-foreground'
            )}>
              {timestamp}
            </div>
          )}
        </div>
        {detail && (
          <div className={cn(
            'text-base mt-1',
            state === 'pending' ? 'text-muted-foreground' : 'text-subtle-foreground'
          )}>
            {detail}
          </div>
        )}
      </div>
    </div>
  )
}
