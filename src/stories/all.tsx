import { useEffect, type ReactNode } from 'react'

import { TypographyStory } from '@/stories/typography'
import { ButtonsStory } from '@/stories/buttons'
import { InputsStory } from '@/stories/inputs'
import { SelectStory } from '@/stories/select'
import { CheckboxStory } from '@/stories/checkbox'
import { RadioStory } from '@/stories/radio'
import { ToggleStory } from '@/stories/toggle'
import { TabsStory } from '@/stories/tabs'
import { AvatarStory } from '@/stories/avatar'
import { BadgesStory } from '@/stories/badges'
import { CardsStory } from '@/stories/cards'
import { FeedbackStory } from '@/stories/feedback'
import { TooltipStory } from '@/stories/tooltip'
import { SkeletonStory } from '@/stories/skeleton'
import { ModalStory } from '@/stories/modal'
import { DrawerStory } from '@/stories/drawer'
import { TimelineStory } from '@/stories/timeline'
import { DropdownMenuStory } from '@/stories/dropdown-menu'
import { TableStory } from '@/stories/table'
import { DataDisplayStory } from '@/stories/data-display'
import { DocumentStatusStory } from '@/stories/document-status'
import { EmptyStateStory } from '@/stories/empty-state'
import { ChatStory } from '@/stories/chat'
import { MetricsStory } from '@/stories/metrics'

/*
  All components — the full system in one scroll. Useful for judging
  cohesion: every component should read as the same instrument.
  Each block is the existing story, separated by strong rules.
*/

const SECTIONS: { id: string; node: ReactNode }[] = [
  { id: 'typography',      node: <TypographyStory /> },
  { id: 'buttons',         node: <ButtonsStory /> },
  { id: 'inputs',          node: <InputsStory /> },
  { id: 'select',          node: <SelectStory /> },
  { id: 'checkbox',        node: <CheckboxStory /> },
  { id: 'radio',           node: <RadioStory /> },
  { id: 'toggle',          node: <ToggleStory /> },
  { id: 'tabs',            node: <TabsStory /> },
  { id: 'avatar',          node: <AvatarStory /> },
  { id: 'badges',          node: <BadgesStory /> },
  { id: 'cards',           node: <CardsStory /> },
  { id: 'feedback',        node: <FeedbackStory /> },
  { id: 'tooltip',         node: <TooltipStory /> },
  { id: 'skeleton',        node: <SkeletonStory /> },
  { id: 'modal',           node: <ModalStory /> },
  { id: 'drawer',          node: <DrawerStory /> },
  { id: 'timeline',        node: <TimelineStory /> },
  { id: 'menu',            node: <DropdownMenuStory /> },
  { id: 'table',           node: <TableStory /> },
  { id: 'data-display',    node: <DataDisplayStory /> },
  { id: 'document-status', node: <DocumentStatusStory /> },
  { id: 'empty-state',     node: <EmptyStateStory /> },
  { id: 'chat',            node: <ChatStory /> },
  { id: 'metrics',         node: <MetricsStory /> },
]

export function AllComponentsStory() {
  // The Inputs story autofocuses a field on mount, which scroll-jumps the
  // page mid-list. Reset to the top after mount.
  useEffect(() => {
    requestAnimationFrame(() => window.scrollTo(0, 0))
  }, [])

  return (
    <div className="space-y-0">
      {SECTIONS.map((s, i) => (
        <section key={s.id} id={s.id} className={i === 0 ? '' : 'border-t border-rule-strong mt-12 pt-12'}>
          {s.node}
        </section>
      ))}
    </div>
  )
}
