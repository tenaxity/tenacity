import { useState } from 'react'
import { Search, Mail, Lock, AlertCircle, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { OtpInput } from '@/components/ui/otp-input'
import { TagInput } from '@/components/ui/tag-input'

export function InputsStory() {
  const [otp, setOtp] = useState('')
  const [tags, setTags] = useState<string[]>(['priya@acme.com', 'rohan@topco.in'])

  return (
    <div className="space-y-12 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Inputs</h2>
        <p className="text-sm text-subtle-foreground mt-1">
          Single committed focus behavior — primary border + 3px primary bar slides in from the left.
        </p>
      </div>

      <Section label="Default state">
        <Field label="Empty">
          <Input placeholder="ritik@leegality.com" />
        </Field>
        <Field label="Filled">
          <Input defaultValue="Series A SAFE — Acme Inc." />
        </Field>
        <Field label="Auto-focused on mount">
          <Input placeholder="This one starts focused" autoFocus />
        </Field>
      </Section>

      <Section label="With label + helper text">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Email</label>
          <Input type="email" placeholder="you@company.com" />
          <p className="text-xs text-muted-foreground">We'll send notifications here.</p>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Password</label>
          <Input type="password" placeholder="••••••••" />
        </div>
      </Section>

      <Section label="With icons">
        <Field label="Leading icon">
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input placeholder="you@company.com" className="pl-9" />
          </div>
        </Field>
        <Field label="Search">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input placeholder="Search documents…" className="pl-9" />
          </div>
        </Field>
        <Field label="Trailing icon (validation)">
          <div className="relative">
            <Input defaultValue="ritik@leegality.com" className="pr-9" />
            <Check className="absolute right-3 top-2.5 h-4 w-4 text-success pointer-events-none" />
          </div>
        </Field>
        <Field label="Trailing icon (clearable)">
          <div className="relative">
            <Input defaultValue="something to clear" className="pr-9" />
            <button className="absolute right-2 top-2 h-5 w-5 flex items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </Field>
        <Field label="Trailing button">
          <div className="flex gap-2">
            <Input placeholder="Document name" className="flex-1" />
            <Button>Save</Button>
          </div>
        </Field>
      </Section>

      <Section label="States">
        <Field label="Disabled">
          <Input disabled defaultValue="Cannot edit" />
        </Field>
        <Field label="Read-only">
          <Input readOnly defaultValue="Read-only value" />
        </Field>
        <Field label="Error (semantic only — visual error styling TBD)">
          <div className="space-y-1">
            <Input placeholder="Email" defaultValue="not-an-email" aria-invalid />
            <p className="text-xs text-danger flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Enter a valid email address
            </p>
          </div>
        </Field>
      </Section>

      <Section label="Sensitive">
        <Field label="Locked field">
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input defaultValue="DOC-A1B2-C3D4-E5F6" className="pl-9 font-mono text-sm" readOnly />
          </div>
        </Field>
      </Section>

      <Section label="OTP — 6-digit code entry">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          Auto-advances on input. Backspace goes back. Paste fills all boxes.
        </p>
        <OtpInput length={6} value={otp} onChange={setOtp} />
        <p className="text-xs text-muted-foreground tabular-nums">value: <span className="font-mono">{otp || '—'}</span></p>
      </Section>

      <Section label="TagInput — multi-value chip entry">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          Type and hit Enter or comma to add a chip. Backspace on empty removes the last one. Click X to remove a specific chip.
        </p>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Invitees</label>
          <TagInput value={tags} onChange={setTags} placeholder="Add invitees by email…" />
          <p className="text-xs text-muted-foreground">{tags.length} invitee{tags.length === 1 ? '' : 's'}</p>
        </div>
      </Section>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">{label}</div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      {children}
    </div>
  )
}
