import { MoreVertical, Edit, Copy, Share2, Trash2, Eye, Download, Archive, Send, FileSignature } from 'lucide-react'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { DocumentStatus } from '@/components/patterns/document-status'

export function DropdownMenuStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">DropdownMenu</h2>
        <p className="text-base text-subtle-foreground mt-1">
          Action menu — fires actions, not picks values (that's Select). Common as a 3-dot ⋮ "more options" trigger on rows and cards.
        </p>
      </div>

      <Section label="Basic — 3-dot trigger">
        <Row>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem><Eye className="h-4 w-4" />View</DropdownMenuItem>
              <DropdownMenuItem><Edit className="h-4 w-4" />Edit</DropdownMenuItem>
              <DropdownMenuItem><Copy className="h-4 w-4" />Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive><Trash2 className="h-4 w-4" />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><Send className="h-4 w-4" />Resend invitation</DropdownMenuItem>
              <DropdownMenuItem><Share2 className="h-4 w-4" />Copy share link</DropdownMenuItem>
              <DropdownMenuItem><Download className="h-4 w-4" />Download PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Row>
      </Section>

      <Section label="With keyboard shortcuts">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>File menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[14rem]">
            <DropdownMenuItem>
              <Edit className="h-4 w-4" />New document
              <DropdownMenuShortcut>⌘ N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="h-4 w-4" />Duplicate
              <DropdownMenuShortcut>⌘ D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4" />Export PDF
              <DropdownMenuShortcut>⌘ E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Archive className="h-4 w-4" />Archive
              <DropdownMenuShortcut>⌘ ⇧ A</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem destructive>
              <Trash2 className="h-4 w-4" />Delete
              <DropdownMenuShortcut>⌘ ⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Section label="With section labels (grouped actions)">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Document actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[12rem]">
            <DropdownMenuLabel>Manage</DropdownMenuLabel>
            <DropdownMenuItem><Edit className="h-4 w-4" />Edit details</DropdownMenuItem>
            <DropdownMenuItem><FileSignature className="h-4 w-4" />Send for signing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Share</DropdownMenuLabel>
            <DropdownMenuItem><Share2 className="h-4 w-4" />Copy link</DropdownMenuItem>
            <DropdownMenuItem><Download className="h-4 w-4" />Download PDF</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Danger</DropdownMenuLabel>
            <DropdownMenuItem destructive><Archive className="h-4 w-4" />Archive</DropdownMenuItem>
            <DropdownMenuItem destructive><Trash2 className="h-4 w-4" />Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Section label="With disabled items">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><Eye className="h-4 w-4" />View</DropdownMenuItem>
            <DropdownMenuItem disabled><Edit className="h-4 w-4" />Edit (locked)</DropdownMenuItem>
            <DropdownMenuItem disabled><Send className="h-4 w-4" />Resend (already signed)</DropdownMenuItem>
            <DropdownMenuItem><Download className="h-4 w-4" />Download</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Section label="In a row context (canonical use)">
        <p className="text-xs text-subtle-foreground mb-2">
          The 3-dot menu sits at the right of a row or card. Click anywhere on the row except the menu to do the row's primary action.
        </p>
        <Card>
          <CardBody className="divide-y divide-border">
            {[
              { name: 'Priya Shankar', email: 'priya@acme.com', status: 'completed' as const },
              { name: 'Karthik Iyer', email: 'karthik@topco.in', status: 'sent' as const },
              { name: 'Anita Narayanan', email: 'anita@xyz.in', status: 'rejected' as const },
            ].map(p => (
              <div key={p.email} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <Avatar size="sm" initials={p.name.split(' ').map(s => s[0]).join('')} />
                <div className="flex-1 min-w-0">
                  <div className="text-base font-medium truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{p.email}</div>
                </div>
                <DocumentStatus status={p.status} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="xs"><MoreVertical className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Send className="h-4 w-4" />Resend</DropdownMenuItem>
                    <DropdownMenuItem><Copy className="h-4 w-4" />Copy invite link</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem destructive><Trash2 className="h-4 w-4" />Remove invitee</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </CardBody>
        </Card>
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
