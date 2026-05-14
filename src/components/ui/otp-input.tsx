import { useRef, type KeyboardEvent, type ChangeEvent, type ClipboardEvent } from 'react'
import { cn } from '@/lib/cn'

interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  className?: string
}

/*
  OTP — fixed-width digit boxes. Auto-advances on input, backspace goes back,
  paste fills all boxes. Same focus idiom as Input (primary border + left bar
  via inset shadow) for system coherence.

  By design: each box is square-ish (h-11 w-10), mono-font for digit clarity,
  large text. Aligned to industrial-modernist sharp aesthetic.
*/
export function OtpInput({ length = 6, value, onChange, className }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const setCharAt = (str: string, index: number, char: string) => {
    const padded = str.padEnd(length, ' ')
    return (padded.slice(0, index) + char + padded.slice(index + 1)).trimEnd()
  }

  const handleChange = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.slice(-1) // last char only
    if (!char) return
    const next = setCharAt(value, i, char)
    onChange(next)
    if (i < length - 1) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (value[i]) {
        // clear current
        onChange(setCharAt(value, i, ' ').trimEnd())
      } else if (i > 0) {
        // move back
        refs.current[i - 1]?.focus()
        onChange(setCharAt(value, i - 1, ' ').trimEnd())
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      refs.current[i - 1]?.focus()
    } else if (e.key === 'ArrowRight' && i < length - 1) {
      refs.current[i + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').slice(0, length).replace(/\s/g, '')
    onChange(pasted)
    refs.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={handleChange(i)}
          onKeyDown={handleKeyDown(i)}
          onPaste={i === 0 ? handlePaste : undefined}
          className={cn(
            'h-11 w-10 rounded-md border border-border bg-background text-center text-lg font-mono tabular-nums text-foreground',
            'transition-colors outline-none',
            'focus-visible:border-primary focus-visible:shadow-bar-focus',
            'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground'
          )}
        />
      ))}
    </div>
  )
}
