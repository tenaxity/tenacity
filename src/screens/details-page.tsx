import { useState, useEffect } from 'react'
import {
  ArrowLeft, Download, Share2, Send, MoreVertical, Trash2, XCircle, RefreshCw,
  Plus, FileText, Workflow, FileSignature, BookOpen, HelpCircle, ChevronDown,
  Settings, Wallet, Calendar, User, Eye, Mail, Phone,
  FileText as PreviewIcon, Edit, Lock, FolderCheck, FileCheck, BellRing, Copy,
  Stamp, Receipt, ClipboardList, AlertCircle, CheckCircle2, BadgeCheck,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { FeaturedIcon } from '@/components/ui/featured-icon'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card'
import { Toggle } from '@/components/ui/toggle'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert } from '@/components/ui/alert'
import { Banner } from '@/components/ui/banner'
import { Breadcrumbs } from '@/components/ui/breadcrumb'
import { Loader } from '@/components/ui/loader'
import { toast } from '@/components/ui/toast-store'
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose,
} from '@/components/ui/drawer'
import {
  Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalClose,
} from '@/components/ui/modal'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CreditsIndicator } from '@/components/ui/credits-indicator'
import { AuditTrail } from '@/components/patterns/audit-trail'
import { cn } from '@/lib/cn'

type Tab = 'overview' | 'invitees' | 'audit' | 'settings'
type TopTab = 'dashboard' | 'documents' | 'workflows' | 'wallet' | 'settings'

interface Invitee {
  id: string
  name: string
  email: string
  phone?: string
  role: 'signer' | 'reviewer' | 'cc'
  status: 'signed' | 'pending' | 'rejected' | 'expired'
  signedAt?: string
  rejectionReason?: string
  signingOrder: number
}

const DOC = {
  name: 'Series A SAFE — Acme Inc.',
  id: 'DOC-A1B2-C3D4-E5F6',
  packId: 'PCK-A1B2-C3D4',
  irn: 'IRN-2026-0429',
  folder: 'Investments',
  workflow: 'SAFE — Series A',
  status: 'in-progress' as const,
  createdBy: 'Ritik Garg',
  createdAt: '2026-04-29 09:14',
  expiresAt: '2026-05-13 23:59',
  daysToExpiry: 2,
  amount: 1500000,
}

const INVITEES: Invitee[] = [
  { id: '1', name: 'Priya Shankar',     email: 'priya@acme.com',   phone: '+91 98XXXX1234', role: 'signer',   status: 'signed',   signedAt: '2026-04-29 11:42', signingOrder: 1 },
  { id: '2', name: 'Karthik Iyer',      email: 'karthik@topco.in', phone: '+91 98XXXX5678', role: 'signer',   status: 'pending',  signingOrder: 2 },
  { id: '3', name: 'Anita Narayanan',   email: 'anita@xyz.in',                              role: 'signer',   status: 'rejected', rejectionReason: 'Clauses 3.1 and 7 need legal review', signingOrder: 3 },
  { id: '4', name: 'Sameer Khan',       email: 'sameer@xyz.in',    phone: '+91 98XXXX9012', role: 'reviewer', status: 'signed',   signedAt: '2026-04-29 14:20', signingOrder: 4 },
  { id: '5', name: 'Vinod Joshi',       email: 'vinod@vivacorp.io',                         role: 'signer',   status: 'pending',  signingOrder: 5 },
  { id: '6', name: 'Meera Pillai',      email: 'meera@vivacorp.io',                         role: 'signer',   status: 'pending',  signingOrder: 6 },
  { id: '7', name: 'Arjun Reddy',       email: 'arjun@vivacorp.io',                         role: 'cc',       status: 'pending',  signingOrder: 7 },
  { id: '8', name: 'Diya Raman',        email: 'diya@vivacorp.io',                          role: 'cc',       status: 'pending',  signingOrder: 8 },
]

const inviteeStatusConfig = {
  signed:   { tone: 'success' as const, label: 'Signed' },
  pending:  { tone: 'warning' as const, label: 'Pending' },
  rejected: { tone: 'danger'  as const, label: 'Rejected' },
  expired:  { tone: 'neutral' as const, label: 'Expired' },
}

type LoadPhase = 'spinner' | 'skeleton' | 'ready'

export function DetailsPage() {
  const [topTab] = useState<TopTab>('documents')
  const [tab, setTab] = useState<Tab>('overview')
  const [drawerInvitee, setDrawerInvitee] = useState<Invitee | null>(null)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [phase, setPhase] = useState<LoadPhase>('spinner')

  // Two-phase load: stamp loader (centered) → skeleton placeholders → real content.
  // Showcases both loading idioms when navigating from the Sent table.
  // Durations are deliberately leisurely (~3s total) so each phase is visible —
  // production timings would be tied to the actual fetch state, not timers.
  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('skeleton'), 1400)
    const t2 = window.setTimeout(() => setPhase('ready'), 3000)
    return () => { window.clearTimeout(t1); window.clearTimeout(t2) }
  }, [])

  if (phase === 'spinner') return <DetailsSpinnerView />

  const signedCount = INVITEES.filter(i => i.status === 'signed').length
  const totalActiveInvitees = INVITEES.filter(i => i.role !== 'cc').length
  const rejectedCount = INVITEES.filter(i => i.status === 'rejected').length
  const pendingCount = INVITEES.filter(i => i.role !== 'cc' && i.status === 'pending').length

  // Progress tone follows the same green-by-default rule as the Sent table.
  // Only flips to danger when something has actively gone wrong (rejection / expiry).
  const progressTone: 'success' | 'danger' = rejectedCount > 0 ? 'danger' : 'success'
  const showExpiryBanner = !bannerDismissed && DOC.daysToExpiry <= 3

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Top nav — same as Sent page */}
        <header className="sticky top-0 z-30 border-b border-border bg-background">
          <div className="h-14 px-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-8 shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary" />
                <span className="font-semibold tracking-tight text-md">tenacity</span>
              </div>
              <nav className="flex items-center gap-1">
                {([
                  { id: 'dashboard', label: 'Dashboard' },
                  { id: 'documents', label: 'Documents' },
                  { id: 'workflows', label: 'Workflows' },
                  { id: 'wallet',    label: 'Wallet' },
                  { id: 'settings',  label: 'Settings' },
                ] as { id: TopTab; label: string }[]).map(t => (
                  <button
                    key={t.id}
                    className={cn(
                      'px-3 h-14 text-base transition-colors -mb-px border-b-2',
                      topTab === t.id
                        ? 'text-primary font-semibold border-primary'
                        : 'text-muted-foreground hover:text-foreground border-transparent'
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4" />Create</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[14rem]">
                  <DropdownMenuItem><FileText className="h-4 w-4" />New document</DropdownMenuItem>
                  <DropdownMenuItem><Workflow className="h-4 w-4" />Run workflow</DropdownMenuItem>
                  <DropdownMenuItem><FileSignature className="h-4 w-4" />New template</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><BookOpen className="h-4 w-4" />Import from file</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <CreditsIndicator remaining={2480} total={10000} label="eSign" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm"><HelpCircle className="h-4 w-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>Help &amp; support</TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-md p-1 hover:bg-muted transition-colors">
                    <Avatar size="sm" initials="RG" />
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[12rem]">
                  <DropdownMenuLabel>Ritik Garg</DropdownMenuLabel>
                  <DropdownMenuItem><Settings className="h-4 w-4" />Account settings</DropdownMenuItem>
                  <DropdownMenuItem><Wallet className="h-4 w-4" />Billing &amp; wallet</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Banner — expiry warning. Sticks below top nav; loud by design (Hard Rule #1: solid, not tinted). */}
        {phase === 'ready' && showExpiryBanner && (
          <Banner
            tone="warning"
            onClose={() => setBannerDismissed(true)}
            action={
              <Button variant="ghost" size="sm" className="text-current hover:bg-foreground/10">
                <Calendar className="h-4 w-4" />Extend expiry
              </Button>
            }
          >
            <span className="font-semibold">Expiring soon.</span>{' '}
            This document expires in {DOC.daysToExpiry} day{DOC.daysToExpiry === 1 ? '' : 's'} ({DOC.expiresAt}). {pendingCount} signers haven't responded yet.
          </Banner>
        )}

        {phase === 'skeleton' && <DetailsSkeletonMain />}

        {phase === 'ready' && <main className="max-w-5xl mx-auto px-10 py-6">
            {/* Breadcrumbs */}
            <div className="mb-4 flex items-center gap-3">
              <button className="inline-flex items-center justify-center rounded-md hover:bg-muted h-7 w-7 text-muted-foreground hover:text-foreground transition-colors" aria-label="Back">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <Breadcrumbs
                items={[
                  { label: 'Documents', href: '#' },
                  { label: 'Sent', href: '#' },
                  { label: DOC.name },
                ]}
              />
            </div>

            {/* Document header */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl font-semibold tracking-tight truncate">{DOC.name}</h1>
                  <div className="flex items-center gap-3 mt-1 text-xs font-medium tabular-nums text-subtle-foreground">
                    <span className="font-mono">{DOC.id}</span>
                    <span className="text-border">·</span>
                    <Badge tone="neutral" variant="outline">{DOC.folder}</Badge>
                    <span className="text-border">·</span>
                    <span>Created {DOC.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="secondary" size="md"><RefreshCw className="h-4 w-4" /></Button>
                    </TooltipTrigger>
                    <TooltipContent>Refresh status</TooltipContent>
                  </Tooltip>
                  {/* Download split — Document or Audit trail */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary"><Download className="h-4 w-4" />Download<ChevronDown className="h-3 w-3 -ml-1 opacity-60" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[12rem]">
                      <DropdownMenuItem><FileText className="h-4 w-4" />Document (PDF)</DropdownMenuItem>
                      <DropdownMenuItem><ClipboardList className="h-4 w-4" />Audit trail (PDF)</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ShareModal />
                  <Button><Send className="h-4 w-4" />Send reminder</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="md"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[15rem]">
                      <DropdownMenuLabel>Document</DropdownMenuLabel>
                      <DropdownMenuItem><Edit className="h-4 w-4" />Edit details</DropdownMenuItem>
                      <NotificationLogsModalTrigger />
                      <ReactivateModalTrigger />
                      <SaveToLeegalityModalTrigger />
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Records</DropdownMenuLabel>
                      <StampDetailsModalTrigger />
                      <PaymentLogsModalTrigger label="Payment logs" />
                      <SupportingDocsModalTrigger />
                      <ReferenceAttachmentsModalTrigger />
                      <NeslFormModalTrigger />
                      <DropdownMenuSeparator />
                      <RejectDocumentModalTrigger />
                      <DeleteDocumentModalTrigger />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Status row with progress — green by default, flips to danger only when something's gone wrong */}
              <Card>
                <CardBody className="flex items-center gap-6">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="text-base font-semibold">In progress</div>
                        <span className="text-base text-subtle-foreground tabular-nums font-medium">{signedCount} of {totalActiveInvitees} signed</span>
                      </div>
                      <span className="text-xs font-medium tabular-nums text-subtle-foreground whitespace-nowrap">
                        Expires {DOC.expiresAt}
                      </span>
                    </div>
                    <Progress value={(signedCount / totalActiveInvitees) * 100} tone={progressTone} className="h-2" />
                  </div>
                </CardBody>
              </Card>

              {/* Inline alert — only when progression is blocked. Outline variant per Hard Rule #1. */}
              {rejectedCount > 0 && (
                <Alert tone="danger" title={`${rejectedCount} invitee${rejectedCount === 1 ? '' : 's'} rejected — document is on hold`}>
                  Resolve the rejection or remove the invitee to resume signing.{' '}
                  <button onClick={() => setTab('invitees')} className="underline font-medium hover:text-danger">
                    Review rejection →
                  </button>
                </Alert>
              )}
            </div>

            {/* Tabs */}
            <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="invitees">Invitees<Badge tone="neutral" variant="soft" className="ml-1.5">{INVITEES.length}</Badge></TabsTrigger>
                <TabsTrigger value="audit">Audit trail</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* OVERVIEW — preview + invitee list side by side */}
              <TabsContent value="overview">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Document preview</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <div className="aspect-[8.5/11] bg-muted rounded-md flex items-center justify-center text-muted-foreground border border-border">
                          <div className="text-center">
                            <PreviewIcon className="h-10 w-10 mx-auto mb-2" />
                            <div className="text-base">PDF preview</div>
                            <div className="text-xs">{DOC.name}</div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Invitees</CardTitle>
                      </CardHeader>
                      <CardBody className="divide-y divide-border -my-3">
                        {INVITEES.slice(0, 5).map(inv => (
                          <button
                            key={inv.id}
                            onClick={() => setDrawerInvitee(inv)}
                            className="w-full flex items-center gap-3 py-3 hover:bg-muted/40 rounded-sm -mx-2 px-2 transition-colors text-left"
                          >
                            <Avatar size="sm" initials={inv.name.split(' ').map(s => s[0]).join('')} />
                            <div className="flex-1 min-w-0">
                              <div className="text-base font-medium truncate">{inv.name}</div>
                              <div className="text-xs text-muted-foreground truncate">{inv.role === 'cc' ? 'CC · informational' : `Order ${inv.signingOrder}`}</div>
                            </div>
                            <Badge tone={inviteeStatusConfig[inv.status].tone} variant="solid">{inviteeStatusConfig[inv.status].label}</Badge>
                          </button>
                        ))}
                        {INVITEES.length > 5 && (
                          <button onClick={() => setTab('invitees')} className="w-full text-center py-3 text-base text-primary font-medium hover:underline">
                            View all {INVITEES.length} invitees →
                          </button>
                        )}
                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recent activity</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <AuditTrail
                          events={[
                            { type: 'rejected', actor: 'Anita Narayanan', timestamp: '2 hrs ago', detail: 'Clauses 3.1 and 7 need legal review' },
                            { type: 'signed',   actor: 'Sameer Khan',     timestamp: '4 hrs ago' },
                            { type: 'signed',   actor: 'Priya Shankar',   timestamp: 'Yesterday' },
                            { type: 'sent',     actor: 'You',             timestamp: 'Apr 29' },
                          ]}
                        />
                        <button onClick={() => setTab('audit')} className="w-full text-center pt-3 text-base text-primary font-medium hover:underline">
                          View full audit trail →
                        </button>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* INVITEES — full list */}
              <TabsContent value="invitees">
                <Card>
                  <CardBody className="divide-y divide-border -my-3">
                    {INVITEES.map(inv => (
                      <div key={inv.id} className="flex items-center gap-4 py-3">
                        <span className="font-mono text-xs font-medium tabular-nums text-muted-foreground w-6 text-center shrink-0">{inv.signingOrder}</span>
                        <Avatar size="md" initials={inv.name.split(' ').map(s => s[0]).join('')} status={inv.status === 'signed' ? 'online' : inv.status === 'rejected' ? 'offline' : 'away'} />
                        {/* Clickable content area — opens drawer */}
                        <button
                          onClick={() => setDrawerInvitee(inv)}
                          className="flex-1 min-w-0 text-left rounded-sm hover:bg-muted/40 transition-colors -mx-1 px-1 py-1"
                        >
                          <div className="flex items-center gap-2">
                            <div className="text-base font-medium truncate">{inv.name}</div>
                            <Badge tone="neutral" variant="outline" className="capitalize">{inv.role}</Badge>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{inv.email}</span>
                            {inv.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{inv.phone}</span>}
                          </div>
                          {inv.rejectionReason && (
                            <div className="text-xs text-danger mt-1 flex items-center gap-1">
                              <XCircle className="h-3 w-3 shrink-0" />
                              {inv.rejectionReason}
                            </div>
                          )}
                        </button>
                        {/* Status column — fixed width */}
                        <div className="flex flex-col items-end gap-1 shrink-0 w-24">
                          <Badge tone={inviteeStatusConfig[inv.status].tone} variant="solid">{inviteeStatusConfig[inv.status].label}</Badge>
                          {inv.signedAt && (
                            <span className="text-xs font-medium tabular-nums text-muted-foreground whitespace-nowrap">{inv.signedAt}</span>
                          )}
                        </div>
                        {/* Quick actions — fixed width so badge never shifts */}
                        <div className="flex items-center justify-end gap-1 shrink-0 w-16">
                          {inv.status === 'pending' && (
                            <ResendNotificationModal invitee={inv} compact />
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="xs"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="min-w-[14rem]">
                              <DropdownMenuItem onSelect={() => setDrawerInvitee(inv)}><Eye className="h-4 w-4" />View details</DropdownMenuItem>
                              {inv.status === 'pending' && (
                                <ResendNotificationModal invitee={inv} renderAsMenuItem />
                              )}
                              <PaymentLogsModalTrigger label="Payment logs" renderAsMenuItem />
                              <NotificationLogsModalTrigger renderAsMenuItem />
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onSelect={() => {
                                  const url = `https://sign.tenacity.app/i/${inv.id}-…`
                                  navigator.clipboard?.writeText(url).catch(() => {})
                                  toast({ tone: 'success', title: 'Sign URL copied', description: `${inv.name}'s link is on your clipboard.` })
                                }}
                              ><Copy className="h-4 w-4" />Copy sign URL</DropdownMenuItem>
                              <DropdownMenuItem><Edit className="h-4 w-4" />Edit invitee</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <RemoveInviteeModal invitee={inv} />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </CardBody>
                </Card>
              </TabsContent>

              {/* AUDIT — full trail with download */}
              <TabsContent value="audit">
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle>Audit trail</CardTitle>
                    <Button variant="secondary" size="sm"><Download className="h-4 w-4" />Download</Button>
                  </CardHeader>
                  <CardBody>
                    <AuditTrail
                      events={[
                        { type: 'created',       actor: 'Ritik Garg',      timestamp: '2026-04-29 09:14' },
                        { type: 'sent',          actor: 'Ritik Garg',      timestamp: '2026-04-29 09:18', detail: 'Sent to 8 invitees, 14-day expiry' },
                        { type: 'opened',        actor: 'Priya Shankar',   timestamp: '2026-04-29 11:03' },
                        { type: 'signed',        actor: 'Priya Shankar',   timestamp: '2026-04-29 11:42', detail: 'Signed via Aadhaar eSign · IP 49.205.74.12' },
                        { type: 'opened',        actor: 'Sameer Khan',     timestamp: '2026-04-29 13:30' },
                        { type: 'signed',        actor: 'Sameer Khan',     timestamp: '2026-04-29 14:20', detail: 'Signed via DSC · IP 122.181.55.99' },
                        { type: 'opened',        actor: 'Karthik Iyer',    timestamp: '2026-04-29 15:10' },
                        { type: 'opened',        actor: 'Anita Narayanan', timestamp: '2026-04-29 16:00' },
                        { type: 'rejected',      actor: 'Anita Narayanan', timestamp: '2026-04-29 16:15', detail: 'Reason: clauses 3.1 and 7 need legal review' },
                        { type: 'reminder-sent', actor: 'System',          timestamp: '2026-04-30 10:00', detail: 'Auto-reminder · 5 invitees pending' },
                      ]}
                    />
                  </CardBody>
                </Card>
              </TabsContent>

              {/* SETTINGS */}
              <TabsContent value="settings">
                <div className="space-y-4 max-w-2xl">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reminders</CardTitle>
                    </CardHeader>
                    <CardBody className="space-y-4">
                      <SettingsRow title="Auto-reminders" description="Send reminders to pending invitees automatically">
                        <Toggle defaultChecked />
                      </SettingsRow>
                      <SettingsRow title="Reminder cadence" description="How often to send reminders to pending invitees">
                        <div className="w-44">
                          <Select defaultValue="3d">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1d">Every day</SelectItem>
                              <SelectItem value="3d">Every 3 days</SelectItem>
                              <SelectItem value="7d">Every week</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </SettingsRow>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Expiry</CardTitle>
                    </CardHeader>
                    <CardBody className="space-y-4">
                      <SettingsRow title="Expiry date" description={`Currently set to ${DOC.expiresAt}`}>
                        <Button variant="secondary" size="sm"><Calendar className="h-4 w-4" />Change date</Button>
                      </SettingsRow>
                      <SettingsRow title="Auto-archive after expiry" description="Move to Expired folder when the date passes">
                        <Toggle defaultChecked />
                      </SettingsRow>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Document info</CardTitle>
                    </CardHeader>
                    <CardBody className="space-y-3">
                      <InfoRow label="Pack ID" value={DOC.packId} mono />
                      <InfoRow label="IRN" value={DOC.irn} mono />
                      <InfoRow label="Workflow" value={DOC.workflow} />
                      <InfoRow label="Created by" value={DOC.createdBy} />
                      <InfoRow label="Folder" value={<Badge tone="neutral" variant="outline">{DOC.folder}</Badge>} />
                    </CardBody>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
        </main>}

        {/* Invitee detail drawer */}
        <Drawer open={!!drawerInvitee} onOpenChange={(o) => !o && setDrawerInvitee(null)}>
          <DrawerContent side="right" size="md">
            {drawerInvitee && (
              <>
                <DrawerHeader icon={<FeaturedIcon size="sm" tone={inviteeStatusConfig[drawerInvitee.status].tone} icon={<User />} />}>
                  <DrawerTitle>{drawerInvitee.name}</DrawerTitle>
                  <DrawerDescription>
                    Order {drawerInvitee.signingOrder} · {drawerInvitee.role === 'cc' ? 'CC (informational)' : drawerInvitee.role}
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerBody className="space-y-5">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold mb-2">Status</div>
                    <Badge tone={inviteeStatusConfig[drawerInvitee.status].tone} variant="solid">{inviteeStatusConfig[drawerInvitee.status].label}</Badge>
                    {drawerInvitee.signedAt && <div className="text-base text-subtle-foreground mt-2">Signed at {drawerInvitee.signedAt}</div>}
                    {drawerInvitee.rejectionReason && (
                      <div className="text-base text-danger mt-2">Reason: {drawerInvitee.rejectionReason}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold mb-2">Contact</div>
                    <div className="space-y-2">
                      <InfoRow label="Email" value={drawerInvitee.email} />
                      {drawerInvitee.phone && <InfoRow label="Phone" value={drawerInvitee.phone} />}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold mb-2">Sign URL</div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-xs text-subtle-foreground truncate flex-1">https://sign.tenacity.app/i/{drawerInvitee.id}-…</span>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => {
                          const url = `https://sign.tenacity.app/i/${drawerInvitee.id}-…`
                          navigator.clipboard?.writeText(url).catch(() => {})
                          toast({ tone: 'success', title: 'Sign URL copied' })
                        }}
                      >Copy</Button>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold mb-2">Recent notifications</div>
                    <NotificationsPreview />
                  </div>
                </DrawerBody>
                <DrawerFooter>
                  <DrawerClose asChild><Button variant="ghost">Close</Button></DrawerClose>
                  {drawerInvitee.status === 'pending' && (
                    <Button onClick={() => toast({ tone: 'success', title: 'Invitation resent', description: `${drawerInvitee.name} has been re-notified.` })}>
                      <Send className="h-4 w-4" />Resend
                    </Button>
                  )}
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>
    </TooltipProvider>
  )
}

/* ───────── Loading views ───────── */

/*
  Phase 1 — full-page loader. The stamp loader carries the tenacity voice
  ("a stamp pressing") so even the loading screen reads as a Tenacity surface
  rather than a generic spinner.
*/
function DetailsSpinnerView() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4">
      <Loader variant="stamps" size="xl" tone="primary" />
      <div className="text-base font-medium text-subtle-foreground">Loading document…</div>
    </div>
  )
}

/*
  Phase 2 — page chrome appears, content area is skeletons. Matches the
  layout of the real page so there's no shift when content swaps in.
*/
function DetailsSkeletonMain() {
  return (
    <main className="max-w-5xl mx-auto px-10 py-6">
      {/* Breadcrumb skeleton */}
      <div className="mb-4 flex items-center gap-3">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Title row + actions */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="space-y-2 flex-1 min-w-0">
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>

      {/* Status card */}
      <Card className="mb-6">
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        </CardBody>
      </Card>

      {/* Tab list skeleton */}
      <div className="flex items-center gap-2 border-b border-border mb-4">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-24" />
      </div>

      {/* Content area — preview + side cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader><Skeleton className="h-4 w-32" /></CardHeader>
            <CardBody><Skeleton className="aspect-[8.5/11] w-full" /></CardBody>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader><Skeleton className="h-4 w-20" /></CardHeader>
            <CardBody className="space-y-3">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-2 w-20" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  )
}

/* ───────── Sub-components ───────── */

function SettingsRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <div className="text-base font-medium">{title}</div>
        <div className="text-xs text-subtle-foreground mt-0.5">{description}</div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function InfoRow({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 text-base">
      <span className="text-subtle-foreground">{label}</span>
      <span className={cn(mono && 'font-mono text-xs font-medium tabular-nums', !mono && 'font-medium')}>{value}</span>
    </div>
  )
}

/*
  Recent notifications preview. Renders Skeleton placeholder briefly to showcase
  the loading idiom (toggle to actual data on click for demo purposes).
*/
function NotificationsPreview() {
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2"><Skeleton className="h-8 w-8" /><div className="flex-1 space-y-1"><Skeleton className="h-3 w-2/3" /><Skeleton className="h-3 w-1/3" /></div></div>
        <div className="flex items-center gap-2"><Skeleton className="h-8 w-8" /><div className="flex-1 space-y-1"><Skeleton className="h-3 w-1/2" /><Skeleton className="h-3 w-1/4" /></div></div>
        <button onClick={() => setLoaded(true)} className="text-xs text-primary font-medium hover:underline">Load history</button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {[
        { kind: 'Initial invite', channel: 'Email', at: '2026-04-29 09:18', ok: true },
        { kind: 'Reminder',       channel: 'Email', at: '2026-04-30 10:00', ok: true },
        { kind: 'Reminder',       channel: 'SMS',   at: '2026-04-30 10:01', ok: false },
      ].map((n, i) => (
        <div key={i} className="flex items-center gap-2 text-base">
          {n.ok
            ? <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
            : <AlertCircle  className="h-4 w-4 text-danger  shrink-0" />}
          <span className="font-medium">{n.kind}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-subtle-foreground">{n.channel}</span>
          <span className="ml-auto text-xs text-muted-foreground tabular-nums">{n.at}</span>
        </div>
      ))}
    </div>
  )
}

/* ───────── Modal triggers ───────── */

function ShareModal() {
  const link = `https://share.tenacity.app/d/${DOC.id}`
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary"><Share2 className="h-4 w-4" />Share</Button>
      </ModalTrigger>
      <ModalContent size="md">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="primary" icon={<Share2 />} />}>
          <ModalTitle>Share document</ModalTitle>
          <ModalDescription>Anyone with the link can view this document. Audit trail stays private.</ModalDescription>
        </ModalHeader>
        <ModalBody className="space-y-4">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-subtle-foreground">Public link</div>
            <div className="flex items-center gap-2">
              <Input readOnly value={link} className="font-mono text-xs" />
              <Button
                variant="secondary"
                onClick={() => {
                  navigator.clipboard?.writeText(link).catch(() => {})
                  toast({ tone: 'success', title: 'Link copied', description: 'Public link copied to clipboard.' })
                }}
              ><Copy className="h-4 w-4" />Copy</Button>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-subtle-foreground">Send via email</div>
            <Input placeholder="recipient@example.com" />
          </div>
          <Alert tone="info">
            Sharing logs are recorded in the audit trail. Recipients are listed but cannot sign.
          </Alert>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>
          <ModalClose asChild>
            <Button onClick={() => toast({ tone: 'success', title: 'Share email sent', description: 'Recipients will receive a view-only link.' })}>Send link</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function NotificationLogsModalTrigger({ renderAsMenuItem = false }: { renderAsMenuItem?: boolean }) {
  return (
    <Modal>
      <ModalTrigger asChild>
        {renderAsMenuItem
          ? <DropdownMenuItem onSelect={(e) => e.preventDefault()}><BellRing className="h-4 w-4" />Notification logs</DropdownMenuItem>
          : <DropdownMenuItem onSelect={(e) => e.preventDefault()}><BellRing className="h-4 w-4" />Notification logs</DropdownMenuItem>}
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="primary" icon={<BellRing />} />}>
          <ModalTitle>Notification logs</ModalTitle>
          <ModalDescription>Every email, SMS, and WhatsApp message sent for this document.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <table className="w-full text-base">
            <thead className="border-b border-border">
              <tr className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold text-left">
                <th className="py-2 pr-3">Type</th>
                <th className="py-2 pr-3">Channel</th>
                <th className="py-2 pr-3">Recipient</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3 text-right">At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { type: 'Initial invite', channel: 'Email', recipient: 'priya@acme.com',     status: 'success', at: '2026-04-29 09:18' },
                { type: 'Initial invite', channel: 'Email', recipient: 'karthik@topco.in',   status: 'success', at: '2026-04-29 09:18' },
                { type: 'Initial invite', channel: 'Email', recipient: 'anita@xyz.in',       status: 'success', at: '2026-04-29 09:18' },
                { type: 'Reminder',       channel: 'Email', recipient: 'karthik@topco.in',   status: 'success', at: '2026-04-30 10:00' },
                { type: 'Reminder',       channel: 'SMS',   recipient: '+91 98XXXX5678',     status: 'failed',  at: '2026-04-30 10:01' },
                { type: 'Reminder',       channel: 'WhatsApp', recipient: '+91 98XXXX5678',  status: 'pending', at: '2026-04-30 10:02' },
              ].map((row, i) => (
                <tr key={i} className="text-base">
                  <td className="py-2 pr-3 font-medium">{row.type}</td>
                  <td className="py-2 pr-3">{row.channel}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{row.recipient}</td>
                  <td className="py-2 pr-3">
                    <Badge
                      tone={row.status === 'success' ? 'success' : row.status === 'failed' ? 'danger' : 'warning'}
                      variant="solid"
                    >
                      {row.status}
                    </Badge>
                  </td>
                  <td className="py-2 pr-3 text-right tabular-nums text-xs font-medium text-subtle-foreground whitespace-nowrap">{row.at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Close</Button></ModalClose>
          <Button variant="secondary"><Download className="h-4 w-4" />Export CSV</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function PaymentLogsModalTrigger({ label, renderAsMenuItem = false }: { label: string; renderAsMenuItem?: boolean }) {
  return (
    <Modal>
      <ModalTrigger asChild>
        {renderAsMenuItem
          ? <DropdownMenuItem onSelect={(e) => e.preventDefault()}><Receipt className="h-4 w-4" />{label}</DropdownMenuItem>
          : <DropdownMenuItem onSelect={(e) => e.preventDefault()}><Receipt className="h-4 w-4" />{label}</DropdownMenuItem>}
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="primary" icon={<Receipt />} />}>
          <ModalTitle>Payment logs</ModalTitle>
          <ModalDescription>All transactions recorded for this document.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <table className="w-full text-base">
            <thead className="border-b border-border">
              <tr className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold text-left">
                <th className="py-2 pr-3">Date</th>
                <th className="py-2 pr-3">Reference</th>
                <th className="py-2 pr-3">Method</th>
                <th className="py-2 pr-3 text-right">Amount</th>
                <th className="py-2 pr-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { date: '2026-04-29', ref: 'TXN/77182910', method: 'UPI',         amount: '₹500',  status: 'success' },
                { date: '2026-04-29', ref: 'TXN/77182913', method: 'Net Banking', amount: '₹1,200',status: 'success' },
                { date: '2026-04-30', ref: 'TXN/77185004', method: 'Card',        amount: '₹250',  status: 'failed'  },
              ].map((row, i) => (
                <tr key={i} className="text-base">
                  <td className="py-2 pr-3 tabular-nums">{row.date}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{row.ref}</td>
                  <td className="py-2 pr-3">{row.method}</td>
                  <td className="py-2 pr-3 text-right tabular-nums font-medium">{row.amount}</td>
                  <td className="py-2 pr-3">
                    <Badge tone={row.status === 'success' ? 'success' : 'danger'} variant="solid">{row.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Close</Button></ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function StampDetailsModalTrigger() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}><Stamp className="h-4 w-4" />Stamp details</DropdownMenuItem>
      </ModalTrigger>
      <ModalContent size="md">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="success" icon={<Stamp />} />}>
          <ModalTitle>Stamp details</ModalTitle>
          <ModalDescription>e-Stamp paper applied to this document.</ModalDescription>
        </ModalHeader>
        <ModalBody className="space-y-3">
          <InfoRow label="Stamp serial" value="SHCIL-MH-202604-AAA12345" mono />
          <InfoRow label="State" value="Maharashtra" />
          <InfoRow label="Denomination" value="₹500" />
          <InfoRow label="Article" value="5(h-A)" />
          <InfoRow label="First party" value="Acme Inc." />
          <InfoRow label="Second party" value="Series A Investors" />
          <InfoRow label="Issued" value="2026-04-29" />
          <Alert tone="success" variant="outline">Stamp consumed and locked to this document. The serial is verifiable on the SHCIL public registry.</Alert>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Close</Button></ModalClose>
          <Button variant="secondary"><Download className="h-4 w-4" />Download stamp paper</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function SupportingDocsModalTrigger() {
  const files = [
    { name: 'Cap-table-snapshot.pdf', size: '124 KB', uploaded: '2026-04-29' },
    { name: 'Board-resolution.pdf',   size: '88 KB',  uploaded: '2026-04-29' },
  ]
  return (
    <Modal>
      <ModalTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}><FolderCheck className="h-4 w-4" />Supporting documents</DropdownMenuItem>
      </ModalTrigger>
      <ModalContent size="md">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="primary" icon={<FolderCheck />} />}>
          <ModalTitle>Supporting documents</ModalTitle>
          <ModalDescription>Files attached for context. Not part of the signed payload.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="divide-y divide-border -my-2">
            {files.map(f => (
              <div key={f.name} className="flex items-center gap-3 py-3">
                <FeaturedIcon size="sm" tone="neutral" icon={<FileText />} />
                <div className="min-w-0 flex-1">
                  <div className="text-base font-medium truncate">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{f.size} · uploaded {f.uploaded}</div>
                </div>
                <Button variant="ghost" size="xs"><Download className="h-3.5 w-3.5" /></Button>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Close</Button></ModalClose>
          <Button variant="secondary"><Plus className="h-4 w-4" />Add file</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function ReferenceAttachmentsModalTrigger() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}><FileCheck className="h-4 w-4" />Reference attachments</DropdownMenuItem>
      </ModalTrigger>
      <ModalContent size="md">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="primary" icon={<FileCheck />} />}>
          <ModalTitle>Reference attachments</ModalTitle>
          <ModalDescription>Files invitees uploaded as part of signing (KYC, ID proofs, etc.).</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="divide-y divide-border -my-2">
            {[
              { invitee: 'Priya Shankar', file: 'pan-card.pdf',       size: '92 KB' },
              { invitee: 'Sameer Khan',   file: 'aadhaar-masked.pdf', size: '64 KB' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <Avatar size="sm" initials={r.invitee.split(' ').map(s => s[0]).join('')} />
                <div className="min-w-0 flex-1">
                  <div className="text-base font-medium truncate">{r.invitee}</div>
                  <div className="text-xs text-muted-foreground truncate">{r.file} · {r.size}</div>
                </div>
                <Button variant="ghost" size="xs"><Download className="h-3.5 w-3.5" /></Button>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Close</Button></ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function NeslFormModalTrigger() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}><BadgeCheck className="h-4 w-4" />NESL form</DropdownMenuItem>
      </ModalTrigger>
      <ModalContent size="md">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="primary" icon={<BadgeCheck />} />}>
          <ModalTitle>NESL form</ModalTitle>
          <ModalDescription>National e-Governance Services details captured at signing.</ModalDescription>
        </ModalHeader>
        <ModalBody className="space-y-3">
          <Alert tone="warning" variant="outline">Two of three required NESL fields are filled. The form will be auto-submitted when the document completes.</Alert>
          <InfoRow label="Instrument type" value="Equity SAFE" />
          <InfoRow label="Article reference" value="5(h-A)" />
          <InfoRow label="State of execution" value="Maharashtra" />
          <InfoRow label="Consideration value" value="₹15,00,000" />
          <InfoRow label="Filing reference" value="—" />
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Close</Button></ModalClose>
          <Button>Edit form</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function ReactivateModalTrigger() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}><RefreshCw className="h-4 w-4" />Reactivate</DropdownMenuItem>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="success" icon={<RefreshCw />} />}>
          <ModalTitle>Reactivate document?</ModalTitle>
          <ModalDescription>Pending invitees will receive a fresh invite. The expiry date will be extended by 14 days.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>
          <ModalClose asChild>
            <Button onClick={() => toast({ tone: 'success', title: 'Document reactivated', description: 'Pending invitees have been re-notified.' })}>Reactivate</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function SaveToLeegalityModalTrigger() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}><FolderCheck className="h-4 w-4" />Save to vault</DropdownMenuItem>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="primary" icon={<FolderCheck />} />}>
          <ModalTitle>Save to long-term vault?</ModalTitle>
          <ModalDescription>The signed document and its audit trail will be archived and counted against your retention plan.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>
          <ModalClose asChild>
            <Button onClick={() => toast({ tone: 'success', title: 'Saved to vault', description: 'The document is now archived for long-term retention.' })}>Save</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function RejectDocumentModalTrigger() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}><XCircle className="h-4 w-4" />Reject document</DropdownMenuItem>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="danger" icon={<XCircle />} />}>
          <ModalTitle>Reject this document?</ModalTitle>
          <ModalDescription>The document will be marked rejected. All pending invitees will be notified. This cannot be undone.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>
          <ModalClose asChild>
            <Button variant="destructive" onClick={() => toast({ tone: 'danger', title: 'Document rejected', description: 'All pending invitees have been notified.' })}>Reject</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function DeleteDocumentModalTrigger() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} destructive><Trash2 className="h-4 w-4" />Delete document</DropdownMenuItem>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="danger" icon={<Trash2 />} />}>
          <ModalTitle>Delete this document?</ModalTitle>
          <ModalDescription>The document and its audit trail will be permanently removed. This cannot be undone.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>
          <ModalClose asChild>
            <Button variant="destructive" onClick={() => toast({ tone: 'danger', title: 'Document deleted' })}>Delete</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

/* Per-invitee actions */

function ResendNotificationModal({ invitee, compact = false, renderAsMenuItem = false }: { invitee: Invitee; compact?: boolean; renderAsMenuItem?: boolean }) {
  return (
    <Modal>
      <ModalTrigger asChild>
        {renderAsMenuItem
          ? <DropdownMenuItem onSelect={(e) => e.preventDefault()}><Send className="h-4 w-4" />Resend invitation</DropdownMenuItem>
          : compact
            ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="xs"><Send className="h-3.5 w-3.5" /></Button>
                </TooltipTrigger>
                <TooltipContent>Resend invitation</TooltipContent>
              </Tooltip>
            )
            : <Button variant="secondary" size="sm"><Send className="h-4 w-4" />Resend</Button>}
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="primary" icon={<Send />} />}>
          <ModalTitle>Resend invitation?</ModalTitle>
          <ModalDescription>{invitee.name} will receive a fresh sign invite via {invitee.phone ? 'email and SMS' : 'email'}.</ModalDescription>
        </ModalHeader>
        <ModalBody className="space-y-3">
          <InfoRow label="Recipient" value={invitee.email} mono />
          {invitee.phone && <InfoRow label="Phone" value={invitee.phone} mono />}
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>
          <ModalClose asChild>
            <Button onClick={() => toast({ tone: 'success', title: 'Invitation resent', description: `${invitee.name} has been re-notified.` })}>Send invitation</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function RemoveInviteeModal({ invitee }: { invitee: Invitee }) {
  return (
    <Modal>
      <ModalTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} destructive><Trash2 className="h-4 w-4" />Remove invitee</DropdownMenuItem>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader icon={<FeaturedIcon size="sm" tone="danger" icon={<Trash2 />} />}>
          <ModalTitle>Remove {invitee.name}?</ModalTitle>
          <ModalDescription>{invitee.name} will lose access to this document and any pending invitation will be revoked. This cannot be undone.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>
          <ModalClose asChild>
            <Button variant="destructive" onClick={() => toast({ tone: 'danger', title: 'Invitee removed', description: `${invitee.name} no longer has access.` })}>Remove invitee</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
