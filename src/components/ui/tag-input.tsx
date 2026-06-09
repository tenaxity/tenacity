import { useState, useRef, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/badge'

interface TagInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
}

/*
  TagInput — a fillable surface that contains badge-shaped chips for each entry
  plus a typeable area. Press Enter or comma to add a new chip. Backspace on
  an empty input removes the last chip.

  Visually behaves like an Input — same well recess at rest (recessed =
  accepts, Hard Rule #7); on focus-within the ink border + 4px bar join the
  recess (`well-focus`). The container *is* the focus surface; individual
  chips are not focusable here (kept minimal — they could be made focusable
  for keyboard removal later).

  Chips use Badge `solid neutral` for committed presence — these are real entries,
  not soft-tinted suggestions.
*/
export function TagInput({ value, onChange, placeholder, className }: TagInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const commitTag = () => {
    const trimmed = input.trim().replace(/,$/, '')
    if (!trimmed) return
    if (value.includes(trimmed)) {
      setInput('')
      return
    }
    onChange([...value, trimmed])
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      commitTag()
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      e.preventDefault()
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tag: string) => {
    onChange(value.filter(t => t !== tag))
    inputRef.current?.focus()
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        'flex flex-wrap items-center gap-1.5 min-h-8 w-full rounded-md border border-border bg-surface px-2 py-1 text-base well',
        'transition-colors duration-micro',
        'focus-within:border-primary focus-within:well-focus',
        className
      )}
    >
      {value.map(tag => (
        <Badge key={tag} tone="neutral" variant="solid" className="gap-0.5 pr-0.5">
          <span>{tag}</span>
          <button
            onClick={e => { e.stopPropagation(); removeTag(tag) }}
            className="ml-0.5 rounded-sm hover:bg-primary-hover p-0.5"
            aria-label={`Remove ${tag}`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commitTag}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[80px] bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
      />
    </div>
  )
}
