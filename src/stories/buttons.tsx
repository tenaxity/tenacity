import { Plus, Download, Trash2, ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ButtonsStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Buttons</h2>
        <p className="text-sm text-subtle-foreground mt-1">Variants encode intent. Default is primary medium.</p>
      </div>

      <Section label="Variants">
        <Row>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
        </Row>
      </Section>

      <Section label="Link variants">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          Inline text links. No background, no padding, hover-underline. Used inside body copy or as low-emphasis CTAs.
        </p>
        <Row>
          <Button variant="link">Learn more</Button>
          <Button variant="link"><ArrowRight className="h-4 w-4" />Open document</Button>
          <Button variant="link-secondary">Cancel</Button>
          <Button variant="link-secondary"><ChevronRight className="h-4 w-4" />Skip for now</Button>
        </Row>
      </Section>

      <Section label="Sizes">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          Four sizes. XS is reserved for action-bar contexts. XS in primary-filled variant is banned — that's where badge collision lives. See CLAUDE.md → Hard Rule #9.
        </p>
        <Row>
          <Button size="xs" variant="secondary">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Row>
      </Section>

      <Section label="Action bar — the canonical XS use case">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          Multiple secondary actions packed in a tight footer. Mix of action buttons (Sign / Reject / Copy / Resend) and link-style navigation (Details).
        </p>
        <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-md border border-border bg-background">
          <Button size="xs" variant="secondary">Sign</Button>
          <Button size="xs" variant="secondary">Reject</Button>
          <Button size="xs" variant="secondary">Copy URL</Button>
          <Button size="xs" variant="secondary">Resend</Button>
          <Button size="xs" variant="link-secondary">Details</Button>
        </div>
      </Section>

      <Section label="With icons">
        <Row>
          <Button><Plus className="h-4 w-4" />Create</Button>
          <Button variant="secondary"><Download className="h-4 w-4" />Export</Button>
          <Button variant="destructive"><Trash2 className="h-4 w-4" />Delete</Button>
          <Button variant="ghost"><Plus className="h-4 w-4" /></Button>
        </Row>
      </Section>

      <Section label="States">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          Disabled overrides variant identity — Primary, Secondary, Destructive disabled all look identical (gray + muted text). System rule: disabled means "off," not "off-version-of-this-color."
        </p>
        <Row>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
          <Button variant="destructive" disabled>Disabled</Button>
        </Row>
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

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>
}
