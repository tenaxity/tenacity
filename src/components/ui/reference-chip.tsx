import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/cn'

/*
  ReferenceChip — a citation to a document/source. It points at data, so it
  speaks machine: mono 12px on a neutral gray chip, sharp corners. No tints;
  hover sharpens the border, it never adds color.
*/

interface ReferenceChipProps {
  number: number
  title: string
  href?: string
  onClick?: () => void
  className?: string
}

export function ReferenceChip({ number, title, href, onClick, className }: ReferenceChipProps) {
  const Tag = href ? 'a' : 'button'
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick }

  return (
    <Tag
      {...(linkProps as any)}
      className={cn(
        'inline-flex items-center gap-1.5 h-6 px-2 rounded-sm',
        'border border-border bg-muted font-mono text-xs font-medium text-foreground',
        'hover:border-rule-strong transition-colors duration-micro',
        'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
        className,
      )}
    >
      <span className="text-muted-foreground tabular-nums">[{number}]</span>
      <span className="truncate max-w-[12rem]">{title}</span>
      <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
    </Tag>
  )
}
