import * as RadixSelect from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  Select — single-select form field. Trigger looks like an Input: a well at
  rest (recessed = accepts, Hard Rule #7); focused or open, the ink border +
  4px bar join the recess (`well-focus`). Disabled wells go flat. Open panel
  is an overlay: white surface, hairline border, the one functional shadow,
  seats into place. Panel items stay flat — relief belongs to the control,
  not the list.

  Selected item gets the ink left-bar idiom: 4px primary bar via inset shadow,
  consistent with focused inputs and selected table rows.
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
      'flex h-8 w-full items-center justify-between rounded-md border border-border bg-surface px-3 text-base text-foreground well',
      'placeholder:text-muted-foreground',
      'transition-colors duration-micro outline-none',
      'data-[placeholder]:text-muted-foreground',
      // Focus state fires on keyboard focus AND when popover is open (consistent visual when active)
      'focus-visible:border-primary focus-visible:well-focus',
      'data-[state=open]:border-primary data-[state=open]:well-focus',
      'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none',
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
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface shadow-overlay animate-seat-scale',
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
