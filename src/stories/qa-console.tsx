import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MetricCard, MetricRow } from '@/components/ui/metric-card'
import { Pagination } from '@/components/ui/pagination'
import { SearchInput } from '@/components/ui/search-input'
import { StatusBar, StatusBarDivider, StatusBarItem, StatusBarSpacer } from '@/components/ui/status-bar'
import { StatusMark } from '@/components/ui/status-mark'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  TopNav,
  TopNavActions,
  TopNavBrand,
  TopNavDivider,
  TopNavItem,
} from '@/components/ui/top-nav'

/*
  QA Console — the reference screen (CLAUDE.md → Workflow).
  A faithful re-render of the QA console in the v2 language.
  Judge any system change against this screen.

  What it demonstrates, deliberately:
  - chrome housing framing a light screen
  - open metric cluster (no boxes)
  - full-bleed ruled table at terminal density
  - StatusMark scarcity: a wall of green stays quiet, one red square jumps
  - ONE solid-primary button on the whole screen ("Run all")
  - evidence references as quiet mono, not bold colored links
*/

type CaseStatus = 'passed' | 'failed' | 'not-run'

const CASES: {
  status: CaseStatus
  id: string
  title: string
  desc: string
  suite: string
  module: string
  evidence: string | null
}[] = [
  {
    status: 'passed',
    id: 'HX-PRE-001',
    title: 'Harness points at an explicit deployed environment',
    desc: 'Checks that the harness target is named and points at deployed API URLs, not localhost backends.',
    suite: 'api-preflight',
    module: 'Harness Configuration',
    evidence: 'ui-api-preflight-all-2026-06-09T08-15-10-117Z',
  },
  {
    status: 'passed',
    id: 'HX-PRE-002',
    title: 'OAuth client can reach baseline admin states route',
    desc: 'Checks that OAuth works end-to-end by calling the simplest admin list route.',
    suite: 'api-preflight',
    module: 'OAuth',
    evidence: 'ui-api-preflight-all-2026-06-09T08-15-10-117Z',
  },
  {
    status: 'passed',
    id: 'HX-PRE-003',
    title: 'Implemented admin list surfaces from the plan are reachable',
    desc: 'Checks every current admin list/read surface that maps to the admin infra plan before deeper CRUD tests begin.',
    suite: 'api-preflight',
    module: 'Admin Read Surfaces',
    evidence: 'ui-api-preflight-all-2026-06-09T08-15-10-117Z',
  },
  {
    status: 'failed',
    id: 'HX-PRE-005',
    title: 'Rate diagnostic estimate route is reachable',
    desc: 'Checks the planned rate-estimate helper because it is separate from the list CRUD endpoint.',
    suite: 'api-preflight',
    module: 'Rate Estimate',
    evidence: 'ui-api-preflight-all-2026-06-09T11-42-03-551Z',
  },
  {
    status: 'passed',
    id: 'HX-MD-001',
    title: 'Cached vendor master data is reachable',
    desc: 'Checks that the cached vendor master data used by the test runner resolves regions and articles.',
    suite: 'master-data-v2',
    module: 'Master Data',
    evidence: 'master-data-v2-all-2026-06-09T16-44-21-008Z',
  },
  {
    status: 'passed',
    id: 'HX-MD-002',
    title: 'Master data required sections and core fields exist',
    desc: 'Checks each required master data section for presence and field shape before dependent suites run.',
    suite: 'master-data-v2',
    module: 'Master Data',
    evidence: 'master-data-v2-all-2026-06-09T16-44-21-008Z',
  },
  {
    status: 'not-run',
    id: 'HX-MD-003',
    title: 'Templates list and resolve per region',
    desc: 'Checks template resolution against the live master list for every configured region.',
    suite: 'master-data-v2',
    module: 'Templates',
    evidence: null,
  },
]

const statusTone: Record<CaseStatus, { tone: 'success' | 'danger' | 'neutral'; filled: boolean; label: string }> = {
  passed:    { tone: 'success', filled: true,  label: 'Passed' },
  failed:    { tone: 'danger',  filled: true,  label: 'Failed' },
  'not-run': { tone: 'neutral', filled: false, label: 'Not run' },
}

export function QaConsoleScreen() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav>
        <TopNavBrand>Tenacity QA</TopNavBrand>
        <TopNavItem active>Test Cases</TopNavItem>
        <TopNavItem>Runs</TopNavItem>
        <TopNavItem>Results</TopNavItem>
        <TopNavItem>Files</TopNavItem>
        <TopNavItem>Coverage</TopNavItem>
        <TopNavActions>
          <span className="font-mono text-xs text-chrome-muted">env: staging</span>
          <TopNavDivider />
          <span className="font-mono text-xs text-chrome-muted">2026-06-10</span>
        </TopNavActions>
      </TopNav>

      <main className="px-8 py-6">
        {/* Page header — roomy enough to breathe, then the data gets dense */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Master Test Case List</h1>
            <p className="text-base text-subtle-foreground mt-1">
              QA-readable status board generated from planned cases, automated suites, and latest harness reports.
            </p>
          </div>
          {/* The one solid-primary button on this screen */}
          <Button>Run all pending</Button>
        </div>

        {/* Open instrument cluster — no boxes (Hard Rule #3) */}
        <MetricRow className="mt-6">
          <MetricCard label="Total cases" value="306" />
          <MetricCard label="Passed" value="286" />
          <MetricCard label="Failed" value="17" tone="danger" />
          <MetricCard label="Not run" value="3" />
        </MetricRow>

        {/* Filter strip */}
        <div className="flex items-center gap-2 mt-6 mb-4">
          <SearchInput placeholder="case id, description, module" shortcut="⌘K" className="w-80" />
          <Button variant="secondary" size="md">Latest status: All</Button>
          <span className="ml-auto font-mono text-xs text-muted-foreground">7 of 306 shown</span>
        </div>

        {/* Full-bleed ruled table at terminal density */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-32">Case</TableHead>
              <TableHead>What this checks</TableHead>
              <TableHead className="w-48">Suite / Module</TableHead>
              <TableHead className="w-24">Risk</TableHead>
              <TableHead className="w-52">Latest evidence</TableHead>
              <TableHead className="w-28 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CASES.map((c) => {
              const s = statusTone[c.status]
              return (
                <TableRow key={c.id}>
                  <TableCell>
                    <StatusMark tone={s.tone} filled={s.filled}>{s.label}</StatusMark>
                  </TableCell>
                  <TableCell>{c.id}</TableCell>
                  <TableCell prose>
                    <div className="font-medium text-foreground">{c.title}</div>
                    <div className="text-xs text-subtle-foreground mt-0.5">{c.desc}</div>
                  </TableCell>
                  <TableCell prose>
                    <div className="font-mono text-xs font-medium">{c.suite}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.module}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Read-only</Badge>
                  </TableCell>
                  <TableCell>
                    {c.evidence ? (
                      <button
                        title={c.evidence}
                        className="font-mono text-xs font-medium text-subtle-foreground hover:text-foreground hover:underline underline-offset-2 text-left block w-full max-w-48 truncate"
                      >
                        {c.evidence}
                      </button>
                    ) : (
                      <span className="font-mono text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="link-secondary" size="sm">Details</Button>
                      <Button variant="secondary" size="sm">Run</Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Pagination from={1} to={7} total={306} />
      </main>

      {/* The housing's bottom edge — readouts only, never actions */}
      <StatusBar>
        <StatusBarItem label="passed">286/306</StatusBarItem>
        <StatusBarDivider />
        <StatusBarItem label="failed">17</StatusBarItem>
        <StatusBarDivider />
        <StatusBarItem label="last run">2026-06-09 16:44:21</StatusBarItem>
        <StatusBarSpacer />
        <StatusBarItem label="env">staging</StatusBarItem>
      </StatusBar>
    </div>
  )
}
