import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { dismissToast, subscribeToasts, type Toast } from '@/components/ui/toast-store'

/*
  Toast — transient feedback after an action ("Link copied", "Invitation resent").
  Sits bottom-right, stacks vertically, auto-dismisses.

  Composition:
    - <Toaster /> mounted ONCE at the app root (renders the portal target)
    - toast({ title, ... }) called from anywhere — no Provider needed.

  Why no Context Provider: a singleton store + listener pattern means call sites
  don't have to care about being inside a Provider. Trade-off: this only supports
  one Toaster — but a UI app only needs one anyway.

  Per Hard Rule #1 the toast surface stays bg-background (no soft tinting).
  Tone is communicated via the FeaturedIcon-style square at the left.
*/

const toneIcon = {
  success: CheckCircle2,
  danger:  AlertCircle,
  info:    Info,
}

const toneSquareClass = {
  success: 'bg-success  text-success-foreground',
  danger:  'bg-danger   text-danger-foreground',
  info:    'bg-primary  text-primary-foreground',
}

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([])

  useEffect(() => {
    return subscribeToasts(setItems)
  }, [])

  if (typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {items.map(t => {
        const Icon = toneIcon[t.tone]
        return (
          <div
            key={t.id}
            role="status"
            className={cn(
              'pointer-events-auto flex items-start gap-3 min-w-[20rem] max-w-[26rem] p-3 pr-2',
              'rounded-md border border-border bg-background shadow-lg',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'animate-in slide-in-from-right-4 fade-in duration-200',
            )}
          >
            <span className={cn('shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-md', toneSquareClass[t.tone])}>
              <Icon className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="text-base font-semibold text-foreground">{t.title}</div>
              {t.description && <div className="text-base text-subtle-foreground mt-0.5">{t.description}</div>}
            </div>
            <button
              onClick={() => dismissToast(t.id)}
              aria-label="Dismiss"
              className="shrink-0 rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>,
    document.body,
  )
}
