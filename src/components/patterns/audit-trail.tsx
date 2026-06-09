import { FilePlus, Send, Eye, FileSignature, CheckCircle2, XCircle, AlertTriangle, Clock } from 'lucide-react'
import { Timeline, TimelineItem } from '@/components/ui/timeline'

/*
  AuditTrail — Document-domain pattern. Renders a chronological log of
  document events using Timeline. System enforces (icon, tone) per event type
  so designers can't render a "rejected" event in success-green by accident.
*/

type AuditEventType =
  | 'created'
  | 'sent'
  | 'opened'
  | 'signed'
  | 'completed'
  | 'rejected'
  | 'expired'
  | 'reminder-sent'
  | 'failed'

export interface AuditEvent {
  type: AuditEventType
  /** Person/system that triggered the event */
  actor: string
  timestamp: string
  detail?: string
}

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral'

const eventConfig: Record<AuditEventType, { tone: Tone; icon: typeof Send; verb: string }> = {
  'created':       { tone: 'neutral', icon: FilePlus,      verb: 'created the document' },
  'sent':          { tone: 'primary', icon: Send,          verb: 'sent for signing' },
  'opened':        { tone: 'neutral', icon: Eye,           verb: 'opened the document' },
  'signed':        { tone: 'success', icon: FileSignature, verb: 'signed the document' },
  'completed':     { tone: 'success', icon: CheckCircle2,  verb: 'document fully executed' },
  'rejected':      { tone: 'danger',  icon: XCircle,       verb: 'rejected the document' },
  'expired':       { tone: 'neutral', icon: Clock,         verb: 'document expired' },
  // Reminders are routine plumbing, not alerts — neutral (Hard Rule #1).
  'reminder-sent': { tone: 'neutral', icon: Send,          verb: 'reminder sent' },
  'failed':        { tone: 'danger',  icon: AlertTriangle, verb: 'signature failed' },
}

interface AuditTrailProps {
  events: AuditEvent[]
  className?: string
}

export function AuditTrail({ events, className }: AuditTrailProps) {
  return (
    <Timeline className={className}>
      {events.map((event, i) => {
        const cfg = eventConfig[event.type]
        const Icon = cfg.icon
        return (
          <TimelineItem
            key={i}
            icon={<Icon />}
            tone={cfg.tone}
            timestamp={event.timestamp}
            detail={event.detail}
          >
            <span className="font-medium">{event.actor}</span>{' '}
            <span className="text-subtle-foreground">{cfg.verb}</span>
          </TimelineItem>
        )
      })}
    </Timeline>
  )
}
