import * as RadixTooltip from '@radix-ui/react-tooltip'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  Tooltip — small dark popup with white text. Industrial-modernist:
  near-black bg, sharp 2px corners, no glow shadow, brief text only.
  Reads like a Bloomberg-terminal hover, not a friendly bubble.

  Triggers via hover/focus. For richer content (action menus, multi-line text),
  use Popover instead. Hard Rule #9: tooltip is text-only and small; popover
  hosts richer content.
*/

export const TooltipProvider = RadixTooltip.Provider
export const Tooltip = RadixTooltip.Root
export const TooltipTrigger = RadixTooltip.Trigger

export const TooltipContent = forwardRef<
  ElementRef<typeof RadixTooltip.Content>,
  ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixTooltip.Portal>
    <RadixTooltip.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 max-w-xs rounded-sm bg-foreground text-background px-2 py-1 text-xs font-medium',
        'data-[state=delayed-open]:animate-in data-[state=closed]:animate-out',
        className
      )}
      {...props}
    />
  </RadixTooltip.Portal>
))
TooltipContent.displayName = 'TooltipContent'
