import { StatusMark } from '@/components/ui/status-mark'

/*
  DocumentStatus — domain pattern over the StatusMark idiom.
  System-encoded mapping: each status has a fixed tone and fill.
  Designers cannot override — the system enforces hierarchy of attention.

  Filled = the state happened (active or terminal).
  Hollow = the state hasn't happened (draft, expired-into-nothing).
  The square carries the color; the label stays ink (CLAUDE.md → StatusMark).
*/

type Status =
  | 'draft'
  | 'sent'
  | 'in-progress'
  | 'completed'
  | 'rejected'
  | 'expired'
  | 'failed'

type Tone = 'neutral' | 'ink' | 'success' | 'warning' | 'danger'

const config: Record<Status, { label: string; tone: Tone; filled: boolean }> = {
  draft:         { label: 'Draft',       tone: 'neutral', filled: false }, // hasn't happened yet
  sent:          { label: 'Sent',        tone: 'ink',     filled: true  }, // active, in motion
  'in-progress': { label: 'In progress', tone: 'warning', filled: true  }, // active, awaiting
  completed:     { label: 'Completed',   tone: 'success', filled: true  }, // terminal positive
  rejected:      { label: 'Rejected',    tone: 'danger',  filled: true  }, // terminal negative
  expired:       { label: 'Expired',     tone: 'neutral', filled: false }, // dead, archive zone
  failed:        { label: 'Failed',      tone: 'danger',  filled: true  }, // terminal error
}

export function DocumentStatus({ status }: { status: Status }) {
  const { label, tone, filled } = config[status]
  return (
    <StatusMark tone={tone} filled={filled}>
      {label}
    </StatusMark>
  )
}
