import { FileSignature, Settings } from 'lucide-react'
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FeaturedIcon } from '@/components/ui/featured-icon'
import { Avatar } from '@/components/ui/avatar'
import { DocumentStatus } from '@/components/patterns/document-status'
import { AuditTrail } from '@/components/patterns/audit-trail'

export function DrawerStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Drawer</h2>
        <p className="text-base text-subtle-foreground mt-1">
          Side panel for detail views, filters, secondary nav. Same plumbing as Modal but slides in from an edge.
        </p>
      </div>

      <Section label="Sides">
        <Row>
          <Drawer>
            <DrawerTrigger asChild><Button variant="secondary">From right (default)</Button></DrawerTrigger>
            <DrawerContent side="right" size="md">
              <DrawerHeader>
                <DrawerTitle>Right drawer</DrawerTitle>
                <DrawerDescription>Slides in from the right edge.</DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p className="text-base">Standard right-side detail view. Most common drawer position.</p>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild><Button variant="ghost">Close</Button></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild><Button variant="secondary">From left</Button></DrawerTrigger>
            <DrawerContent side="left" size="md">
              <DrawerHeader>
                <DrawerTitle>Left drawer</DrawerTitle>
                <DrawerDescription>Slides in from the left edge — useful for navigation drawers.</DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p className="text-base">Common for nav drawers in mobile / collapsed sidebars.</p>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild><Button variant="secondary">From bottom</Button></DrawerTrigger>
            <DrawerContent side="bottom" size="md">
              <DrawerHeader>
                <DrawerTitle>Bottom drawer</DrawerTitle>
                <DrawerDescription>Slides up from the bottom — good for filter-heavy mobile UI.</DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p className="text-base">Bottom sheets are common on mobile for action menus or filters.</p>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Row>
      </Section>

      <Section label="Document detail (canonical use case)">
        <p className="text-xs text-subtle-foreground mb-2">
          Click "Open document detail" — a full document-flavored detail panel with header, audit trail, and footer actions.
        </p>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open document detail</Button>
          </DrawerTrigger>
          <DrawerContent side="right" size="lg">
            <DrawerHeader icon={<FeaturedIcon size="sm" tone="primary" icon={<FileSignature />} />}>
              <DrawerTitle>Series A SAFE — Acme Inc.</DrawerTitle>
              <DrawerDescription>
                Sent Mar 20, expires Apr 3 · 8 invitees, 3 signed
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">Status</div>
                  <DocumentStatus status="in-progress" />
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold mb-3">Invitees (3 of 8)</div>
                <div className="space-y-2.5">
                  {[
                    { name: 'Priya Shankar', email: 'priya@acme.com', status: 'completed' as const },
                    { name: 'Karthik Iyer', email: 'karthik@topco.in', status: 'sent' as const },
                    { name: 'Anita Narayanan', email: 'anita@xyz.in', status: 'rejected' as const },
                  ].map(p => (
                    <div key={p.email} className="flex items-center gap-3">
                      <Avatar size="sm" initials={p.name.split(' ').map(s => s[0]).join('')} />
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-medium truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{p.email}</div>
                      </div>
                      <DocumentStatus status={p.status} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold mb-3">Audit trail</div>
                <AuditTrail
                  events={[
                    { type: 'created', actor: 'You', timestamp: 'Mar 20, 09:14' },
                    { type: 'sent',    actor: 'You', timestamp: 'Mar 20, 09:18' },
                    { type: 'signed',  actor: 'Priya Shankar', timestamp: 'Mar 21, 11:42' },
                    { type: 'opened',  actor: 'Karthik Iyer', timestamp: 'Mar 22, 14:20' },
                    { type: 'rejected', actor: 'Anita Narayanan', timestamp: 'Mar 27, 16:15', detail: 'Reason: clauses 3.1 and 7 need legal review' },
                  ]}
                />
              </div>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild><Button variant="ghost">Close</Button></DrawerClose>
              <Button variant="secondary">Download PDF</Button>
              <Button>Send reminder</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Section>

      <Section label="Filter drawer (mobile-first)">
        <p className="text-xs text-subtle-foreground mb-2">A drawer can host filters when there are too many for a horizontal toolbar.</p>
        <Drawer>
          <DrawerTrigger asChild><Button variant="secondary"><Settings className="h-4 w-4" />Filters</Button></DrawerTrigger>
          <DrawerContent side="right" size="sm">
            <DrawerHeader>
              <DrawerTitle>Filter documents</DrawerTitle>
            </DrawerHeader>
            <DrawerBody className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Search</label>
                <Input placeholder="Document name…" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Owner</label>
                <Input placeholder="ritik@…" />
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="ghost">Reset</Button>
              <DrawerClose asChild><Button>Apply</Button></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
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
  return <div className="flex flex-wrap items-center gap-2">{children}</div>
}
