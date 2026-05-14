import { CheckCircle2, Clock, FileSignature, XCircle, AlertTriangle, Send } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

/*
  DocumentStatus — Leegality-domain pattern.
  System-encoded mapping: each status has a fixed tone, icon, AND variant.
  Active states get SOLID (gravity, urgency).
  Terminal/passive states get SOFT (settled, ambient).
  Designers cannot override — the system enforces hierarchy of attention.
*/

type Status =
  | 'draft'
  | 'sent'
  | 'in-progress'
  | 'completed'
  | 'rejected'
  | 'expired'
  | 'failed'

type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger'
type Variant = 'solid' | 'soft' | 'outline'

const config: Record<Status, { label: string; tone: Tone; variant: Variant; icon: typeof CheckCircle2 }> = {
  draft:        { label: 'Draft',       tone: 'neutral', variant: 'soft',  icon: FileSignature }, // passive — quiet
  sent:         { label: 'Sent',        tone: 'primary', variant: 'solid', icon: Send },          // active — urgent
  'in-progress':{ label: 'In progress', tone: 'warning', variant: 'solid', icon: Clock },         // active — awaiting
  completed:    { label: 'Completed',   tone: 'success', variant: 'soft',  icon: CheckCircle2 },  // terminal positive — settled
  rejected:     { label: 'Rejected',    tone: 'danger',  variant: 'solid', icon: XCircle },       // terminal negative — loud
  expired:      { label: 'Expired',     tone: 'neutral', variant: 'soft',  icon: Clock },         // terminal dead — quiet
  failed:       { label: 'Failed',      tone: 'danger',  variant: 'solid', icon: AlertTriangle }, // terminal error — loud
}

export function DocumentStatus({ status }: { status: Status }) {
  const { label, tone, variant, icon: Icon } = config[status]
  return (
    <Badge tone={tone} variant={variant}>
      <Icon className="h-3 w-3" strokeWidth={2.25} />
      {label}
    </Badge>
  )
}
