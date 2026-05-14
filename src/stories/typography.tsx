export function TypographyStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Typography</h2>
        <p className="text-sm text-subtle-foreground mt-1">Foundation of the system. Switch font in the header to A/B.</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">The three font families</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-md border border-border bg-muted/40">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Serif</div>
            <div className="text-3xl mb-1" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>Tenacity</div>
            <div className="text-xs text-muted-foreground">Decorative feet. Editorial.</div>
          </div>
          <div className="p-4 rounded-md border border-border bg-muted/40">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Sans-serif</div>
            <div className="text-3xl mb-1">Tenacity</div>
            <div className="text-xs text-muted-foreground">No feet. Modern UI default.</div>
          </div>
          <div className="p-4 rounded-md border border-border bg-muted/40">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Monospace</div>
            <div className="text-3xl mb-1 font-mono">Tenacity</div>
            <div className="text-xs text-muted-foreground">Equal-width. IDs, code, tabular numbers.</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">Hierarchy</p>
        <h1 className="text-4xl font-semibold tracking-tight">Sign documents that hold up.</h1>
        <h2 className="text-2xl font-semibold tracking-tight">Active workflows</h2>
        <h3 className="text-lg font-semibold tracking-tight">Series A SAFE — Acme Inc.</h3>
        <p className="text-md leading-relaxed">
          Eight invitees have been notified. Two have signed; the rest expire on March 28th. You can resend the invitation, mark the document complete with current signatures, or extend the deadline by up to 14 days.
        </p>
        <p className="text-sm text-muted-foreground">
          Smaller meta text — last activity 4 minutes ago.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">Numerals · tabular-nums</p>
        <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-md tabular-nums">
          <div>₹ 12,84,500.00</div>
          <div>2026-04-30 14:32:11 IST</div>
          <div>DOC-A1B2-C3D4-E5F6</div>
        </div>
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
        <p className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">UI scale ladder</p>
        <div className="space-y-1">
          <div className="text-xs">2xs · 11px · timestamp, badge counter</div>
          <div className="text-xs">xs  · 12px · meta, helper text</div>
          <div className="text-base">sm  · 13px · table cells, dense UI</div>
          <div className="text-base">base · 14px · default body</div>
          <div className="text-md">md  · 15px · card titles, primary body</div>
          <div className="text-lg">lg  · 16px · subheadings</div>
          <div className="text-xl">xl  · 18px · section headings</div>
          <div className="text-2xl">2xl · 22px · page section title</div>
          <div className="text-3xl">3xl · 28px · page title</div>
          <div className="text-4xl">4xl · 36px · display</div>
        </div>
      </div>
    </div>
  )
}
