import { useState } from 'react'
import { Moon, Sun, Type, MousePointerClick, Square, BadgeCheck, Layers, FileSignature, Sparkles, CheckSquare, Circle, ToggleLeft, ChevronDown, FolderTree, User, Bell, MessageSquare, Loader2, Inbox, MessageCircle, GitCommit, MoreVertical, PanelRight, Table as TableIcon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TypefacePicker } from '@/components/ui/typeface-picker'
import { PrimaryPicker } from '@/components/ui/primary-picker'
import { RadiusPicker } from '@/components/ui/radius-picker'
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
import { SentPage } from '@/screens/sent-page'
import { DetailsPage } from '@/screens/details-page'
import { Toaster } from '@/components/ui/toast'

type StoryId = 'typography' | 'buttons' | 'inputs' | 'select' | 'tabs' | 'badges' | 'cards' | 'checkbox' | 'radio' | 'toggle' | 'avatar' | 'feedback' | 'tooltip' | 'skeleton' | 'modal' | 'drawer' | 'timeline' | 'menu' | 'table' | 'document-status' | 'empty-state' | 'screen-sent' | 'screen-details'

const NAV: { group: string; items: { id: StoryId; label: string; icon: typeof Type }[] }[] = [
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
      { id: 'menu',     label: 'Menu',     icon: MoreVertical },
      { id: 'table',    label: 'Table',    icon: TableIcon },
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
    group: 'Screens',
    items: [
      { id: 'screen-sent',    label: 'Sent (Documents)', icon: Monitor },
      { id: 'screen-details', label: 'Document detail',  icon: Monitor },
    ],
  },
]

function App() {
  const [dark, setDark] = useState(false)
  const [active, setActive] = useState<StoryId>('inputs')

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  // Full-page screens render without storybook chrome.
  // A small fixed badge in the top-right lets the user return to the storybook.
  if (active.startsWith('screen-')) {
    return (
      <>
        <div className="relative">
          {active === 'screen-sent'    && <SentPage onNavigate={(s) => setActive(s)} />}
          {active === 'screen-details' && <DetailsPage />}
          <button
            onClick={() => setActive('inputs')}
            className="fixed bottom-4 left-4 z-[60] flex items-center gap-1.5 px-3 h-8 rounded-md bg-foreground text-background text-xs font-medium shadow-lg hover:opacity-90 transition-opacity"
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
      {/* Header — sticky, all live tokens accessible while scrolling */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-6 w-6 rounded bg-primary" />
            <span className="font-semibold tracking-tight text-md">tenacity</span>
            <Badge tone="primary" className="ml-2">v0.1</Badge>
          </div>
          <div className="flex items-center gap-2">
            <PrimaryPicker />
            <TypefacePicker />
            <RadiusPicker />
            <div className="w-px h-5 bg-border mx-1" />
            <Button variant="ghost" size="sm" onClick={toggleDark}>
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden md:inline">{dark ? 'Light' : 'Dark'}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar — sticky, beneath the header */}
        <nav className="w-56 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] border-r border-border overflow-y-auto py-6 px-3">
          <div className="space-y-6">
            {NAV.map(group => (
              <div key={group.group} className="space-y-1">
                <div className="px-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">{group.group}</div>
                <div className="space-y-0.5">
                  {group.items.map(item => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={cn(
                          'w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm transition-colors text-left',
                          active === item.id
                            ? 'bg-muted text-foreground font-medium'
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

          <div className="mt-8 px-2 pt-6 border-t border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              <span>tenacity · v0.1</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Personal sandbox. Industrial-modernist + judicial gravitas.</p>
          </div>
        </nav>

        {/* Main */}
        <main className="flex-1 px-10 py-8 min-w-0">
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
          {active === 'document-status' && <DocumentStatusStory />}
          {active === 'empty-state'     && <EmptyStateStory />}
          {active === 'screen-sent'     && <SentPage />}
        </main>
      </div>
    </div>
    <Toaster />
    </>
  )
}

export default App
