import { useState } from 'react'
import { Type, MousePointerClick, Square, BadgeCheck, Layers, LayoutGrid, FileSignature, CheckSquare, Circle, ToggleLeft, ChevronDown, FolderTree, User, Bell, MessageSquare, Loader2, Inbox, MessageCircle, GitCommit, MoreVertical, PanelRight, Table as TableIcon, Monitor, MessageCircleMore, BarChart3 } from 'lucide-react'
import { TypefacePicker } from '@/components/ui/typeface-picker'
import { PrimaryPicker } from '@/components/ui/primary-picker'
import { RadiusPicker } from '@/components/ui/radius-picker'
import { TopNav, TopNavBrand, TopNavActions } from '@/components/ui/top-nav'
import { cn } from '@/lib/cn'

import { TypographyStory } from '@/stories/typography'
import { ButtonsStory } from '@/stories/buttons'
import { InputsStory } from '@/stories/inputs'
import { BadgesStory } from '@/stories/badges'
import { CardsStory } from '@/stories/cards'
import { DocumentStatusStory } from '@/stories/document-status'
import { CheckboxStory } from '@/stories/checkbox'
import { RadioStory } from '@/stories/radio'
import { ToggleStory } from '@/stories/toggle'
import { SelectStory } from '@/stories/select'
import { TabsStory } from '@/stories/tabs'
import { AvatarStory } from '@/stories/avatar'
import { FeedbackStory } from '@/stories/feedback'
import { TooltipStory } from '@/stories/tooltip'
import { SkeletonStory } from '@/stories/skeleton'
import { EmptyStateStory } from '@/stories/empty-state'
import { ModalStory } from '@/stories/modal'
import { TimelineStory } from '@/stories/timeline'
import { DropdownMenuStory } from '@/stories/dropdown-menu'
import { DrawerStory } from '@/stories/drawer'
import { TableStory } from '@/stories/table'
import { DataDisplayStory } from '@/stories/data-display'
import { ChatStory } from '@/stories/chat'
import { MetricsStory } from '@/stories/metrics'
import { AllComponentsStory } from '@/stories/all'
import { QaConsoleScreen } from '@/stories/qa-console'
import { SentPage } from '@/screens/sent-page'
import { DetailsPage } from '@/screens/details-page'
import { Toaster } from '@/components/ui/toast'

type StoryId = 'all' | 'typography' | 'buttons' | 'inputs' | 'select' | 'tabs' | 'badges' | 'cards' | 'checkbox' | 'radio' | 'toggle' | 'avatar' | 'feedback' | 'tooltip' | 'skeleton' | 'modal' | 'drawer' | 'timeline' | 'menu' | 'table' | 'data-display' | 'document-status' | 'empty-state' | 'chat' | 'metrics' | 'screen-qa' | 'screen-sent' | 'screen-details'

const NAV: { group: string; items: { id: StoryId; label: string; icon: typeof Type }[] }[] = [
  {
    group: 'Overview',
    items: [
      { id: 'all', label: 'All components', icon: LayoutGrid },
    ],
  },
  {
    group: 'Foundation',
    items: [
      { id: 'typography', label: 'Typography', icon: Type },
    ],
  },
  {
    group: 'Primitives',
    items: [
      { id: 'buttons',  label: 'Buttons',  icon: MousePointerClick },
      { id: 'inputs',   label: 'Inputs',   icon: Square },
      { id: 'select',   label: 'Select',   icon: ChevronDown },
      { id: 'checkbox', label: 'Checkbox', icon: CheckSquare },
      { id: 'radio',    label: 'Radio',    icon: Circle },
      { id: 'toggle',   label: 'Toggle',   icon: ToggleLeft },
      { id: 'tabs',     label: 'Tabs',     icon: FolderTree },
      { id: 'avatar',   label: 'Avatar',   icon: User },
      { id: 'badges',   label: 'Badges',   icon: BadgeCheck },
      { id: 'cards',    label: 'Cards',    icon: Layers },
      { id: 'feedback', label: 'Feedback', icon: Bell },
      { id: 'tooltip',  label: 'Tooltip',  icon: MessageSquare },
      { id: 'skeleton', label: 'Skeleton', icon: Loader2 },
      { id: 'modal',    label: 'Modal',    icon: MessageCircle },
      { id: 'drawer',   label: 'Drawer',   icon: PanelRight },
      { id: 'timeline', label: 'Timeline', icon: GitCommit },
      { id: 'menu',         label: 'Menu',         icon: MoreVertical },
      { id: 'table',        label: 'Table',        icon: TableIcon },
      { id: 'data-display', label: 'Data display', icon: BarChart3 },
    ],
  },
  {
    group: 'Patterns',
    items: [
      { id: 'document-status', label: 'DocumentStatus', icon: FileSignature },
      { id: 'empty-state',     label: 'EmptyState',     icon: Inbox },
    ],
  },
  {
    group: 'Chat & Data',
    items: [
      { id: 'chat',    label: 'Chat',    icon: MessageCircleMore },
      { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    ],
  },
  {
    group: 'Screens',
    items: [
      { id: 'screen-qa',      label: 'QA Console (ref)',  icon: Monitor },
      { id: 'screen-sent',    label: 'Sent (Documents)',  icon: Monitor },
      { id: 'screen-details', label: 'Document detail',   icon: Monitor },
    ],
  },
]

function App() {
  const [active, setActive] = useState<StoryId>('all')

  // Full-page screens render without storybook chrome.
  // A small fixed button in the corner returns to the storybook.
  if (active.startsWith('screen-')) {
    return (
      <>
        <div className="relative">
          {active === 'screen-qa'      && <QaConsoleScreen />}
          {active === 'screen-sent'    && <SentPage onNavigate={() => setActive('screen-details')} />}
          {active === 'screen-details' && <DetailsPage />}
          <button
            onClick={() => setActive('inputs')}
            className="fixed bottom-4 left-4 z-[60] flex items-center gap-1.5 px-3 h-8 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary-hover active:translate-y-[1px] transition-colors duration-micro"
          >
            ← Back to storybook
          </button>
        </div>
        <Toaster />
      </>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-background text-foreground">
      {/* Chrome — the housing. Storybook identity lives here. */}
      <TopNav>
        <TopNavBrand>tenacity</TopNavBrand>
        <span className="font-mono text-xs text-chrome-muted tracking-wider">INSTRUMENT · V2</span>
        <TopNavActions>
          <span className="font-mono text-xs text-chrome-muted hidden md:inline">graphite / geist+jbmono / 2px</span>
        </TopNavActions>
      </TopNav>

      {/* Bench — exploration tools. Deleted when decisions lock (Hard Rule #12). */}
      <div className="sticky top-12 z-20 h-10 px-4 flex items-center gap-2 bg-background border-b border-rule">
        <span className="text-xs uppercase tracking-wider font-semibold text-subtle-foreground mr-2">Bench</span>
        <PrimaryPicker />
        <TypefacePicker />
        <RadiusPicker />
      </div>

      <div className="flex">
        {/* Sidebar — sticky beneath chrome + bench */}
        <nav className="w-56 shrink-0 sticky top-[88px] self-start h-[calc(100vh-88px)] border-r border-rule overflow-y-auto py-5 px-3">
          <div className="space-y-5">
            {NAV.map(group => (
              <div key={group.group} className="space-y-1">
                <div className="px-2 text-xs uppercase tracking-wider text-subtle-foreground font-semibold">{group.group}</div>
                <div className="space-y-0.5">
                  {group.items.map(item => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={cn(
                          'w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-base transition-colors duration-micro text-left',
                          active === item.id
                            ? 'text-foreground font-semibold shadow-[inset_4px_0_0_0_hsl(var(--primary))]'
                            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                        )}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 px-2 pt-5 border-t border-rule">
            <div className="font-mono text-xs text-muted-foreground">tenacity · v2</div>
            <p className="text-xs text-muted-foreground mt-1">Personal system. The housing is dark; the screen is lit.</p>
          </div>
        </nav>

        {/* Main */}
        <main className="flex-1 px-10 py-8 min-w-0">
          {active === 'all'             && <AllComponentsStory />}
          {active === 'typography'      && <TypographyStory />}
          {active === 'buttons'         && <ButtonsStory />}
          {active === 'inputs'          && <InputsStory />}
          {active === 'select'          && <SelectStory />}
          {active === 'checkbox'        && <CheckboxStory />}
          {active === 'radio'           && <RadioStory />}
          {active === 'toggle'          && <ToggleStory />}
          {active === 'tabs'            && <TabsStory />}
          {active === 'avatar'          && <AvatarStory />}
          {active === 'badges'          && <BadgesStory />}
          {active === 'cards'           && <CardsStory />}
          {active === 'feedback'        && <FeedbackStory />}
          {active === 'tooltip'         && <TooltipStory />}
          {active === 'skeleton'        && <SkeletonStory />}
          {active === 'modal'           && <ModalStory />}
          {active === 'drawer'          && <DrawerStory />}
          {active === 'timeline'        && <TimelineStory />}
          {active === 'menu'            && <DropdownMenuStory />}
          {active === 'table'           && <TableStory />}
          {active === 'data-display'    && <DataDisplayStory />}
          {active === 'document-status' && <DocumentStatusStory />}
          {active === 'empty-state'     && <EmptyStateStory />}
          {active === 'chat'            && <ChatStory />}
          {active === 'metrics'         && <MetricsStory />}
        </main>
      </div>
    </div>
    <Toaster />
    </>
  )
}

export default App
