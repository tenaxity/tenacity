import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/cn'

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
        'inline-flex items-center gap-1.5 h-7 px-2 rounded-sm',
        'border border-border bg-background text-xs font-medium text-foreground',
        'hover:bg-muted hover:border-foreground/20 transition-colors',
        className,
      )}
    >
      <span className="text-muted-foreground tabular-nums">[{number}]</span>
      <span className="truncate max-w-[12rem]">{title}</span>
      <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
    </Tag>
  )
}
