import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

type Role = 'user' | 'assistant' | 'system' | 'tool'

const bubbleStyles = cva(
  'rounded-md px-4 py-3 text-base max-w-[80%]',
  {
    variants: {
      role: {
        user:      'bg-primary text-primary-foreground ml-auto',
        assistant: 'bg-background text-foreground border border-border',
        system:    'bg-muted text-subtle-foreground text-xs mx-auto text-center max-w-[60%] px-3 py-2',
        tool:      'bg-muted text-foreground font-mono text-xs border border-border',
      },
      density: {
        comfortable: 'px-4 py-3',
        compact:     'px-3 py-2 text-xs',
      },
    },
    defaultVariants: { role: 'assistant', density: 'comfortable' },
  }
)

export interface ChatBubbleProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bubbleStyles> {
  role?: Role
  avatar?: ReactNode
}

export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, role = 'assistant', density, avatar, children, ...props }, ref) => {
    const isUser = role === 'user'
    const isSystem = role === 'system'

    if (isSystem) {
      return (
        <div ref={ref} className={cn(bubbleStyles({ role, density }), className)} {...props}>
          {children}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('flex items-start gap-2', isUser && 'flex-row-reverse', className)} {...props}>
        {avatar && <div className="shrink-0 mt-0.5">{avatar}</div>}
        <div className={cn(bubbleStyles({ role, density }))}>
          {children}
        </div>
      </div>
    )
  }
)
ChatBubble.displayName = 'ChatBubble'
