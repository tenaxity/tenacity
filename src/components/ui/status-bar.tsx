import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
  StatusBar — the chrome footer. The housing's bottom edge: a Bloomberg-style
  readout strip in graphite, closing the frame the TopNav opens. Content is
  mono readouts (counts, env, timestamps) — never actions.

  Together TopNav + StatusBar make the screen sit INSIDE the machine.
*/

export function StatusBar({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <footer
      className={cn(
        'sticky bottom-0 z-30 h-8 chrome-material border-t border-chrome-rule',
        'flex items-center gap-4 px-4 font-mono text-xs text-chrome-muted',
        className
      )}
      {...props}
    >
      {children}
    </footer>
  )
}

/* A readout — label dims, value lights. */
export function StatusBarItem({ label, children }: { label?: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      {label && <span className="text-chrome-muted/70 uppercase tracking-wider">{label}</span>}
      <span className="text-chrome-foreground">{children}</span>
    </span>
  )
}

export function StatusBarDivider() {
  return <span aria-hidden className="w-px h-4 bg-chrome-rule shrink-0" />
}

export function StatusBarSpacer() {
  return <span className="flex-1" />
}
