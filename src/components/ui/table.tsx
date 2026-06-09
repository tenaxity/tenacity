import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode, type TdHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/*
  Table — full-bleed, open + ruled (Hard Rule #3). No outer border, no
  surrounding card. Structure comes from rules:
    - rule-strong below the header row
    - hairline rules between body rows

  The mono/sans boundary (Hard Rule #2): headers are human labels (Geist,
  uppercase); cells default to machine data (mono, 12px, medium). Cells
  holding human text opt out via the `prose` prop; cells holding components
  (StatusMark, buttons) are unaffected by the font default.

  Density: 32px rows by default, 28px compact. Terminal-dense.
*/

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table ref={ref} className={cn('w-full caption-bottom text-base', className)} {...props} />
  )
)
Table.displayName = 'Table'

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('border-b border-rule-strong', className)} {...props} />
  )
)
TableHeader.displayName = 'TableHeader'

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('divide-y divide-rule', className)} {...props} />
  )
)
TableBody.displayName = 'TableBody'

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement> & { selected?: boolean }>(
  ({ className, selected, ...props }, ref) => (
    <tr
      ref={ref}
      data-selected={selected || undefined}
      className={cn(
        'group transition-colors duration-micro',
        'data-[selected]:shadow-[inset_4px_0_0_0_hsl(var(--primary))]',
        'hover:bg-muted/60',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

interface TableHeadProps extends HTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  /** 'asc' | 'desc' | undefined — current sort direction */
  sortDir?: 'asc' | 'desc'
  onSort?: () => void
  align?: 'left' | 'right' | 'center'
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortable, sortDir, onSort, align = 'left', ...props }, ref) => {
    const alignClass = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
    const Indicator = sortDir === 'asc' ? ChevronUp : sortDir === 'desc' ? ChevronDown : ChevronsUpDown
    return (
      <th
        ref={ref}
        className={cn(
          'px-3 py-2 text-xs uppercase tracking-wider font-semibold text-subtle-foreground',
          alignClass,
          sortable && 'cursor-pointer select-none hover:text-foreground',
          className
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        {sortable ? (
          <span className={cn('inline-flex items-center gap-1', align === 'right' && 'justify-end w-full')}>
            {children}
            <Indicator className={cn('h-3 w-3', sortDir ? 'text-foreground' : 'text-muted-foreground')} />
          </span>
        ) : children}
      </th>
    )
  }
)
TableHead.displayName = 'TableHead'

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'right' | 'center'
  /** Human text (descriptions, names-as-labels) — Geist instead of mono */
  prose?: boolean
  /** Reduced padding: 28px rows instead of 32px */
  compact?: boolean
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = 'left', prose, compact, ...props }, ref) => {
    const alignClass = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
    return (
      <td
        ref={ref}
        className={cn(
          compact ? 'px-3 py-1.5' : 'px-3 py-2',
          prose
            ? 'text-base text-foreground'
            : 'font-mono text-xs font-medium text-foreground',
          'align-middle',
          alignClass,
          className
        )}
        {...props}
      />
    )
  }
)
TableCell.displayName = 'TableCell'

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-xs text-muted-foreground', className)} {...props} />
  )
)
TableCaption.displayName = 'TableCaption'

export function TableEmpty({ children, className, ...props }: HTMLAttributes<HTMLTableCellElement> & { children: ReactNode; colSpan?: number }) {
  return (
    <tr>
      <td colSpan={props.colSpan} className={cn('px-3 py-12 text-center', className)} {...props}>
        {children}
      </td>
    </tr>
  )
}
