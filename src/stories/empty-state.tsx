import { Plus, Search, AlertTriangle, Inbox } from 'lucide-react'
import { EmptyState } from '@/components/patterns/empty-state'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function EmptyStateStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">EmptyState</h2>
        <p className="text-base text-subtle-foreground mt-1">
          Pattern for "there's nothing here yet." Centered, calm, with optional CTA. Default decoration is a faint hollow square — the system's "hasn't happened" marker at rest.
        </p>
      </div>

      <Section label="No documents (default hollow mark)">
        <Card>
          <EmptyState
            title="No documents yet"
            description="Documents you create or receive will appear here. Start by uploading a contract or sending an invitation."
            action={<Button><Plus className="h-4 w-4" />Create document</Button>}
          />
        </Card>
      </Section>

      <Section label="No search results (custom icon)">
        <Card>
          <EmptyState
            icon={<Search className="h-10 w-10 text-muted-foreground" />}
            title="No matching documents"
            description={<>No documents match <code className="font-mono text-foreground">"acme series b"</code>. Try a different search or clear the filters.</>}
            action={<Button variant="secondary">Clear filters</Button>}
          />
        </Card>
      </Section>

      <Section label="Error state">
        <Card>
          <EmptyState
            icon={<AlertTriangle className="h-10 w-10 text-danger" />}
            title="Could not load workflows"
            description="The server returned an error. Check your connection and try again."
            action={
              <div className="flex gap-2">
                <Button variant="secondary">Retry</Button>
                <Button variant="link-secondary">Contact support</Button>
              </div>
            }
          />
        </Card>
      </Section>

      <Section label="Inbox empty (calm state)">
        <Card>
          <EmptyState
            icon={<Inbox className="h-10 w-10 text-muted-foreground" />}
            title="Inbox zero"
            description="No pending notifications. You're all caught up."
            showDefaultMark={false}
          />
        </Card>
      </Section>

      <Section label="Inline (no card)">
        <EmptyState
          title="Filter to see results"
          description="Pick a workflow above to see matching documents."
        />
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
