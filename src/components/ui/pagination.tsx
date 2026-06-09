import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'

/*
  Pagination — terminal-style range readout + key controls. No numbered
  page pills (that's the pastel genre); the range is data (mono), the
  prev/next are keys. Designed to sit directly under a full-bleed table,
  closed by a hairline rule.
*/

interface PaginationProps {
  /** 1-based index of the first visible row */
  from: number
  /** 1-based index of the last visible row */
  to: number
  total: number
  onPrev?: () => void
  onNext?: () => void
  className?: string
}

export function Pagination({ from, to, total, onPrev, onNext, className }: PaginationProps) {
  return (
    <div className={cn('flex items-center justify-between py-2 border-t border-rule', className)}>
      <span className="font-mono text-xs font-medium text-subtle-foreground tabular-nums">
        {from}–{to} of {total}
      </span>
      <div className="flex items-center gap-1">
        <Button variant="secondary" size="xs" onClick={onPrev} disabled={from <= 1} aria-label="Previous page">
          <ChevronLeft className="h-3.5 w-3.5" />
          Prev
        </Button>
        <Button variant="secondary" size="xs" onClick={onNext} disabled={to >= total} aria-label="Next page">
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
