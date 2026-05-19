import { cn } from '@/lib/cn'
import { Loader } from '@/components/ui/loader'

interface TypingIndicatorProps {
  label?: string
  className?: string
}

export function TypingIndicator({ label = 'Generating', className }: TypingIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2 text-subtle-foreground', className)}>
      <Loader variant="stamps" size="sm" tone="primary" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  )
}
