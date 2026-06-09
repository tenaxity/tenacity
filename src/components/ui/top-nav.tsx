import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
  TopNav — the graphite chrome band. The machine's housing (CLAUDE.md → Identity).

  48px tall, chrome tokens only. The single place material rendering is
  allowed: .chrome-material adds the 1px top highlight + faint vertical
  falloff (Hard Rule #7). Content colors never appear here.

  Composition: [Brand] [Items...] [spacer] [Actions]
*/

export function TopNav({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 h-12 chrome-material border-b border-chrome-rule text-chrome-foreground',
        className
      )}
      {...props}
    >
      <div className="h-full px-4 flex items-center gap-1">
        {children}
      </div>
    </header>
  )
}

export function TopNavBrand({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 shrink-0 pr-4 h-full', className)}>
      <div className="h-4 w-4 bg-chrome-foreground" />
      <span className="font-semibold tracking-tight text-base text-chrome-foreground">{children}</span>
    </div>
  )
}

interface TopNavItemProps {
  active?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
}

/*
  Nav item — chrome-muted at rest, chrome-foreground when active, with a
  2px underline seated on the band's bottom edge. Stroke + position, no glow.
*/
export function TopNavItem({ active, onClick, children, className }: TopNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative h-full px-3 text-base font-medium transition-colors duration-micro',
        'focus-visible:outline-2 focus-visible:outline-chrome-foreground focus-visible:-outline-offset-2',
        active
          ? 'text-chrome-foreground after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-chrome-foreground'
          : 'text-chrome-muted hover:text-chrome-foreground',
        className
      )}
    >
      {children}
    </button>
  )
}

export function TopNavDivider({ className }: { className?: string }) {
  return <div className={cn('w-px h-5 bg-chrome-rule mx-2 shrink-0', className)} />
}

export function TopNavCenter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex-1 flex items-center justify-center min-w-0', className)}>{children}</div>
}

export function TopNavActions({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('ml-auto flex items-center gap-2 shrink-0', className)}>{children}</div>
}
