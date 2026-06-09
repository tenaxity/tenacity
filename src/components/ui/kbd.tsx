import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/*
  Kbd — a keyboard key. Carries the raised key bevel as a DEPICTIVE
  exception to "depth means interactive" (Hard Rule #7): it portrays a
  physical key the user can press on their keyboard, it just isn't
  pressable on screen. Mono, because a key cap is machine vocabulary.
*/

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center h-5 px-1.5 rounded-sm',
        'bg-surface border border-border key-raised',
        'font-mono text-xs font-medium text-subtle-foreground select-none',
        className
      )}
      {...props}
    />
  )
}
