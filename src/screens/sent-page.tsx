import { useState, useMemo } from 'react'
import {
  FileText, Search, Plus, Download, Share2, Eye, Info, FolderPlus, Trash2, MoreVertical,
  Inbox, FolderOpen, Workflow, FileSignature, Settings, HelpCircle, ChevronDown,
  Copy, Settings2, Activity, Wallet, BookOpen, ArrowDownLeft, Loader, AlertTriangle, Clock,
  XCircle, CheckCircle, Send, AlertCircle,
} from 'lucide-react'
import { LeftNav, LeftNavSection, LeftNavItem } from '@/components/ui/left-nav'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MultiSelect } from '@/components/ui/multi-select'
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CreditsIndicator } from '@/components/ui/credits-indicator'
import { toast } from '@/components/ui/toast-store'
import { cn } from '@/lib/cn'

interface Pack {
  id: string
  name: string
  packId: string
  folder?: string
  irn?: string
  invitees: string[]
  inviteeCount: number
  signedCount: number
  status: 'draft' | 'sent' | 'in-progress' | 'completed' | 'rejected' | 'expired' | 'failed'
  createdAt: string
  updatedAt: string
}

const PACKS: Pack[] = [
  { id: '1', name: 'Series A SAFE — Acme Inc.',     packId: 'PCK-A1B2-C3D4', folder: 'Investments', irn: 'IRN-2026-0429', invitees: ['Priya Shankar', 'Rohan Mehta'],   inviteeCount: 8,  signedCount: 3, status: 'in-progress', createdAt: '2026-04-29 09:14', updatedAt: '2026-04-29 16:22' },
  { id: '2', name: 'NDA — TopCo Capital',           packId: 'PCK-K9L8-M7N6', folder: 'Legal',        invitees: ['Karthik Iyer'],                                          inviteeCount: 1,  signedCount: 1, status: 'completed',   createdAt: '2026-04-27 11:02', updatedAt: '2026-04-28 14:58' },
  { id: '3', name: 'Vendor MSA — Q2 batch',         packId: 'PCK-P3Q4-R5S6', folder: 'Vendors',      irn: 'IRN-2026-0328', invitees: ['Anita Narayanan', 'Sameer Khan'], inviteeCount: 4,  signedCount: 2, status: 'rejected',    createdAt: '2026-03-28 09:30', updatedAt: '2026-03-29 11:15' },
  { id: '4', name: 'Employment offer — Diya R.',    packId: 'PCK-D7E8-F9G0', folder: 'HR',           invitees: ['Diya Raman'],                                            inviteeCount: 1,  signedCount: 0, status: 'sent',        createdAt: '2026-04-25 14:00', updatedAt: '2026-04-25 14:00' },
  { id: '5', name: 'License renewal — GenCorp',     packId: 'PCK-H1J2-K3L4', folder: 'Legal',        invitees: ['Anil Verma'],                                            inviteeCount: 1,  signedCount: 0, status: 'expired',     createdAt: '2026-02-18 10:00', updatedAt: '2026-03-04 23:59' },
  { id: '6', name: 'Settlement — Ramesh & Co',      packId: 'PCK-X1Y2-Z3W4', folder: 'Litigation',   invitees: ['Ramesh', 'Naveen'],                                      inviteeCount: 2,  signedCount: 1, status: 'in-progress', createdAt: '2026-04-22 08:30', updatedAt: '2026-04-29 13:45' },
  { id: '7', name: 'Term sheet — VivaCorp Series B', packId: 'PCK-T5U6-V7W8', folder: 'Investments', irn: 'IRN-2026-0420', invitees: ['Vinod Joshi', 'Meera Pillai'],     inviteeCount: 12, signedCount: 7, status: 'in-progress', createdAt: '2026-04-20 16:10', updatedAt: '2026-04-29 10:00' },
  { id: '8', name: 'Service Agreement — TaxDeskPro', packId: 'PCK-S9D0-E1F2', folder: 'Vendors',      invitees: ['Anjali Bose'],                                          inviteeCount: 2,  signedCount: 0, status: 'sent',        createdAt: '2026-04-26 12:30', updatedAt: '2026-04-26 12:30' },
]

const FOLDER_OPTIONS = [
  { value: 'investments', label: 'Investments' },
  { value: 'legal',       label: 'Legal' },
  { value: 'vendors',     label: 'Vendors' },
  { value: 'hr',          label: 'HR' },
  { value: 'litigation',  label: 'Litigation' },
]

const WORKFLOW_OPTIONS = [
  { value: 'safe',         label: 'SAFE — Series A' },
  { value: 'nda',          label: 'NDA — Standard' },
  { value: 'msa',          label: 'MSA — Vendor' },
  { value: 'employment',   label: 'Employment offer' },
  { value: 'license',      label: 'License renewal' },
  { value: 'settlement',   label: 'Settlement' },
  { value: 'term-sheet',   label: 'Term sheet' },
  { value: 'service',      label: 'Service Agreement' },
]

const INVITEE_OPTIONS = [
  { value: 'priya',  label: 'Priya Shankar' },
  { value: 'rohan',  label: 'Rohan Mehta' },
  { value: 'kart',   label: 'Karthik Iyer' },
  { value: 'anita',  label: 'Anita Narayanan' },
  { value: 'sameer', label: 'Sameer Khan' },
  { value: 'diya',   label: 'Diya Raman' },
  { value: 'anil',   label: 'Anil Verma' },
]

const CREATED_BY_OPTIONS = [
  { value: 'me',     label: 'Me (Ritik)' },
  { value: 'priya',  label: 'Priya Shankar' },
  { value: 'rohan',  label: 'Rohan Mehta' },
  { value: 'sameer', label: 'Sameer Khan' },
]

type SortKey = 'name' | 'createdAt' | 'updatedAt'
type ColKey = 'packId' | 'folder' | 'irn' | 'progress' | 'createdAt' | 'updatedAt'
type TopTab = 'dashboard' | 'documents' | 'workflows' | 'wallet' | 'settings'
type DocSubPage = 'sent' | 'received' | 'processing' | 'cc' | 'drafts' | 'completed' | 'expired'

interface SentPageProps {
  onNavigate?: (screen: 'screen-details') => void
}

export function SentPage({ onNavigate }: SentPageProps = {}) {
  const [topTab] = useState<TopTab>('documents')
  const [subPage, setSubPage] = useState<DocSubPage>('sent')
  const [search, setSearch] = useState('')
  const [folders, setFolders] = useState<string[]>([])
  const [workflows, setWorkflows] = useState<string[]>([])
  const [invitees, setInvitees] = useState<string[]>([])
  const [createdBy, setCreatedBy] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [visibleCols, setVisibleCols] = useState<Set<ColKey>>(new Set(['packId', 'folder', 'progress', 'createdAt', 'updatedAt']))

  const filtered = useMemo(() => {
    let list = PACKS
    // Sub-page filter (left nav)
    if (subPage === 'drafts')         list = list.filter(p => p.status === 'draft')
    else if (subPage === 'completed') list = list.filter(p => p.status === 'completed')
    else if (subPage === 'expired')   list = list.filter(p => p.status === 'expired')
    else if (subPage === 'sent')      list = list.filter(p => p.status !== 'draft' && p.status !== 'completed' && p.status !== 'expired')
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
      || p.packId.toLowerCase().includes(search.toLowerCase())
    )
    if (folders.length > 0) {
      const folderLabels = folders.map(f => FOLDER_OPTIONS.find(o => o.value === f)?.label).filter(Boolean) as string[]
      list = list.filter(p => p.folder && folderLabels.includes(p.folder))
    }
    list = [...list].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return list
  }, [subPage, search, folders, sortKey, sortDir])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }
  const allSelected = filtered.length > 0 && selected.size === filtered.length
  const someSelected = selected.size > 0 && !allSelected
  const toggleAll = (v: boolean | 'indeterminate') => {
    if (v === true) setSelected(new Set(filtered.map(d => d.id)))
    else setSelected(new Set())
  }
  const toggleOne = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelected(next)
  }
  const toggleCol = (key: ColKey) => {
    const next = new Set(visibleCols)
    if (next.has(key)) next.delete(key); else next.add(key)
    setVisibleCols(next)
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Top nav — logo + horizontal tabs + actions */}
        <header className="sticky top-0 z-30 border-b border-border bg-background">
          <div className="h-14 px-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-8 shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary" />
                <span className="font-semibold tracking-tight text-md">tenacity</span>
              </div>
              {/* Horizontal top tabs */}
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

        <div className="flex">
          {/* Left nav — Documents sub-pages */}
          <LeftNav>
            <LeftNavSection label="Documents">
              <LeftNavItem icon={<Send />} active={subPage === 'sent'} onClick={() => setSubPage('sent')}>Sent</LeftNavItem>
              <LeftNavItem icon={<ArrowDownLeft />} active={subPage === 'received'} onClick={() => setSubPage('received')} trailing={<Badge tone="primary" variant="solid">3</Badge>}>Received</LeftNavItem>
              <LeftNavItem icon={<Loader />} active={subPage === 'processing'} onClick={() => setSubPage('processing')}>Processing</LeftNavItem>
              <LeftNavItem icon={<Inbox />} active={subPage === 'cc'} onClick={() => setSubPage('cc')}>CC</LeftNavItem>
              <LeftNavItem icon={<FolderOpen />} active={subPage === 'drafts'} onClick={() => setSubPage('drafts')}>Drafts</LeftNavItem>
              <LeftNavItem icon={<CheckCircle />} active={subPage === 'completed'} onClick={() => setSubPage('completed')}>Completed</LeftNavItem>
              <LeftNavItem icon={<Clock />} active={subPage === 'expired'} onClick={() => setSubPage('expired')}>Expired</LeftNavItem>
            </LeftNavSection>

            <LeftNavSection label="Quick access">
              <LeftNavItem icon={<AlertTriangle />}>Action required</LeftNavItem>
              <LeftNavItem icon={<Activity />}>Waiting for others</LeftNavItem>
              <LeftNavItem icon={<Clock />}>Expiring soon</LeftNavItem>
              <LeftNavItem icon={<AlertTriangle />}>Failed</LeftNavItem>
              <LeftNavItem icon={<XCircle />}>Rejected</LeftNavItem>
            </LeftNavSection>
          </LeftNav>

          {/* Main */}
          <main className="flex-1 min-w-0 px-10 py-8">
            {/* Page header: title on left, search on right */}
            <div className="flex items-start justify-between gap-6 mb-6">
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight">Sent documents</h1>
              </div>
              <div className="relative w-80 shrink-0 mt-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input placeholder="Search by pack name or ID…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
            </div>

            {/* Toolbar — date range on LEFT, filters on RIGHT (dashboard pattern) */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="md">Date range</Button>
              </div>
              <div className="flex items-center gap-2">
                {selected.size > 0 && (
                  <>
                    <span className="text-base text-foreground font-medium mr-1">{selected.size} selected</span>
                    <Button size="xs" variant="secondary"><Download className="h-3.5 w-3.5" />Download</Button>
                    <Button size="xs" variant="secondary"><FolderPlus className="h-3.5 w-3.5" />Move to folder</Button>
                    <Button size="xs" variant="secondary"><Trash2 className="h-3.5 w-3.5" />Delete</Button>
                    <div className="w-px h-5 bg-border mx-1" />
                  </>
                )}
                <MultiSelect label="Workflow" options={WORKFLOW_OPTIONS} value={workflows} onChange={setWorkflows} />
                <MultiSelect label="Folder" options={FOLDER_OPTIONS} value={folders} onChange={setFolders} />
                <MultiSelect label="Invitee" options={INVITEE_OPTIONS} value={invitees} onChange={setInvitees} />
                <MultiSelect label="Created by" options={CREATED_BY_OPTIONS} value={createdBy} onChange={setCreatedBy} />
                {(search || folders.length > 0 || workflows.length > 0 || invitees.length > 0 || createdBy.length > 0) && (
                  <Button variant="link-secondary" onClick={() => {
                    setSearch(''); setFolders([]); setWorkflows([]); setInvitees([]); setCreatedBy([])
                  }}>
                    Clear all
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
                {/* Edge-to-edge table */}
                <div className="-mx-10 border-y border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px] pl-10">
                          <Checkbox checked={allSelected ? true : someSelected ? 'indeterminate' : false} onCheckedChange={toggleAll} />
                        </TableHead>
                        <TableHead sortable sortDir={sortKey === 'name' ? sortDir : undefined} onSort={() => toggleSort('name')}>
                          Pack name
                        </TableHead>
                        {visibleCols.has('packId') && <TableHead>Pack ID</TableHead>}
                        {visibleCols.has('folder') && <TableHead>Folder</TableHead>}
                        {visibleCols.has('irn') && <TableHead>IRN</TableHead>}
                        {visibleCols.has('progress') && <TableHead className="w-[200px]">Progress</TableHead>}
                        {visibleCols.has('createdAt') && (
                          <TableHead sortable sortDir={sortKey === 'createdAt' ? sortDir : undefined} onSort={() => toggleSort('createdAt')}>
                            Created
                          </TableHead>
                        )}
                        {visibleCols.has('updatedAt') && (
                          <TableHead sortable sortDir={sortKey === 'updatedAt' ? sortDir : undefined} onSort={() => toggleSort('updatedAt')}>
                            Last updated
                          </TableHead>
                        )}
                        <TableHead className="w-[140px] pr-10" align="right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                aria-label="Column settings"
                                className="inline-flex items-center justify-center h-7 w-7 rounded-sm hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <Settings2 className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="min-w-[12rem]">
                              <DropdownMenuLabel>Show columns</DropdownMenuLabel>
                              <DropdownMenuCheckboxItem checked={visibleCols.has('packId')} onCheckedChange={() => toggleCol('packId')}>Pack ID</DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem checked={visibleCols.has('folder')} onCheckedChange={() => toggleCol('folder')}>Folder</DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem checked={visibleCols.has('irn')} onCheckedChange={() => toggleCol('irn')}>IRN</DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem checked={visibleCols.has('progress')} onCheckedChange={() => toggleCol('progress')}>Progress</DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem checked={visibleCols.has('createdAt')} onCheckedChange={() => toggleCol('createdAt')}>Created</DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem checked={visibleCols.has('updatedAt')} onCheckedChange={() => toggleCol('updatedAt')}>Last updated</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={10} className="text-center py-12 text-base text-muted-foreground">
                            No packs match your filters. Try clearing them.
                          </TableCell>
                        </TableRow>
                      ) : filtered.map(pack => {
                        const progressTone = pack.status === 'rejected' || pack.status === 'failed' ? 'danger'
                          : pack.status === 'expired' ? 'warning'
                          : pack.status === 'completed' ? 'success'
                          : 'primary'
                        return (
                          <TableRow key={pack.id} selected={selected.has(pack.id)}>
                            <TableCell compact className="pl-10">
                              <Checkbox checked={selected.has(pack.id)} onCheckedChange={() => toggleOne(pack.id)} />
                            </TableCell>
                            <TableCell>
                              <div className="min-w-0">
                                <button
                                  onClick={() => onNavigate?.('screen-details')}
                                  className="font-medium truncate text-left hover:underline hover:text-primary transition-colors block max-w-full"
                                >
                                  {pack.name}
                                </button>
                                <div className="text-xs text-muted-foreground truncate">
                                  {pack.invitees.length === 0 ? 'No invitees' : `Invitee: ${pack.invitees[0]}${pack.inviteeCount > 1 ? ` +${pack.inviteeCount - 1} more` : ''}`}
                                </div>
                              </div>
                            </TableCell>
                            {visibleCols.has('packId') && (
                              <TableCell>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-xs font-medium tabular-nums text-subtle-foreground">{pack.packId}</span>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="xs"
                                        className="opacity-0 group-hover:opacity-100"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          navigator.clipboard?.writeText(pack.packId).catch(() => {})
                                          toast({ tone: 'success', title: 'Pack ID copied', description: pack.packId })
                                        }}
                                      >
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Copy ID</TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            )}
                            {visibleCols.has('folder') && (
                              <TableCell>
                                {pack.folder ? <Badge tone="neutral" variant="outline">{pack.folder}</Badge> : <span className="text-muted-foreground">—</span>}
                              </TableCell>
                            )}
                            {visibleCols.has('irn') && (
                              <TableCell>
                                {pack.irn ? <span className="font-mono text-xs font-medium tabular-nums text-subtle-foreground">{pack.irn}</span> : <span className="text-muted-foreground">—</span>}
                              </TableCell>
                            )}
                            {visibleCols.has('progress') && (
                              <TableCell>
                                <ProgressCell pack={pack} tone={progressTone} />
                              </TableCell>
                            )}
                            {visibleCols.has('createdAt') && (
                              <TableCell>
                                <span className="text-xs font-medium tabular-nums text-subtle-foreground whitespace-nowrap">{pack.createdAt}</span>
                              </TableCell>
                            )}
                            {visibleCols.has('updatedAt') && (
                              <TableCell>
                                <span className="text-xs font-medium tabular-nums text-subtle-foreground whitespace-nowrap">{pack.updatedAt}</span>
                              </TableCell>
                            )}
                            <TableCell compact align="right" className="pr-10">
                              <div className="flex items-center justify-end gap-1">
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="xs"><Eye className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Preview</TooltipContent></Tooltip>
                                  <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="xs"><Download className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Download</TooltipContent></Tooltip>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="xs"><MoreVertical className="h-4 w-4" /></Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem><Info className="h-4 w-4" />Details</DropdownMenuItem>
                                    <DropdownMenuItem><Eye className="h-4 w-4" />Preview</DropdownMenuItem>
                                    <DropdownMenuItem><Download className="h-4 w-4" />Download documents</DropdownMenuItem>
                                    {pack.status === 'completed' && (
                                      <DropdownMenuItem><Share2 className="h-4 w-4" />Share</DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem><FolderPlus className="h-4 w-4" />Move to folder</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem destructive><Trash2 className="h-4 w-4" />Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-muted-foreground tabular-nums">Showing 1–{filtered.length} of {filtered.length}</div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="xs" disabled>Previous</Button>
                    <Button variant="secondary" size="xs" disabled>Next</Button>
                  </div>
                </div>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}

/*
  ProgressCell — pack progress indicator for the table.

  Top:    "X/Y" count + status label inline ("In progress" / "Rejected" / "Failed" / "Expired" / "Completed")
  Bar:    success-green when in motion or done, danger when rejected/failed, warning for expired.
          Width is signed/total ratio.
  Tooltip: when status is rejected/failed/expired, shows reason details on hover.
*/
function ProgressCell({ pack, tone }: { pack: Pack; tone: 'primary' | 'success' | 'warning' | 'danger' }) {
  const isProblem = pack.status === 'rejected' || pack.status === 'failed' || pack.status === 'expired'
  // Use success green by default for healthy progress (he asked for green when no errors)
  const barTone = isProblem ? tone : 'success'

  const statusLabel = {
    'in-progress': 'In progress',
    'sent':        'In progress',
    'completed':   'Completed',
    'rejected':    'Rejected',
    'failed':      'Failed',
    'expired':     'Expired',
    'draft':       'Draft',
  }[pack.status]

  const statusToneClass = {
    'in-progress': 'text-subtle-foreground',
    'sent':        'text-subtle-foreground',
    'completed':   'text-success',
    'rejected':    'text-danger',
    'failed':      'text-danger',
    'expired':     'text-warning',
    'draft':       'text-muted-foreground',
  }[pack.status]

  const tooltipMessage = pack.status === 'rejected'
    ? `${pack.invitees[0] || 'An invitee'} rejected the document. Reason: clauses 3.1 and 7 need legal review.`
    : pack.status === 'failed'
    ? 'One or more signatures failed to verify. Review the audit trail for details.'
    : pack.status === 'expired'
    ? `Expired before all invitees signed. ${pack.signedCount} of ${pack.inviteeCount} signed before expiry.`
    : null

  const content = (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium tabular-nums text-foreground whitespace-nowrap">
          {pack.signedCount}/{pack.inviteeCount}
        </span>
        <span className={cn('text-xs font-medium whitespace-nowrap inline-flex items-center gap-1', statusToneClass)}>
          {statusLabel}
          {tooltipMessage && <AlertCircle className="h-3 w-3 shrink-0" />}
        </span>
      </div>
      <Progress value={pack.inviteeCount > 0 ? (pack.signedCount / pack.inviteeCount) * 100 : 0} tone={barTone} className="h-1.5" />
    </div>
  )

  if (tooltipMessage) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help">{content}</div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">{tooltipMessage}</TooltipContent>
      </Tooltip>
    )
  }
  return content
}
