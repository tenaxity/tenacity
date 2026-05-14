import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import { Check } from 'lucide-react'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  DropdownMenu — action menu (the 3-dot ⋮ "more options" in card footers, table rows).
  Different from Select (which picks ONE value from a list). DropdownMenu fires actions.

  Items support:
    - normal (default): foreground text, hover bg-muted
    - destructive: danger-red text, used for "Delete" / "Remove" / "Reject"
    - disabled: muted, cursor-not-allowed
    - with shortcut: small mono key hint on the right
    - separators between groups
    - optional labels (section headers within the menu)

  Hard Rule #1 respected: panel is white, items have NO soft tint on hover —
  hover uses bg-muted (gray) per the system pattern.
*/

export const DropdownMenu = RadixDropdown.Root
export const DropdownMenuTrigger = RadixDropdown.Trigger
export const DropdownMenuGroup = RadixDropdown.Group

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof RadixDropdown.Content>,
  ComponentPropsWithoutRef<typeof RadixDropdown.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixDropdown.Portal>
    <RadixDropdown.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[10rem] rounded-md border border-border bg-background shadow-lg p-1',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        className
      )}
      {...props}
    />
  </RadixDropdown.Portal>
))
DropdownMenuContent.displayName = 'DropdownMenuContent'

interface MenuItemProps extends ComponentPropsWithoutRef<typeof RadixDropdown.Item> {
  destructive?: boolean
}

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof RadixDropdown.Item>,
  MenuItemProps
>(({ className, destructive, ...props }, ref) => (
  <RadixDropdown.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-base outline-none',
      'transition-colors',
      destructive
        ? 'text-danger data-[highlighted]:bg-danger data-[highlighted]:text-danger-foreground'
        : 'text-foreground data-[highlighted]:bg-muted',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-muted-foreground data-[disabled]:bg-transparent',
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = 'DropdownMenuItem'

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof RadixDropdown.CheckboxItem>,
  ComponentPropsWithoutRef<typeof RadixDropdown.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <RadixDropdown.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-sm pl-8 pr-2 py-1.5 text-base outline-none',
      'transition-colors text-foreground',
      'data-[highlighted]:bg-muted',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-muted-foreground',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
      <RadixDropdown.ItemIndicator>
        <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
      </RadixDropdown.ItemIndicator>
    </span>
    {children}
  </RadixDropdown.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof RadixDropdown.Separator>,
  ComponentPropsWithoutRef<typeof RadixDropdown.Separator>
>(({ className, ...props }, ref) => (
  <RadixDropdown.Separator
    ref={ref}
    className={cn('my-1 h-px bg-border', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof RadixDropdown.Label>,
  ComponentPropsWithoutRef<typeof RadixDropdown.Label>
>(({ className, ...props }, ref) => (
  <RadixDropdown.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-xs uppercase tracking-wider font-semibold text-subtle-foreground', className)}
    {...props}
  />
))
DropdownMenuLabel.displayName = 'DropdownMenuLabel'

export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('ml-auto text-xs font-mono text-muted-foreground tracking-wider', className)}
      {...props}
    />
  )
}
