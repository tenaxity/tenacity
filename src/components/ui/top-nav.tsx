import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
  TopNav — application header. 56px tall, white bg, bottom border.
  Composition is freeform: pass children, lay out via flex.
  Common shape: [logo + product name] [center: search/breadcrumbs] [right: actions/avatar/menu]
*/

export function TopNav({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 h-14 border-b border-border bg-background/85 backdrop-blur-md',
        className
      )}
      {...props}
    >
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {children}
      </div>
    </header>
  )
}

export function TopNavBrand({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 shrink-0', className)}>
      <div className="h-6 w-6 rounded bg-primary" />
      <span className="font-semibold tracking-tight text-md">{children}</span>
    </div>
  )
}

export function TopNavCenter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex-1 flex items-center justify-center min-w-0', className)}>{children}</div>
}

export function TopNavActions({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex items-center gap-2 shrink-0', className)}>{children}</div>
}
