import { useState } from 'react'
import { CodeBlock } from '@/components/ui/code-block'
import { DescriptionList, DescriptionItem } from '@/components/ui/description-list'
import { Kbd } from '@/components/ui/kbd'
import { Pagination } from '@/components/ui/pagination'
import { StatusMark } from '@/components/ui/status-mark'

/*
  Data display — the read-only data primitives: DescriptionList for detail
  panels, CodeBlock for payloads/logs, Kbd for shortcuts, Pagination for
  table ranges.
*/

const SAMPLE_JSON = `{
  "document_id": "DOC-A1B2-C3D4-E5F6",
  "state": "MH",
  "article": "5(h)(A)",
  "consideration": 1284500.00,
  "duty_paid": 642.25,
  "certificate": {
    "issued_at": "2026-06-09T16:44:21Z",
    "series": "ESR-MH-2026-000123"
  }
}`

export function DataDisplayStory() {
  const [page, setPage] = useState(0)
  const pageSize = 50
  const total = 306
  const from = page * pageSize + 1
  const to = Math.min((page + 1) * pageSize, total)

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Data display</h2>
        <p className="text-base text-subtle-foreground mt-1">
          DescriptionList, CodeBlock, Kbd, Pagination — the read-only data primitives.
        </p>
      </div>

      <Section label="DescriptionList — detail panels">
        <p className="text-xs text-muted-foreground mb-3 max-w-lg">
          Labels are human (sans, left); values are machine (mono, right). <code className="font-mono">prose</code> opts
          a value out for human text. Open + ruled — no box.
        </p>
        <DescriptionList className="max-w-md">
          <DescriptionItem label="Document ID">DOC-A1B2-C3D4-E5F6</DescriptionItem>
          <DescriptionItem label="Counterparty" prose>Acme Industries Pvt Ltd</DescriptionItem>
          <DescriptionItem label="Consideration">₹ 12,84,500.00</DescriptionItem>
          <DescriptionItem label="Stamp duty">₹ 642.25</DescriptionItem>
          <DescriptionItem label="Issued">2026-06-09 16:44:21 IST</DescriptionItem>
          <DescriptionItem label="Status" prose><StatusMark tone="success" filled>Completed</StatusMark></DescriptionItem>
        </DescriptionList>
      </Section>

      <Section label="CodeBlock — payloads and logs">
        <CodeBlock title="POST /v1/certificates · response" code={SAMPLE_JSON} className="max-w-lg">
          {SAMPLE_JSON}
        </CodeBlock>
      </Section>

      <Section label="Kbd — shortcut hints">
        <div className="flex items-center gap-4 text-base text-subtle-foreground">
          <span className="inline-flex items-center gap-1.5">Search <Kbd>⌘K</Kbd></span>
          <span className="inline-flex items-center gap-1.5">Run all <Kbd>⌘</Kbd><Kbd>↵</Kbd></span>
          <span className="inline-flex items-center gap-1.5">Dismiss <Kbd>Esc</Kbd></span>
        </div>
        <p className="text-xs text-muted-foreground mt-3 max-w-lg">
          Kbd carries the raised key bevel as a depictive exception to "depth means interactive" — it
          portrays a physical key, it just isn't pressable on screen.
        </p>
      </Section>

      <Section label="Pagination — table ranges">
        <p className="text-xs text-muted-foreground mb-3 max-w-lg">
          A mono range readout + prev/next keys. No numbered page pills. Sits directly under a
          full-bleed table.
        </p>
        <div className="max-w-md">
          <Pagination
            from={from}
            to={to}
            total={total}
            onPrev={() => setPage(p => Math.max(0, p - 1))}
            onNext={() => setPage(p => p + 1)}
          />
        </div>
      </Section>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider font-semibold text-subtle-foreground mb-3">{label}</div>
      {children}
    </div>
  )
}
