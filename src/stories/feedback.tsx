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

      <Section label="Loader — the indeterminate rule">
        <p className="text-xs text-subtle-foreground -mt-1 mb-3">
          The system has one voice for "in progress" — a hairline track with a sliding ink segment. No spinners, no dots, no mascots.
        </p>

        <div className="space-y-3">
          {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
            <div key={size} className="flex items-center gap-4">
              <code className="text-xs font-mono w-8 text-subtle-foreground">{size}</code>
              <Loader size={size} />
            </div>
          ))}
          <div className="flex items-center gap-2 text-base text-subtle-foreground pt-1">
            <Loader size="sm" tone="muted" />
            <span className="italic">Processing documents…</span>
          </div>
        </div>
      </Section>

      <Section label="Inside buttons (use size sm)">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          The small rule sits cleanly inline in a button row.
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
        <p className="text-xs text-subtle-foreground mb-2">Outline is the calm version — 4px tone bar on the left edge + colored icon, white body. No tinted backgrounds (per Hard Rule #4).</p>
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
        <p className="text-xs text-subtle-foreground mb-2">Solid is the loud version — the whole frame takes the tone color (stroke loudness, never fill). Use only for urgent/critical alerts where the user must act now.</p>
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
        <p className="text-xs text-subtle-foreground mb-2">Full-bleed notice for the top of a page or section — same tone-bar grammar as Alert, seated against the page with a bottom rule.</p>
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
