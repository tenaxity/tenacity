import { useState } from 'react'
import { Toggle } from '@/components/ui/toggle'

export function ToggleStory() {
  const [single, setSingle] = useState(false)

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Toggle</h2>
        <p className="text-sm text-subtle-foreground mt-1">Binary on/off. Off = muted track. On = primary track.</p>
      </div>

      <Section label="States">
        <Field>
          <Toggle id="t-off" />
          <label htmlFor="t-off" className="text-base">Off (default)</label>
        </Field>
        <Field>
          <Toggle id="t-on" defaultChecked />
          <label htmlFor="t-on" className="text-base">On (defaultChecked)</label>
        </Field>
        <Field>
          <Toggle id="t-disabled-off" disabled />
          <label htmlFor="t-disabled-off" className="text-sm text-muted-foreground">Disabled (off)</label>
        </Field>
        <Field>
          <Toggle id="t-disabled-on" disabled defaultChecked />
          <label htmlFor="t-disabled-on" className="text-sm text-muted-foreground">Disabled (on)</label>
        </Field>
      </Section>

      <Section label="Interactive">
        <Field>
          <Toggle id="t-interactive" checked={single} onCheckedChange={setSingle} />
          <label htmlFor="t-interactive" className="text-base">Notifications · current: <code className="font-mono text-xs">{single ? 'on' : 'off'}</code></label>
        </Field>
      </Section>

      <Section label="In a settings row context">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">How toggles look inside settings panels — typical use case.</p>
        <SettingsRow
          title="Email notifications"
          description="Receive email when a document is signed or rejected"
          defaultChecked
        />
        <SettingsRow
          title="SMS notifications"
          description="Receive SMS for critical updates only"
        />
        <SettingsRow
          title="Audit log emails"
          description="Receive weekly audit log digest"
          defaultChecked
        />
      </Section>
    </div>
  )
}

function SettingsRow({ title, description, defaultChecked }: { title: string; description: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-b-0">
      <div className="min-w-0">
        <div className="text-base font-medium">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      </div>
      <Toggle defaultChecked={defaultChecked} />
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">{label}</div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2.5">{children}</div>
}
