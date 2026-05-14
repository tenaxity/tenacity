import { Info, HelpCircle, Settings } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function TooltipStory() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-10 max-w-3xl">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Tooltip</h2>
          <p className="text-base text-subtle-foreground mt-1">
            Small dark popup with brief text. Hover or focus to reveal. Use for short labels and clarifications — not rich content.
          </p>
        </div>

        <Section label="Basic">
          <Row>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost"><Info className="h-4 w-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>This is a tooltip.</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost"><HelpCircle className="h-4 w-4" /></Button>
              </TooltipTrigger>
              <TooltipContent side="right">Or to the right.</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost"><Settings className="h-4 w-4" /></Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Below the trigger.</TooltipContent>
            </Tooltip>
          </Row>
        </Section>

        <Section label="On a status badge">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge tone="warning" variant="solid" className="cursor-help">In progress</Badge>
            </TooltipTrigger>
            <TooltipContent>3 of 8 invitees have signed. Expires Mar 28.</TooltipContent>
          </Tooltip>
        </Section>

        <Section label="On truncated text">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-block max-w-[200px] truncate cursor-help underline decoration-dotted">
                Series A SAFE — Acme Inc., Q2 funding round
              </span>
            </TooltipTrigger>
            <TooltipContent>Series A SAFE — Acme Inc., Q2 funding round</TooltipContent>
          </Tooltip>
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

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>
}
