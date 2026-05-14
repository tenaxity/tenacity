import { useState, useMemo, useRef, type ReactNode } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/cn'

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  label: ReactNode
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
}

/*
  MultiSelect — filter-style multi-select. Designed for "filter by tag/workflow/owner" use cases.

  Trigger: shows "{label}: {first selected}" + "+N" badge for additional selections.
            When closed: gray border. When open OR focused: primary border + inset bar (same idiom as Input/Select).
  Popover:  search input at top, scrollable checkbox list, "Clear Selection" footer.

  Multi-select fundamentally differs from Select (single) because the user can pick many,
  and the trigger needs to summarize that selection compactly.
*/

export function MultiSelect({ label, options, value, onChange, placeholder = 'All', className }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const filteredOptions = useMemo(() => {
    if (!search) return options
    const q = search.toLowerCase()
    return options.filter(o => o.label.toLowerCase().includes(q))
  }, [options, search])

  const selectedOptions = options.filter(o => value.includes(o.value))
  const firstSelected = selectedOptions[0]
  const extraCount = selectedOptions.length - 1

  const toggle = (v: string) => {
    if (value.includes(v)) onChange(value.filter(x => x !== v))
    else onChange([...value, v])
  }

  const clear = () => onChange([])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'flex h-9 min-w-[14rem] items-center gap-2 rounded-md border border-border bg-background px-3 text-base text-foreground',
            'transition-colors outline-none',
            'hover:border-foreground/30',
            'focus-visible:border-primary focus-visible:shadow-bar-focus',
            'data-[state=open]:border-primary data-[state=open]:shadow-bar-focus',
            className
          )}
        >
          <span className="font-semibold shrink-0">{label}:</span>
          {selectedOptions.length === 0 ? (
            <span className="text-muted-foreground flex-1 text-left">{placeholder}</span>
          ) : (
            <span className="flex-1 text-left truncate">
              {firstSelected?.label}
            </span>
          )}
          {extraCount > 0 && (
            <span className="shrink-0 inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1.5 rounded-sm bg-foreground text-background text-xs font-semibold tabular-nums">
              +{extraCount}
            </span>
          )}
          <ChevronDown
            className={cn(
              'h-4 w-4 text-muted-foreground shrink-0 transition-transform',
              open && 'rotate-180'
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        onOpenAutoFocus={(e) => { e.preventDefault(); searchRef.current?.focus() }}
      >
        {/* Search */}
        <div className="relative border-b border-border">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full h-9 pl-9 pr-3 text-base bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Options list */}
        <div className="max-h-64 overflow-y-auto py-1">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-6 text-base text-muted-foreground text-center">No matches</div>
          ) : (
            filteredOptions.map(o => {
              const isChecked = value.includes(o.value)
              return (
                <button
                  key={o.value}
                  onClick={() => toggle(o.value)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-base text-left hover:bg-muted transition-colors"
                >
                  <Checkbox checked={isChecked} onCheckedChange={() => toggle(o.value)} />
                  <span className="truncate">{o.label}</span>
                </button>
              )
            })
          )}
        </div>

        {/* Clear footer */}
        {selectedOptions.length > 0 && (
          <div className="border-t border-border">
            <button
              onClick={clear}
              className="w-full px-3 py-2 text-left text-base text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Clear Selection
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
