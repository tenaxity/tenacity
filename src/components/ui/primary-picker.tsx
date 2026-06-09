import { useEffect, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

/*
  PrimaryPicker — exploration tool (Hard Rule #12: lives only while the
  graphite decision is open). Three near-black ink candidates for runtime
  A/B. Sets --primary / --primary-hover / --ring; the CSS default (Ink)
  is the truth when no override is applied.
*/

type Graphite = {
  id: string
  label: string
  vibe: string
  /** HSL triplets, matching the token format in index.css */
  primary: string
  hover: string
}

const GRAPHITES: Graphite[] = [
  {
    id: 'ink', label: 'Ink', vibe: 'Blue-cold near-black — the locked default',
    primary: '220 18% 14%', hover: '220 16% 24%',
  },
  {
    id: 'steel', label: 'Steel', vibe: 'Lighter, more saturated blue-gray',
    primary: '215 25% 20%', hover: '215 22% 30%',
  },
  {
    id: 'warm-graphite', label: 'Warm graphite', vibe: 'Brown-warm — breaks the cold cast',
    primary: '20 8% 16%', hover: '20 8% 26%',
  },
]

function applyGraphite(g: Graphite) {
  const root = document.documentElement
  root.style.setProperty('--primary', g.primary)
  root.style.setProperty('--primary-hover', g.hover)
  root.style.setProperty('--ring', g.primary)
}

export function PrimaryPicker() {
  const [active, setActive] = useState('ink')

  useEffect(() => {
    const g = GRAPHITES.find(x => x.id === active)
    if (g) applyGraphite(g)
  }, [active])

  const activeGraphite = GRAPHITES.find(g => g.id === active)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-border bg-surface hover:bg-muted text-xs font-medium text-foreground transition-colors duration-micro">
          <span className="text-muted-foreground text-xs">ink</span>
          <span className="h-3 w-3 rounded-sm border border-border/50" style={{ background: `hsl(${activeGraphite?.primary})` }} />
          <span>{activeGraphite?.label}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        {GRAPHITES.map(g => (
          <button
            key={g.id}
            onClick={() => setActive(g.id)}
            className={cn(
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm hover:bg-muted text-left',
              active === g.id && 'bg-muted'
            )}
          >
            <span className="h-4 w-4 rounded-sm border border-border/50 shrink-0" style={{ background: `hsl(${g.primary})` }} />
            <span className="flex-1 flex flex-col">
              <span className="font-medium">{g.label}</span>
              <span className="text-xs text-muted-foreground">{g.vibe}</span>
            </span>
            <span className="font-mono text-xs text-muted-foreground tabular-nums whitespace-nowrap">{g.primary}</span>
            {active === g.id && <Check className="h-3.5 w-3.5 shrink-0" />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
