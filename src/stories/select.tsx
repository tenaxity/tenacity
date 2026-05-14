import { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { MultiSelect } from '@/components/ui/multi-select'

export function SelectStory() {
  const [value, setValue] = useState('email')
  const [workflows, setWorkflows] = useState<string[]>(['sandbox', 'vendor'])
  const [owners, setOwners] = useState<string[]>([])

  const workflowOptions = [
    { value: 'sandbox',     label: 'Sandbox Account Creation' },
    { value: 'vendor',      label: 'Vendor Agreement signing' },
    { value: 'declaration', label: 'Declaration of Cancelled cheque' },
    { value: 'msa',         label: 'MSA execution' },
    { value: 'notarisation',label: 'Document Notarisation' },
    { value: 'register',    label: 'Notarial Register' },
    { value: 'notarise-151',label: 'Document Notarisation- 151' },
    { value: 'employment',  label: 'Employment Offer' },
    { value: 'nda',         label: 'NDA Signing' },
  ]
  const ownerOptions = [
    { value: 'priya',  label: 'Priya Shankar' },
    { value: 'rohan',  label: 'Rohan Mehta' },
    { value: 'kart',   label: 'Karthik Iyer' },
    { value: 'anita',  label: 'Anita Narayanan' },
    { value: 'sameer', label: 'Sameer Khan' },
  ]

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Select</h2>
        <p className="text-base text-subtle-foreground mt-1">Single-choice dropdown. Trigger looks identical to an Input. Selected item gets the bar-bold idiom.</p>
      </div>

      <Section label="Basic">
        <div className="space-y-1.5 max-w-sm">
          <label className="text-xs font-medium text-foreground">Notification preference</label>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger>
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email only</SelectItem>
              <SelectItem value="sms">SMS only</SelectItem>
              <SelectItem value="both">Both email and SMS</SelectItem>
              <SelectItem value="none">None — I'll check the dashboard</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">current value: <code className="font-mono">{value}</code></p>
        </div>
      </Section>

      <Section label="With placeholder (uncontrolled)">
        <div className="space-y-1.5 max-w-sm">
          <label className="text-xs font-medium text-foreground">Document type</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a type…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nda">NDA</SelectItem>
              <SelectItem value="msa">Master Service Agreement</SelectItem>
              <SelectItem value="safe">SAFE</SelectItem>
              <SelectItem value="employment">Employment Offer</SelectItem>
              <SelectItem value="vendor">Vendor Agreement</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section label="Disabled">
        <div className="space-y-1.5 max-w-sm">
          <label className="text-xs font-medium text-muted-foreground">Locked field</label>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Cannot change" />
            </SelectTrigger>
          </Select>
        </div>
      </Section>

      <Section label="MultiSelect — filter pattern">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          For filtering tables/lists by multiple values. Trigger summarizes "{'{label}: {first}'}" + "+N". Popover has search + checkbox list + clear footer.
        </p>
        <div className="flex flex-wrap gap-2">
          <MultiSelect
            label="Workflow"
            options={workflowOptions}
            value={workflows}
            onChange={setWorkflows}
          />
          <MultiSelect
            label="Owner"
            options={ownerOptions}
            value={owners}
            onChange={setOwners}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-3 tabular-nums">
          workflows: <code className="font-mono">{workflows.length === 0 ? '—' : workflows.join(', ')}</code>
          {' · '}
          owners: <code className="font-mono">{owners.length === 0 ? '—' : owners.join(', ')}</code>
        </p>
      </Section>

      <Section label="Inline (form layout)">
        <p className="text-xs text-subtle-foreground mb-2">How a select sits next to other form fields.</p>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Priority</label>
            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Expires in</label>
            <Select defaultValue="14">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
