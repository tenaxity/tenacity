import * as RadixTooltip from '@radix-ui/react-tooltip'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  Tooltip — small dark popup with light text. Instrument-coded:
  near-black ink bg, sharp corners, shadow-overlay for z-order (the one
  functional shadow overlays get — Hard Rule #7), brief text only.
  Reads like a Bloomberg-terminal hover, not a friendly bubble.

  Triggers via hover/focus. For richer content (action menus, multi-line
  text), use Popover instead — tooltip stays text-only and small.
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
        'z-50 max-w-xs rounded-sm bg-foreground text-background px-2 py-1 text-xs font-medium shadow-overlay',
        className
      )}
      {...props}
    />
  </RadixTooltip.Portal>
))
TooltipContent.displayName = 'TooltipContent'
