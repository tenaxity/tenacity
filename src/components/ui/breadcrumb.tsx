import { ChevronRight } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface BreadcrumbItem {
  label: ReactNode
  href?: string
  onClick?: () => void
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

/*
  Breadcrumbs — chevron-separated trail. Navigation labels are human, so
  they speak Geist, not mono (Hard Rule #2 cuts the other way here).
  Inactive crumbs: subtle-foreground. Current page (last): foreground.
  Separators are true meta: muted-foreground.
*/
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-base', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <Fragment key={i}>
            {isLast ? (
              <span className="font-medium text-foreground" aria-current="page">{item.label}</span>
            ) : (
              <a
                href={item.href}
                onClick={item.onClick}
                className="text-subtle-foreground hover:text-foreground transition-colors duration-micro"
              >
                {item.label}
              </a>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" strokeWidth={2} />}
          </Fragment>
        )
      })}
    </nav>
  )
}
