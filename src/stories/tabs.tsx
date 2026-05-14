import { useState } from 'react'
import { FileText, Users, History, Settings } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { DocumentStatus } from '@/components/patterns/document-status'

export function TabsStory() {
  const [value, setValue] = useState('overview')

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Tabs</h2>
        <p className="text-base text-subtle-foreground mt-1">Horizontal navigation. Active tab gets a primary bottom-bar — same idiom as input focus, rotated 90°.</p>
      </div>

      <Section label="Basic">
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invitees">Invitees</TabsTrigger>
            <TabsTrigger value="audit">Audit trail</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-base">Document summary, current status, primary actions live here.</p>
          </TabsContent>
          <TabsContent value="invitees">
            <p className="text-base">Eight invitees. Two have signed; six pending.</p>
          </TabsContent>
          <TabsContent value="audit">
            <p className="text-base">Full chronological log of every action on this document.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-base">Reminder cadence, expiry rules, branding overrides.</p>
          </TabsContent>
        </Tabs>
      </Section>

      <Section label="With icons">
        <Tabs defaultValue="docs">
          <TabsList>
            <TabsTrigger value="docs"><FileText className="h-4 w-4" />Documents</TabsTrigger>
            <TabsTrigger value="people"><Users className="h-4 w-4" />People</TabsTrigger>
            <TabsTrigger value="audit"><History className="h-4 w-4" />Audit</TabsTrigger>
            <TabsTrigger value="config"><Settings className="h-4 w-4" />Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="docs">
            <div className="flex items-center gap-2">
              <DocumentStatus status="sent" />
              <span className="text-base">Documents tab content</span>
            </div>
          </TabsContent>
          <TabsContent value="people">
            <p className="text-base">People tab content</p>
          </TabsContent>
          <TabsContent value="audit">
            <p className="text-base">Audit tab content</p>
          </TabsContent>
          <TabsContent value="config">
            <p className="text-base">Settings tab content</p>
          </TabsContent>
        </Tabs>
      </Section>

      <Section label="With disabled tab">
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
            <TabsTrigger value="drafts" disabled>Drafts (disabled)</TabsTrigger>
          </TabsList>
        </Tabs>
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
