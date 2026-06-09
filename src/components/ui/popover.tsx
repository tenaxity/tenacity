import * as RadixPopover from '@radix-ui/react-popover'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  Popover — generic overlay panel. White surface, hairline border, the one
  functional shadow (Hard Rule #7), seats into place with damped weight.
*/

export const Popover = RadixPopover.Root
export const PopoverTrigger = RadixPopover.Trigger

export const PopoverContent = forwardRef<
  ElementRef<typeof RadixPopover.Content>,
  ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ className, align = 'end', sideOffset = 6, ...props }, ref) => (
  <RadixPopover.Portal>
    <RadixPopover.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[14rem] rounded-md border border-border bg-surface shadow-overlay p-1.5',
        'animate-seat-scale',
        className
      )}
      {...props}
    />
  </RadixPopover.Portal>
))
PopoverContent.displayName = 'PopoverContent'
