import { useState } from 'react'
import { RadioGroup, Radio } from '@/components/ui/radio'

export function RadioStory() {
  const [value, setValue] = useState('email')

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Radio</h2>
        <p className="text-sm text-subtle-foreground mt-1">Single-select. Selected = ink fill with white inner dot.</p>
      </div>

      <Section label="Group">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">Notification preference — current: <code className="font-mono text-xs">{value}</code></p>
        <RadioGroup value={value} onValueChange={setValue}>
          <Field>
            <Radio value="email" id="r-email" />
            <label htmlFor="r-email" className="text-base">Email only</label>
          </Field>
          <Field>
            <Radio value="sms" id="r-sms" />
            <label htmlFor="r-sms" className="text-base">SMS only</label>
          </Field>
          <Field>
            <Radio value="both" id="r-both" />
            <label htmlFor="r-both" className="text-base">Both email and SMS</label>
          </Field>
          <Field>
            <Radio value="none" id="r-none" />
            <label htmlFor="r-none" className="text-base">None — I'll check the dashboard</label>
          </Field>
        </RadioGroup>
      </Section>

      <Section label="Disabled">
        <RadioGroup defaultValue="b" disabled>
          <Field>
            <Radio value="a" id="rd-a" />
            <label htmlFor="rd-a" className="text-sm text-muted-foreground">Option A (disabled, unselected)</label>
          </Field>
          <Field>
            <Radio value="b" id="rd-b" />
            <label htmlFor="rd-b" className="text-sm text-muted-foreground">Option B (disabled, selected)</label>
          </Field>
        </RadioGroup>
      </Section>

      <Section label="Inline (horizontal)">
        <RadioGroup defaultValue="medium" className="flex gap-4">
          <Field>
            <Radio value="low" id="ri-low" />
            <label htmlFor="ri-low" className="text-base">Low</label>
          </Field>
          <Field>
            <Radio value="medium" id="ri-medium" />
            <label htmlFor="ri-medium" className="text-base">Medium</label>
          </Field>
          <Field>
            <Radio value="high" id="ri-high" />
            <label htmlFor="ri-high" className="text-base">High</label>
          </Field>
        </RadioGroup>
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

function Field({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2.5">{children}</div>
}
