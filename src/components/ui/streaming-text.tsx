import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

/*
  StreamingText — character-by-character render of an in-flight response.
  The caret is a steady 2px ink block (no pulse — the arriving text is the
  motion; the caret just marks the write head).
*/

interface StreamingTextProps {
  text: string
  speed?: number
  onComplete?: () => void
  className?: string
}

export function StreamingText({ text, speed = 18, onComplete, className }: StreamingTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')
    setDone(false)

    if (!text) return

    const interval = window.setInterval(() => {
      indexRef.current += 1
      const next = text.slice(0, indexRef.current)
      setDisplayed(next)
      if (indexRef.current >= text.length) {
        window.clearInterval(interval)
        setDone(true)
        completeRef.current?.()
      }
    }, speed)

    return () => window.clearInterval(interval)
  }, [text, speed])

  return (
    <span className={cn('whitespace-pre-wrap', className)}>
      {displayed}
      {!done && <span className="inline-block w-[2px] h-[1em] bg-foreground ml-0.5 align-text-bottom" />}
    </span>
  )
}
