import { type HTMLAttributes, type ReactElement, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
  LeftNav — vertical sidebar. 240px wide. Sticky, lives below TopNav.

  Sections group items under uppercase labels (matches the "structural label"
  voice from story sections, table headers, dropdown menu labels).

  Lives on the light content surface (the chrome band stays up top in TopNav).

  Items have three states:
    - default: muted text, icon, hover bg-muted
    - active:  ink 4px LEFT BAR via inset shadow + text-foreground semibold
              (same bar-bold idiom as input focus and table selected row)
    - disabled: muted, cursor-not-allowed

  Optional trailing badge for unread counters.
*/

export function LeftNav({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        'w-60 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] border-r border-border overflow-y-auto py-5 px-3',
        className
      )}
      {...props}
    >
      <div className="space-y-6">{children}</div>
    </nav>
  )
}

export function LeftNavSection({ label, children }: { label?: ReactNode; children: ReactNode }) {
  return (
    <div className="space-y-1">
      {label && (
        <div className="px-2 text-xs uppercase tracking-wider text-subtle-foreground font-semibold">
          {label}
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

interface LeftNavItemProps {
  icon?: ReactElement
  active?: boolean
  disabled?: boolean
  /** Trailing element — typically a badge counter */
  trailing?: ReactNode
  onClick?: () => void
  children: ReactNode
  className?: string
}

export function LeftNavItem({ icon, active, disabled, trailing, onClick, children, className }: LeftNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-base text-left transition-colors duration-micro',
        'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
        // Active: 4px ink left bar + foreground semibold. No bg fill — the bar carries it.
        active
          ? 'text-foreground font-semibold shadow-[inset_4px_0_0_0_hsl(var(--primary))]'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
    >
      {icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {trailing && <span className="shrink-0">{trailing}</span>}
    </button>
  )
}
