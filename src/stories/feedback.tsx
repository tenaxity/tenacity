import { useState } from 'react'
import { Loader } from '@/components/ui/loader'
import { Progress } from '@/components/ui/progress'
import { Breadcrumbs } from '@/components/ui/breadcrumb'
import { Alert } from '@/components/ui/alert'
import { Banner } from '@/components/ui/banner'
import { Button } from '@/components/ui/button'

export function FeedbackStory() {
  const [progress, setProgress] = useState(35)
  const [showBanner, setShowBanner] = useState(true)

  return (
    <div className="space-y-12 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Feedback primitives</h2>
        <p className="text-base text-subtle-foreground mt-1">Loaders, progress, breadcrumbs, alerts, banners. The system's vocabulary for "something is happening" / "something happened" / "you are here."</p>
      </div>

      <Section label="Loaders — two stamp variants, one idiom">
        <p className="text-xs text-subtle-foreground -mt-1 mb-3">
          The system has one voice for "in progress" — the judicial stamp. Single for one thing, four-in-sequence for batches. No generic spinners, no dots, no clocks. The choice itself conveys count.
        </p>

        <LoaderRow
          variant="stamp"
          title="Stamp (single)"
          desc="One stamp pressing. Use for decisive single-action moments — submitting one document, sealing, finalizing."
          example="Sealing document…"
        />
        <LoaderRow
          variant="stamps"
          title="Stamps (assembly line)"
          desc="Four stamps fire in sequence — 1, 2, 3, 4 — like an assembly line of judicial seals. Use for batch / system processing of many."
          example="Processing 4 documents…"
        />
      </Section>

      <Section label="Inside buttons (use small stamp)">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          Small stamp omits the imprint to fit cleanly inside a button row.
        </p>
        <Row>
          <Button disabled><Loader size="sm" tone="white" />Saving…</Button>
          <Button variant="secondary" disabled><Loader size="sm" tone="muted" />Loading data</Button>
          <Button variant="destructive" disabled><Loader size="sm" tone="white" />Deleting</Button>
        </Row>
      </Section>

      <Section label="Progress bar">
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Determinate · {progress}%</span>
              <span className="space-x-2">
                <button onClick={() => setProgress(Math.max(0, progress - 10))} className="hover:text-foreground">−10</button>
                <button onClick={() => setProgress(Math.min(100, progress + 10))} className="hover:text-foreground">+10</button>
              </span>
            </div>
            <Progress value={progress} />
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1.5">Indeterminate</div>
            <Progress indeterminate />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <div className="text-xs text-muted-foreground mb-1.5">Success · 85%</div>
              <Progress value={85} tone="success" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1.5">Warning · 60%</div>
              <Progress value={60} tone="warning" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1.5">Danger · 20%</div>
              <Progress value={20} tone="danger" />
            </div>
          </div>
        </div>
      </Section>

      <Section label="Breadcrumbs">
        <Breadcrumbs items={[
          { label: 'Documents', href: '#' },
          { label: 'Active workflows', href: '#' },
          { label: 'Series A SAFE — Acme Inc.' },
        ]} />
        <Breadcrumbs items={[
          { label: 'Settings', href: '#' },
          { label: 'Notification preferences' },
        ]} />
      </Section>

      <Section label="Alert (inline) — outline default">
        <p className="text-xs text-subtle-foreground mb-2">Outline is the calm version — colored border + icon, white background. No soft tinting (per Hard Rule #1).</p>
        <div className="space-y-3">
          <Alert tone="info" title="New feature available">
            Bulk signing is now available for batches of up to 50 documents at once.
          </Alert>
          <Alert tone="success" title="Document signed" onClose={() => {}}>
            All eight invitees have completed signing. The document is now legally executed.
          </Alert>
          <Alert tone="warning" title="Expires in 3 days">
            This document will expire on March 28th if not all invitees have signed by then.
          </Alert>
          <Alert tone="danger" title="Verification failed">
            One or more signatures could not be verified. Review the audit trail for details.
          </Alert>
        </div>
      </Section>

      <Section label="Alert (inline) — solid">
        <p className="text-xs text-subtle-foreground mb-2">Solid is the loud version. Use only for urgent/critical alerts where the user must act now.</p>
        <div className="space-y-3">
          <Alert tone="danger" variant="solid" title="Service incident">
            E-stamping is currently unavailable. Documents requiring stamping will queue and process automatically once service resumes.
          </Alert>
          <Alert tone="warning" variant="solid" title="Action required">
            Two documents need your signature before midnight to remain on schedule.
          </Alert>
        </div>
      </Section>

      <Section label="Banner (page-top)">
        <p className="text-xs text-subtle-foreground mb-2">Banners are always solid (loud by definition). They live at the top of a page or section.</p>
        {showBanner && (
          <Banner tone="warning" onClose={() => setShowBanner(false)} action={<Button size="xs" variant="secondary">Renew now</Button>}>
            Your subscription expires in 7 days. Renew to avoid interruption.
          </Banner>
        )}
        <Banner tone="info" className="mt-3">
          Scheduled maintenance: April 30, 2:00 AM IST. The dashboard may be briefly unavailable.
        </Banner>
        <Banner tone="success" className="mt-3" action={<Button size="xs" variant="secondary">View migration</Button>}>
          You've been upgraded to Tenacity Pro. New features available now.
        </Banner>
      </Section>
    </div>
  )
}

function LoaderRow({ variant, title, desc, example }: { variant: 'stamp' | 'stamps'; title: string; desc: string; example: string }) {
  return (
    <div className="grid grid-cols-[10rem_1fr_14rem] items-center gap-4 py-3 border-b border-border last:border-b-0">
      <div className="flex items-center gap-3">
        <Loader variant={variant} size="md" />
        <code className="text-xs font-mono">{variant}</code>
      </div>
      <div>
        <div className="text-base font-semibold">{title}</div>
        <div className="text-xs text-subtle-foreground mt-0.5">{desc}</div>
      </div>
      <div className="flex items-center gap-2 text-base text-subtle-foreground">
        <Loader variant={variant} size="sm" tone="muted" />
        <span className="italic">{example}</span>
      </div>
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
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}
