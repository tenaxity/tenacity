import { useEffect, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

/*
  RadiusPicker — exploration tool (Hard Rule #12: lives only while the
  radius question is open). Sets the --radius-* vars; 2px "edge" is the
  locked CSS default in index.css.
*/

const MODES = [
  { id: 'carbon', label: '0px',  vibe: 'Rectangles only. Pure instrument.',     sm: '0px', md: '0px', lg: '0px', xl: '0px' },
  { id: 'edge',   label: '2px',  vibe: 'Machined edge — the locked default.',   sm: '0px', md: '2px', lg: '2px', xl: '4px' },
  { id: 'sharp',  label: '4px',  vibe: 'Softer. Pushes the even-px ceiling.',   sm: '2px', md: '4px', lg: '6px', xl: '8px' },
] as const

type ModeId = typeof MODES[number]['id']

export function RadiusPicker() {
  const [active, setActive] = useState<ModeId>('edge')

  useEffect(() => {
    const m = MODES.find(x => x.id === active)
    if (!m) return
    const root = document.documentElement
    root.style.setProperty('--radius-sm', m.sm)
    root.style.setProperty('--radius-md', m.md)
    root.style.setProperty('--radius-lg', m.lg)
    root.style.setProperty('--radius-xl', m.xl)
  }, [active])

  const activeMode = MODES.find(m => m.id === active)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-border bg-surface hover:bg-muted text-xs font-medium text-foreground transition-colors duration-micro">
          <span className="text-muted-foreground text-xs">radius</span>
          <span className="tabular-nums">{activeMode?.label}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-52">
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={cn(
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm hover:bg-muted text-left',
              active === m.id && 'bg-muted'
            )}
          >
            <span
              className="h-4 w-4 border border-foreground/40 shrink-0"
              style={{ borderRadius: m.md }}
            />
            <span className="flex-1 flex flex-col">
              <span className="font-medium tabular-nums">{m.label}</span>
              <span className="text-xs text-muted-foreground">{m.vibe}</span>
            </span>
            {active === m.id && <Check className="h-3.5 w-3.5 shrink-0" />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
