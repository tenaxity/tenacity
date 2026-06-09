import { Card, CardBody } from '@/components/ui/card'
import { DocumentStatus } from '@/components/patterns/document-status'

export function DocumentStatusStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">DocumentStatus</h2>
        <p className="text-sm text-subtle-foreground mt-1">
          Document-domain pattern over the StatusMark idiom. The system enforces marker + tone per status — filled square means the state happened, hollow means it hasn't. The square carries the color; the label stays ink. No overrides. For emphasis contexts (page headers, summaries) use Badge instead.
        </p>
      </div>

      <div className="space-y-3">
        <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">All statuses</div>
        <div className="flex flex-wrap gap-2">
          <DocumentStatus status="draft" />
          <DocumentStatus status="sent" />
          <DocumentStatus status="in-progress" />
          <DocumentStatus status="completed" />
          <DocumentStatus status="rejected" />
          <DocumentStatus status="expired" />
          <DocumentStatus status="failed" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">In a listing context</div>
        <Card>
          <CardBody className="divide-y divide-border">
            {[
              { name: 'Series A SAFE - Acme Inc.', invitees: 'Priya, Rohan, +2 more', status: 'in-progress' as const, when: 'Yesterday' },
              { name: 'NDA - TopCo Capital', invitees: 'Karthik Iyer', status: 'completed' as const, when: '3 days ago' },
              { name: 'Vendor MSA - Q2 batch', invitees: 'Anita, Sameer', status: 'rejected' as const, when: 'Mar 28' },
              { name: 'Employment offer - Diya R.', invitees: 'Diya R.', status: 'sent' as const, when: 'Mar 25' },
              { name: 'Settlement - Ramesh & Co', invitees: 'No invitees', status: 'draft' as const, when: 'Mar 20' },
              { name: 'License renewal - GenCorp', invitees: 'Anil V.', status: 'expired' as const, when: 'Feb 18' },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <div className="text-base font-medium truncate">{row.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{row.invitees}</div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <DocumentStatus status={row.status} />
                  <span className="font-mono text-xs font-medium text-muted-foreground tabular-nums w-16 text-right">{row.when}</span>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
