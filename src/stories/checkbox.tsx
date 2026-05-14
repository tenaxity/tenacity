import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

export function CheckboxStory() {
  const [single, setSingle] = useState<boolean | 'indeterminate'>(false)
  const [items, setItems] = useState<Record<string, boolean>>({
    notifications: true,
    audit: false,
    weekly: true,
  })

  const groupCheckedCount = Object.values(items).filter(Boolean).length
  const groupState: boolean | 'indeterminate' =
    groupCheckedCount === 0 ? false : groupCheckedCount === Object.keys(items).length ? true : 'indeterminate'

  const handleGroupClick = (checked: boolean | 'indeterminate') => {
    if (checked === 'indeterminate') return
    const v = !!checked
    setItems(Object.fromEntries(Object.keys(items).map(k => [k, v])))
  }

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Checkbox</h2>
        <p className="text-sm text-subtle-foreground mt-1">Filled-gravity selection. Checked = primary fill + white check.</p>
      </div>

      <Section label="States">
        <Field>
          <Checkbox id="cb-uncheck" />
          <label htmlFor="cb-uncheck" className="text-base">Unchecked</label>
        </Field>
        <Field>
          <Checkbox id="cb-check" defaultChecked />
          <label htmlFor="cb-check" className="text-base">Checked</label>
        </Field>
        <Field>
          <Checkbox id="cb-indet" checked="indeterminate" />
          <label htmlFor="cb-indet" className="text-base">Indeterminate (used for "some selected" in trees/lists)</label>
        </Field>
        <Field>
          <Checkbox id="cb-disabled" disabled />
          <label htmlFor="cb-disabled" className="text-sm text-muted-foreground">Disabled (unchecked)</label>
        </Field>
        <Field>
          <Checkbox id="cb-disabled-checked" disabled defaultChecked />
          <label htmlFor="cb-disabled-checked" className="text-sm text-muted-foreground">Disabled (checked)</label>
        </Field>
      </Section>

      <Section label="Interactive single">
        <Field>
          <Checkbox id="single" checked={single === true} onCheckedChange={setSingle} />
          <label htmlFor="single" className="text-base">Click me — current value: <code className="font-mono text-xs">{String(single)}</code></label>
        </Field>
      </Section>

      <Section label="Group with parent indeterminate">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">Parent reflects child state. Click parent to toggle all.</p>
        <Field>
          <Checkbox
            id="group-parent"
            checked={groupState}
            onCheckedChange={handleGroupClick}
          />
          <label htmlFor="group-parent" className="text-base font-medium">All notification preferences</label>
        </Field>
        <div className="ml-6 space-y-2">
          {Object.keys(items).map(k => (
            <Field key={k}>
              <Checkbox
                id={`item-${k}`}
                checked={items[k]}
                onCheckedChange={(v) => setItems({ ...items, [k]: !!v })}
              />
              <label htmlFor={`item-${k}`} className="text-base capitalize">{k} updates</label>
            </Field>
          ))}
        </div>
      </Section>
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
