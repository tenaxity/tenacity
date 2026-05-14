import { useEffect, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

type Palette = {
  id: string
  label: string
  hex: string
  vibe: string
  light: { primary: string; hover: string; subtle: string; ring: string; foreground: string }
  dark:  { primary: string; hover: string; subtle: string; ring: string; foreground: string }
}

const PALETTES: Palette[] = [
  {
    id: 'stripe', label: 'Stripe', hex: '#635BFF', vibe: 'Hue 244° — bluest purple',
    light: { primary: '244 100% 68%', hover: '245 65% 56%', subtle: '244 100% 96%', ring: '244 100% 68%', foreground: '0 0% 100%' },
    dark:  { primary: '244 100% 72%', hover: '244 100% 78%', subtle: '244 60% 16%',  ring: '244 100% 72%', foreground: '222 47% 8%' },
  },
  {
    id: 'violet', label: 'Violet', hex: '#6F5BF7', vibe: 'Hue 248°',
    light: { primary: '248 91% 66%', hover: '248 70% 56%', subtle: '248 100% 96%', ring: '248 91% 66%', foreground: '0 0% 100%' },
    dark:  { primary: '248 91% 72%', hover: '248 95% 78%', subtle: '248 55% 16%',  ring: '248 91% 72%', foreground: '222 47% 8%' },
  },
  {
    id: 'royal', label: 'Royal', hex: '#7B5BF0', vibe: 'Hue 252°',
    light: { primary: '252 84% 64%', hover: '252 65% 54%', subtle: '252 100% 96%', ring: '252 84% 64%', foreground: '0 0% 100%' },
    dark:  { primary: '252 84% 72%', hover: '252 88% 78%', subtle: '252 50% 16%',  ring: '252 84% 72%', foreground: '222 47% 8%' },
  },
  {
    id: 'untitled', label: 'Untitled UI', hex: '#7F56D9', vibe: 'Current Leegality',
    light: { primary: '258 65% 60%', hover: '258 55% 50%', subtle: '258 90% 96%',  ring: '258 65% 60%', foreground: '0 0% 100%' },
    dark:  { primary: '258 75% 70%', hover: '258 80% 78%', subtle: '258 45% 18%',  ring: '258 75% 70%', foreground: '222 47% 8%' },
  },
  {
    id: 'plum', label: 'Plum', hex: '#7C3AED', vibe: 'Saturated, loud',
    light: { primary: '262 83% 58%', hover: '262 75% 48%', subtle: '262 100% 96%', ring: '262 83% 58%', foreground: '0 0% 100%' },
    dark:  { primary: '262 85% 70%', hover: '262 90% 78%', subtle: '262 55% 18%',  ring: '262 85% 70%', foreground: '222 47% 8%' },
  },
  {
    id: 'regal', label: 'Regal', hex: '#54339D', vibe: 'Tyrian / judicial',
    light: { primary: '256 51% 41%', hover: '256 55% 33%', subtle: '256 60% 96%', ring: '256 51% 41%', foreground: '0 0% 100%' },
    dark:  { primary: '256 60% 68%', hover: '256 65% 76%', subtle: '256 40% 16%', ring: '256 60% 68%', foreground: '222 47% 8%' },
  },
]

function applyPalette(p: Palette) {
  const root = document.documentElement
  const isDark = root.classList.contains('dark')
  const set = isDark ? p.dark : p.light
  root.style.setProperty('--primary', set.primary)
  root.style.setProperty('--primary-hover', set.hover)
  root.style.setProperty('--primary-subtle', set.subtle)
  root.style.setProperty('--ring', set.ring)
  root.style.setProperty('--primary-foreground', set.foreground)
}

export function PrimaryPicker() {
  const [active, setActive] = useState('regal')

  useEffect(() => {
    const p = PALETTES.find(x => x.id === active)
    if (p) applyPalette(p)
  }, [active])

  // Re-apply on dark/light switch
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const p = PALETTES.find(x => x.id === active)
      if (p) applyPalette(p)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [active])

  const activePalette = PALETTES.find(p => p.id === active)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition-colors">
          <span className="text-muted-foreground text-xs">color</span>
          <span className="h-3 w-3 rounded-sm border border-border/50" style={{ background: activePalette?.hex }} />
          <span>{activePalette?.label}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        {PALETTES.map(p => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={cn(
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm hover:bg-muted text-left',
              active === p.id && 'bg-muted'
            )}
          >
            <span className="h-4 w-4 rounded-sm border border-border/50 shrink-0" style={{ background: p.hex }} />
            <span className="flex-1 flex flex-col">
              <span className="font-medium">{p.label}</span>
              <span className="text-xs text-muted-foreground">{p.vibe}</span>
            </span>
            <span className="text-xs text-muted-foreground font-mono tabular-nums">{p.hex}</span>
            {active === p.id && <Check className="h-3.5 w-3.5 shrink-0" />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
