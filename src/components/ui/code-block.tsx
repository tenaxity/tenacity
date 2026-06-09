import { useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/cn'

/*
  CodeBlock — payloads, logs, snippets. Gray surface is sanctioned for
  code (Hard Rule #4 exception). Flat — it informs, it doesn't act; the
  copy control is the only key on it. Mono 12px, scrolls past max height.
*/

interface CodeBlockProps {
  children: ReactNode
  /** Raw string used for the copy action; falls back to children when children is a string */
  code?: string
  /** Optional title strip, e.g. a filename or endpoint */
  title?: string
  className?: string
  maxHeight?: number
}

export function CodeBlock({ children, code, title, className, maxHeight = 320 }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const copyable = code ?? (typeof children === 'string' ? children : undefined)

  const copy = async () => {
    if (!copyable) return
    await navigator.clipboard.writeText(copyable)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className={cn('rounded-md border border-border bg-muted overflow-hidden', className)}>
      {(title || copyable) && (
        <div className="flex items-center justify-between gap-2 px-3 h-8 border-b border-border">
          <span className="font-mono text-xs font-medium text-subtle-foreground truncate">{title}</span>
          {copyable && (
            <button
              type="button"
              onClick={copy}
              aria-label={copied ? 'Copied' : 'Copy code'}
              className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-micro"
            >
              {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              {copied ? 'copied' : 'copy'}
            </button>
          )}
        </div>
      )}
      <pre
        className="px-3 py-2 overflow-auto font-mono text-xs leading-5 text-foreground"
        style={{ maxHeight }}
      >
        {children}
      </pre>
    </div>
  )
}
