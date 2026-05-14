import { Send, FilePlus, Eye, FileSignature, CheckCircle2 } from 'lucide-react'
import { Timeline, TimelineItem } from '@/components/ui/timeline'
import { AuditTrail } from '@/components/patterns/audit-trail'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card'

export function TimelineStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Timeline</h2>
        <p className="text-base text-subtle-foreground mt-1">
          Chronological event log. Each item has a tone-colored marker, title row, optional timestamp + detail block. A muted line connects markers.
        </p>
      </div>

      <Section label="Generic timeline (icons + tones)">
        <Card>
          <CardBody>
            <Timeline>
              <TimelineItem icon={<FilePlus />} tone="neutral" timestamp="Mar 20, 09:14">
                <span className="font-medium">You</span> <span className="text-subtle-foreground">created the document</span>
              </TimelineItem>
              <TimelineItem icon={<Send />} tone="primary" timestamp="Mar 20, 09:18" detail="Sent to 8 invitees with 14-day expiry">
                <span className="font-medium">You</span> <span className="text-subtle-foreground">sent for signing</span>
              </TimelineItem>
              <TimelineItem icon={<Eye />} tone="neutral" timestamp="Mar 21, 11:03">
                <span className="font-medium">Priya Shankar</span> <span className="text-subtle-foreground">opened the document</span>
              </TimelineItem>
              <TimelineItem icon={<FileSignature />} tone="success" timestamp="Mar 21, 11:42" detail="Signed via Aadhaar eSign · IP 49.205.74.12">
                <span className="font-medium">Priya Shankar</span> <span className="text-subtle-foreground">signed the document</span>
              </TimelineItem>
              <TimelineItem icon={<CheckCircle2 />} tone="success" timestamp="Mar 28, 17:55">
                <span className="font-medium">System</span> <span className="text-subtle-foreground">document fully executed</span>
              </TimelineItem>
            </Timeline>
          </CardBody>
        </Card>
      </Section>

      <Section label="AuditTrail pattern (Leegality-domain)">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          Domain pattern. You pass an array of events with types — system enforces (icon, tone, verb) per type. A "signed" event can never render in danger-red; "rejected" can never be success-green. Locked.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Audit trail · Series A SAFE — Acme Inc.</CardTitle>
          </CardHeader>
          <CardBody>
            <AuditTrail
              events={[
                { type: 'created',       actor: 'You',             timestamp: 'Mar 20, 09:14' },
                { type: 'sent',          actor: 'You',             timestamp: 'Mar 20, 09:18', detail: 'Sent to 8 invitees with 14-day expiry' },
                { type: 'opened',        actor: 'Priya Shankar',   timestamp: 'Mar 21, 11:03' },
                { type: 'signed',        actor: 'Priya Shankar',   timestamp: 'Mar 21, 11:42', detail: 'Signed via Aadhaar eSign · IP 49.205.74.12' },
                { type: 'opened',        actor: 'Karthik Iyer',    timestamp: 'Mar 22, 14:20' },
                { type: 'reminder-sent', actor: 'System',          timestamp: 'Mar 26, 10:00', detail: 'Auto-reminder · 6 invitees pending' },
                { type: 'rejected',      actor: 'Anita Narayanan', timestamp: 'Mar 27, 16:15', detail: 'Reason: clauses 3.1 and 7 need legal review' },
                { type: 'failed',        actor: 'System',          timestamp: 'Mar 27, 18:02', detail: 'Document terminated due to rejection' },
              ]}
            />
          </CardBody>
        </Card>
      </Section>

      <Section label="Stepper mode — past / active / future">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          For workflow progress where there's a current stage. Active stage gets primary fill + ring offset (you-are-here signal). Completed = success + check. Pending = outlined muted.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Workflow progress · Series A SAFE</CardTitle>
          </CardHeader>
          <CardBody>
            <Timeline>
              <TimelineItem state="completed" timestamp="Mar 20, 09:14">
                Document created
              </TimelineItem>
              <TimelineItem state="completed" timestamp="Mar 20, 09:18" detail="Sent to 8 invitees, 14-day expiry">
                Sent for signing
              </TimelineItem>
              <TimelineItem state="active" timestamp="In progress" detail="3 of 8 signed · 5 pending response">
                Awaiting signatures
              </TimelineItem>
              <TimelineItem state="pending" timestamp="Pending">
                Document fully executed
              </TimelineItem>
              <TimelineItem state="pending" timestamp="Pending">
                Sealed and archived
              </TimelineItem>
            </Timeline>
          </CardBody>
        </Card>
      </Section>

      <Section label="Plain timeline (no icons, just dots)">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">When you don't need iconographic specificity — system falls back to a small centered dot.</p>
        <Card>
          <CardBody>
            <Timeline>
              <TimelineItem tone="primary" timestamp="Now">
                Drafted MSA terms
              </TimelineItem>
              <TimelineItem tone="primary" timestamp="2h ago">
                Reviewed with Legal
              </TimelineItem>
              <TimelineItem tone="neutral" timestamp="4h ago">
                Imported boilerplate template
              </TimelineItem>
            </Timeline>
          </CardBody>
        </Card>
      </Section>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">{label}</div>
      {children}
    </div>
  )
}
