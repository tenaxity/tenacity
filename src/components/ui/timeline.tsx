import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

/*
  Timeline — vertical event log. Each item has a marker (icon or dot) on the
  left, with a connecting line running through to the next marker, and content
  on the right (title, timestamp, optional description).

  Tenacity-distinctive: markers use solid-filled small squares (mini FeaturedIcon)
  with semantic tones — same vocabulary as the rest of the system. The
  connecting line is muted gray. No bubbly circles or pastel timelines.

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

const toneClass: Record<Tone, string> = {
  primary: 'bg-primary text-primary-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  danger:  'bg-danger  text-danger-foreground',
  neutral: 'bg-foreground text-background',
}

type State = 'completed' | 'active' | 'pending'

interface TimelineItemProps {
  icon?: ReactElement
  tone?: Tone
  /**
   * State for stepper-style timelines (process / progression).
   *  - completed: solid success square with check icon
   *  - active:    primary-tone square with pulsing dot, primary ring around for "you are here"
   *  - pending:   outlined transparent square with muted dot, muted text
   *
   * If unset, falls back to chronological log mode (uses tone + icon directly).
   */
  state?: State
  /** Title row content — typically the event summary (Person + action) */
  children: ReactNode
  /** Right-side timestamp (e.g. "2 days ago", "Mar 28, 14:32") */
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
      <div className="flex flex-col items-center shrink-0">
        <div className={cn('flex items-center justify-center h-7 w-7 rounded-md', toneClass[tone])}>
          {icon
            ? cloneElement(icon, {
                className: cn('h-4 w-4', (icon.props as { className?: string }).className),
                strokeWidth: 2.5,
              } as Partial<{ className: string; strokeWidth: number }>)
            : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
        </div>
        {!__isLast && <div className="w-px flex-1 min-h-4 bg-border my-1" />}
      </div>

      <div className={cn('flex-1 min-w-0', !__isLast && 'pb-5')}>
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-base text-foreground min-w-0">{children}</div>
          {timestamp && <div className="text-xs text-muted-foreground tabular-nums shrink-0">{timestamp}</div>}
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
      <div className="flex flex-col items-center shrink-0">
        {/* Marker: visual changes per state */}
        {state === 'completed' && (
          <div className="flex items-center justify-center h-7 w-7 rounded-md bg-success text-success-foreground">
            <Check className="h-4 w-4" strokeWidth={3} />
          </div>
        )}
        {state === 'active' && (
          <div className="relative flex items-center justify-center h-7 w-7 rounded-md bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background">
            <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
          </div>
        )}
        {state === 'pending' && (
          <div className="flex items-center justify-center h-7 w-7 rounded-md border-2 border-border bg-background text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
          </div>
        )}
        {/* Connector line: solid before/at completed, muted after active */}
        {!__isLast && (
          <div className={cn(
            'w-px flex-1 min-h-4 my-1',
            state === 'completed' ? 'bg-success' : 'bg-border'
          )} />
        )}
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
              'text-xs tabular-nums shrink-0',
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
