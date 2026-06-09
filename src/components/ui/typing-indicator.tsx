import { cn } from '@/lib/cn'
import { Loader } from '@/components/ui/loader'

/*
  TypingIndicator — "the machine is working." Reuses the indeterminate rule
  loader (the system's only ambient motion, 1.4s) in muted tone + a quiet
  label. No bouncing dots, no color.
*/

interface TypingIndicatorProps {
  label?: string
  className?: string
}

export function TypingIndicator({ label = 'Generating', className }: TypingIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2 text-subtle-foreground', className)}>
      <Loader size="sm" tone="muted" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  )
}
