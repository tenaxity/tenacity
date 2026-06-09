export function TypographyStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Typography</h2>
        <p className="text-sm text-subtle-foreground mt-1">Foundation of the system. The mono/sans boundary is the voice — switch font in the header to A/B the sans.</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">The two voices</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-md border border-border bg-surface">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Human — Geist</div>
            <div className="text-3xl mb-1">Tenacity</div>
            <div className="text-xs text-muted-foreground">Prose, labels, headings, button text. 14px body.</div>
          </div>
          <div className="p-4 rounded-md border border-border bg-surface">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Machine — JetBrains Mono</div>
            <div className="text-3xl mb-1 font-mono">Tenacity</div>
            <div className="text-xs text-muted-foreground">Every literal data value: IDs, dates, counts, codes, statuses. 12px medium.</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">The data boundary in practice</p>
        <p className="text-xs text-muted-foreground -mt-2">If a value could live in a database column, it renders mono — including its separators (Hard Rule #2). The label beside it stays sans.</p>
        <div className="divide-y divide-rule border-y border-rule">
          {[
            { label: 'Document ID', value: 'DOC-A1B2-C3D4-E5F6' },
            { label: 'Last updated', value: '2026-04-30 14:32:11 IST' },
            { label: 'Consideration', value: '₹ 12,84,500.00' },
            { label: 'Invitees signed', value: '3/8' },
            { label: 'Status', value: 'IN PROGRESS' },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between py-2">
              <span className="text-base text-subtle-foreground">{row.label}</span>
              <span className="font-mono text-xs font-medium tabular-nums text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">Hierarchy</p>
        <h1 className="text-4xl font-semibold tracking-tight">Sign documents that hold up.</h1>
        <h2 className="text-2xl font-semibold tracking-tight">Active workflows</h2>
        <h3 className="text-lg font-semibold tracking-tight">Series A SAFE — Acme Inc.</h3>
        <p className="text-base leading-relaxed">
          Eight invitees have been notified. Two have signed; the rest expire on March 28th. You can resend the invitation, mark the document complete with current signatures, or extend the deadline by up to 14 days.
        </p>
        <p className="text-xs text-muted-foreground">
          Smaller meta text — last activity 4 minutes ago.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">Weights</p>
        <div className="space-y-0.5 text-lg">
          <div className="font-normal">The quick brown fox jumps over — Regular 400</div>
          <div className="font-medium">The quick brown fox jumps over — Medium 500</div>
          <div className="font-semibold">The quick brown fox jumps over — Semibold 600</div>
          <div className="font-bold">The quick brown fox jumps over — Bold 700</div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">UI scale ladder — all even (Hard Rule #8)</p>
        <div className="space-y-1">
          <div className="text-xs">xs · 12px · data cells, badges, helper text</div>
          <div className="text-base">base · 14px · prose body, buttons, table prose</div>
          <div className="text-md">md · 16px · card titles</div>
          <div className="text-lg">lg · 18px · subheadings</div>
          <div className="text-xl">xl · 20px · section headings</div>
          <div className="text-2xl">2xl · 24px · page section title</div>
          <div className="text-3xl">3xl · 30px · page title</div>
          <div className="text-4xl">4xl · 36px · display</div>
        </div>
      </div>
    </div>
  )
}
