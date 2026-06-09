import { useState, useMemo } from 'react'
import { MoreVertical, Trash2, Eye, Send, Copy, FileText, FileSignature, Settings2, Download } from 'lucide-react'
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table'
import { Avatar } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DocumentStatus } from '@/components/patterns/document-status'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

interface Doc {
  id: string
  name: string
  fileType: 'pdf' | 'safe'
  invitees: string[]
  inviteeCount: number
  status: 'sent' | 'completed' | 'rejected' | 'in-progress' | 'draft' | 'expired' | 'failed'
  amount: number
  updatedAt: string
}

const DOCS: Doc[] = [
  { id: '1', name: 'Series A SAFE — Acme Inc.',     fileType: 'safe', invitees: ['Priya Shankar', 'Rohan Mehta'],  inviteeCount: 8, status: 'in-progress', amount: 1500000, updatedAt: '2026-04-29' },
  { id: '2', name: 'NDA — TopCo Capital',           fileType: 'pdf',  invitees: ['Karthik Iyer'],                  inviteeCount: 1, status: 'completed',   amount: 0,       updatedAt: '2026-04-27' },
  { id: '3', name: 'Vendor MSA — Q2 batch',         fileType: 'pdf',  invitees: ['Anita Narayanan', 'Sameer Khan'],inviteeCount: 4, status: 'rejected',    amount: 250000,  updatedAt: '2026-03-28' },
  { id: '4', name: 'Employment offer — Diya R.',    fileType: 'pdf',  invitees: ['Diya Raman'],                    inviteeCount: 1, status: 'sent',        amount: 0,       updatedAt: '2026-03-25' },
  { id: '5', name: 'Settlement — Ramesh & Co',      fileType: 'pdf',  invitees: [],                                inviteeCount: 0, status: 'draft',       amount: 0,       updatedAt: '2026-03-20' },
  { id: '6', name: 'License renewal — GenCorp',     fileType: 'pdf',  invitees: ['Anil Verma'],                    inviteeCount: 1, status: 'expired',     amount: 50000,   updatedAt: '2026-02-18' },
]

type SortKey = 'name' | 'updatedAt' | 'amount'
type ColKey = 'invitees' | 'status' | 'amount' | 'updatedAt'

export function TableStory() {
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [visibleCols, setVisibleCols] = useState<Set<ColKey>>(new Set(['invitees', 'status', 'amount', 'updatedAt']))

  const sorted = useMemo(() => {
    const list = [...DOCS]
    list.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return list
  }, [sortKey, sortDir])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const allSelected = selected.size === sorted.length
  const someSelected = selected.size > 0 && !allSelected

  const toggleAll = (v: boolean | 'indeterminate') => {
    if (v === true) setSelected(new Set(sorted.map(d => d.id)))
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
      <div className="space-y-10 max-w-6xl">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Table</h2>
          <p className="text-base text-subtle-foreground mt-1">
            Full-bleed, open + ruled. Cells are mono data by default; human text opts out via the <code className="font-mono text-xs">prose</code> prop. Status columns use StatusMark, never badges. Supports hover-only actions, column selector, sorting, selection.
          </p>
        </div>

        <Section label="Documents — full feature stress test">
          {/* Toolbar above table: column selector, bulk actions when selected */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-base text-subtle-foreground">
              {sorted.length} documents
              {selected.size > 0 && <span className="ml-2 text-foreground font-medium">· {selected.size} selected</span>}
            </div>
            <div className="flex items-center gap-2">
              {selected.size > 0 && (
                <>
                  <Button size="xs" variant="secondary"><Send className="h-3.5 w-3.5" />Resend</Button>
                  <Button size="xs" variant="secondary"><Trash2 className="h-3.5 w-3.5" />Delete</Button>
                </>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="xs" variant="secondary"><Settings2 className="h-3.5 w-3.5" />Columns</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[12rem]">
                  <DropdownMenuLabel>Show columns</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem checked={visibleCols.has('invitees')} onCheckedChange={() => toggleCol('invitees')}>Invitees</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={visibleCols.has('status')} onCheckedChange={() => toggleCol('status')}>Status</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={visibleCols.has('amount')} onCheckedChange={() => toggleCol('amount')}>Amount</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={visibleCols.has('updatedAt')} onCheckedChange={() => toggleCol('updatedAt')}>Updated</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Full-bleed: no Card, no outer border — rules carry the structure (Hard Rule #3) */}
          <div className="border-y border-rule">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[44px]">
                    <Checkbox checked={allSelected ? true : someSelected ? 'indeterminate' : false} onCheckedChange={toggleAll} />
                  </TableHead>
                  <TableHead sortable sortDir={sortKey === 'name' ? sortDir : undefined} onSort={() => toggleSort('name')}>
                    Document
                  </TableHead>
                  {visibleCols.has('invitees') && <TableHead>Invitees</TableHead>}
                  {visibleCols.has('status') && <TableHead>Status</TableHead>}
                  {visibleCols.has('amount') && (
                    <TableHead align="right" sortable sortDir={sortKey === 'amount' ? sortDir : undefined} onSort={() => toggleSort('amount')}>
                      Amount
                    </TableHead>
                  )}
                  {visibleCols.has('updatedAt') && (
                    <TableHead sortable sortDir={sortKey === 'updatedAt' ? sortDir : undefined} onSort={() => toggleSort('updatedAt')}>
                      Updated
                    </TableHead>
                  )}
                  <TableHead className="w-[120px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map(doc => {
                  const Icon = doc.fileType === 'safe' ? FileSignature : FileText
                  const inviteeText = doc.invitees.length === 0 ? 'No invitees' : doc.invitees.join(', ') + (doc.inviteeCount > doc.invitees.length ? `, +${doc.inviteeCount - doc.invitees.length}` : '')
                  return (
                    <TableRow key={doc.id} selected={selected.has(doc.id)}>
                      <TableCell compact>
                        <Checkbox checked={selected.has(doc.id)} onCheckedChange={() => toggleOne(doc.id)} />
                      </TableCell>
                      {/* Human text — opts out of the mono cell default */}
                      <TableCell prose>
                        <div className="flex items-center gap-3">
                          <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-sm bg-muted text-muted-foreground">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{doc.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{inviteeText}</div>
                          </div>
                        </div>
                      </TableCell>
                      {visibleCols.has('invitees') && (
                        <TableCell>
                          {doc.invitees.length === 0 ? (
                            <span className="text-xs text-muted-foreground">—</span>
                          ) : (
                            <div className="flex items-center -space-x-2">
                              {doc.invitees.slice(0, 3).map((name, i) => (
                                <Tooltip key={i}>
                                  <TooltipTrigger asChild>
                                    <div className="ring-2 ring-background rounded-full">
                                      <Avatar size="sm" initials={name.split(' ').map(s => s[0]).join('')} />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>{name}</TooltipContent>
                                </Tooltip>
                              ))}
                              {doc.inviteeCount > 3 && (
                                <div className="ring-2 ring-background rounded-full">
                                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-semibold text-subtle-foreground tabular-nums">
                                    +{doc.inviteeCount - 3}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </TableCell>
                      )}
                      {visibleCols.has('status') && (
                        <TableCell>
                          <DocumentStatus status={doc.status} />
                        </TableCell>
                      )}
                      {visibleCols.has('amount') && (
                        <TableCell align="right">
                          <span className="font-mono tabular-nums">
                            {doc.amount === 0 ? '—' : `₹ ${doc.amount.toLocaleString('en-IN')}`}
                          </span>
                        </TableCell>
                      )}
                      {visibleCols.has('updatedAt') && (
                        <TableCell>
                          <span className="text-xs text-muted-foreground tabular-nums">{doc.updatedAt}</span>
                        </TableCell>
                      )}
                      <TableCell compact align="right">
                        {/* Hover-only action buttons + always-visible 3-dot menu */}
                        <div className="flex items-center justify-end gap-1">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="xs"><Eye className="h-4 w-4" /></Button>
                              </TooltipTrigger>
                              <TooltipContent>View</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="xs"><Download className="h-4 w-4" /></Button>
                              </TooltipTrigger>
                              <TooltipContent>Download</TooltipContent>
                            </Tooltip>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="xs"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><Eye className="h-4 w-4" />View</DropdownMenuItem>
                              <DropdownMenuItem><Send className="h-4 w-4" />Resend</DropdownMenuItem>
                              <DropdownMenuItem><Copy className="h-4 w-4" />Duplicate</DropdownMenuItem>
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
        </Section>

        <Section label="Edge-to-edge variant — maximize horizontal space">
          <p className="text-xs text-subtle-foreground -mt-1 mb-2">
            No Card wrapper. Table spans the full main content width. First/last cells get extra horizontal padding so content aligns with the page's natural edge. Common pattern for dense legal/document tables where every pixel of width matters.
          </p>
          {/* The -mx-10 escapes the main's horizontal padding (px-10).
              First cell adds pl-10 and last adds pr-10 so content alignment is preserved. */}
          <div className="-mx-10 border-y border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] pl-10">
                    <Checkbox
                      checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead sortable sortDir={sortKey === 'name' ? sortDir : undefined} onSort={() => toggleSort('name')}>
                    Document
                  </TableHead>
                  <TableHead>Invitees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead align="right" sortable sortDir={sortKey === 'amount' ? sortDir : undefined} onSort={() => toggleSort('amount')}>
                    Amount
                  </TableHead>
                  <TableHead sortable sortDir={sortKey === 'updatedAt' ? sortDir : undefined} onSort={() => toggleSort('updatedAt')}>
                    Updated
                  </TableHead>
                  <TableHead className="w-[140px] pr-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map(doc => {
                  const Icon = doc.fileType === 'safe' ? FileSignature : FileText
                  const inviteeText = doc.invitees.length === 0 ? 'No invitees' : doc.invitees.join(', ') + (doc.inviteeCount > doc.invitees.length ? `, +${doc.inviteeCount - doc.invitees.length}` : '')
                  return (
                    <TableRow key={doc.id} selected={selected.has(doc.id)}>
                      <TableCell compact className="pl-10">
                        <Checkbox checked={selected.has(doc.id)} onCheckedChange={() => toggleOne(doc.id)} />
                      </TableCell>
                      {/* Human text — opts out of the mono cell default */}
                      <TableCell prose>
                        <div className="flex items-center gap-3">
                          <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-sm bg-muted text-muted-foreground">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{doc.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{inviteeText}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {doc.invitees.length === 0 ? (
                          <span className="text-xs text-muted-foreground">—</span>
                        ) : (
                          <div className="flex items-center -space-x-2">
                            {doc.invitees.slice(0, 3).map((name, i) => (
                              <Tooltip key={i}>
                                <TooltipTrigger asChild>
                                  <div className="ring-2 ring-background rounded-full">
                                    <Avatar size="sm" initials={name.split(' ').map(s => s[0]).join('')} />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>{name}</TooltipContent>
                              </Tooltip>
                            ))}
                            {doc.inviteeCount > 3 && (
                              <div className="ring-2 ring-background rounded-full">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-semibold text-subtle-foreground tabular-nums">
                                  +{doc.inviteeCount - 3}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell><DocumentStatus status={doc.status} /></TableCell>
                      <TableCell align="right">
                        <span className="font-mono tabular-nums">
                          {doc.amount === 0 ? '—' : `₹ ${doc.amount.toLocaleString('en-IN')}`}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground tabular-nums">{doc.updatedAt}</span>
                      </TableCell>
                      <TableCell compact align="right" className="pr-10">
                        <div className="flex items-center justify-end gap-1">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="xs"><Eye className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>View</TooltipContent></Tooltip>
                            <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="xs"><Download className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Download</TooltipContent></Tooltip>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="xs"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><Eye className="h-4 w-4" />View</DropdownMenuItem>
                              <DropdownMenuItem><Send className="h-4 w-4" />Resend</DropdownMenuItem>
                              <DropdownMenuItem><Copy className="h-4 w-4" />Duplicate</DropdownMenuItem>
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
        </Section>

        <Section label="What's new in this demo">
          <div className="text-base text-subtle-foreground space-y-2">
            <p>• <strong className="text-foreground">Supporting text</strong> — Document column has primary line + secondary muted line below (invitee summary). Common for dense info displays.</p>
            <p>• <strong className="text-foreground">File type icon</strong> — small muted square with file icon prefixes the name. Different icon for SAFE vs PDF.</p>
            <p>• <strong className="text-foreground">Stacked avatars with overflow</strong> — Invitees column shows up to 3 avatars + a "+N" counter, each avatar tooltip-labeled with the name.</p>
            <p>• <strong className="text-foreground">Hover-only actions</strong> — View / Download buttons appear only when you hover a row. Reduces visual noise; the 3-dot menu remains always-visible as the canonical "more" entry point.</p>
            <p>• <strong className="text-foreground">Column selector</strong> — Top-right "Columns" dropdown lets users hide columns. Uses DropdownMenuCheckboxItem with primary check indicator.</p>
            <p>• <strong className="text-foreground">Toolbar bulk actions</strong> — When rows are selected, action buttons appear in the toolbar (above the table) instead of a separate banner. Cleaner.</p>
          </div>
        </Section>
      </div>
    </TooltipProvider>
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
