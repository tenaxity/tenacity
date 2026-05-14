import { useEffect, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

const FACES = [
  { id: 'inter',   label: 'Inter',     stack: "'Inter', system-ui, sans-serif",         vibe: 'Modern, neutral' },
  { id: 'geist',   label: 'Geist',     stack: "'Geist', system-ui, sans-serif",         vibe: 'Sharp, technical' },
  { id: 'switzer', label: 'Switzer',   stack: "'Switzer', system-ui, sans-serif",       vibe: 'Premium, editorial' },
  { id: 'plex',    label: 'IBM Plex',  stack: "'IBM Plex Sans', system-ui, sans-serif", vibe: 'Carbon-native' },
] as const

type FaceId = typeof FACES[number]['id']

export function TypefacePicker() {
  const [active, setActive] = useState<FaceId>('geist')

  useEffect(() => {
    const face = FACES.find(f => f.id === active)
    if (!face) return
    document.documentElement.style.setProperty('--font-sans', face.stack)
    document.body.style.fontFamily = face.stack
  }, [active])

  const activeFace = FACES.find(f => f.id === active)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition-colors">
          <span className="text-muted-foreground text-xs">font</span>
          <span style={{ fontFamily: activeFace?.stack }}>{activeFace?.label}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        {FACES.map(f => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={cn(
              'w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-sm text-sm hover:bg-muted text-left',
              active === f.id && 'bg-muted'
            )}
            style={{ fontFamily: f.stack }}
          >
            <span className="flex flex-col">
              <span className="font-medium">{f.label}</span>
              <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>{f.vibe}</span>
            </span>
            {active === f.id && <Check className="h-3.5 w-3.5 shrink-0" />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
