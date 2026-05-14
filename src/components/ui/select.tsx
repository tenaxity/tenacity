import * as RadixSelect from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  Select — single-select form field. Trigger looks like an Input (same height,
  border, focus state). Open panel mirrors the typeface/color picker visuals
  but for form data.

  Selected item gets the bar-bold idiom: 4px primary left bar via inset shadow,
  consistent with focused inputs and (eventually) sidebar active items.
*/

export const Select = RadixSelect.Root
export const SelectValue = RadixSelect.Value

export const SelectTrigger = forwardRef<
  ElementRef<typeof RadixSelect.Trigger>,
  ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={cn(
      'flex h-9 w-full items-center justify-between rounded-md border border-border bg-background px-3 text-base text-foreground',
      'placeholder:text-muted-foreground',
      'transition-colors outline-none',
      'data-[placeholder]:text-muted-foreground',
      // Focus state fires on keyboard focus AND when popover is open (consistent visual when active)
      'focus-visible:border-primary focus-visible:shadow-bar-focus',
      'data-[state=open]:border-primary data-[state=open]:shadow-bar-focus',
      'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
      className
    )}
    {...props}
  >
    {children}
    <RadixSelect.Icon asChild>
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

export const SelectContent = forwardRef<
  ElementRef<typeof RadixSelect.Content>,
  ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      position={position}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background shadow-lg',
        position === 'popper' && 'data-[side=bottom]:translate-y-1',
        className
      )}
      {...props}
    >
      <RadixSelect.Viewport className="p-1">{children}</RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Portal>
))
SelectContent.displayName = 'SelectContent'

export const SelectItem = forwardRef<
  ElementRef<typeof RadixSelect.Item>,
  ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-3 pr-8 text-base text-foreground outline-none',
      'data-[highlighted]:bg-muted data-[highlighted]:text-foreground',
      'data-[state=checked]:font-semibold data-[state=checked]:shadow-[inset_4px_0_0_0_hsl(var(--primary))] data-[state=checked]:pl-4',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-muted-foreground',
      className
    )}
    {...props}
  >
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    <RadixSelect.ItemIndicator className="absolute right-2 flex h-4 w-4 items-center justify-center">
      <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
    </RadixSelect.ItemIndicator>
  </RadixSelect.Item>
))
SelectItem.displayName = 'SelectItem'
