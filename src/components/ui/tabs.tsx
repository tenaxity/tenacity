import * as RadixTabs from '@radix-ui/react-tabs'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  Tabs — ink underline on active, never pills or filled backgrounds.
  Inactive: subtle-foreground text, no bottom border
  Active: foreground text, 2px ink border-bottom
  Disabled: muted text, cursor-not-allowed

  Same idiom as the ink bar-focus on inputs (ink accent on the active
  edge), just rotated 90° because tabs are horizontal.
*/

export const Tabs = RadixTabs.Root

export const TabsList = forwardRef<
  ElementRef<typeof RadixTabs.List>,
  ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={cn('inline-flex items-center gap-1 border-b border-border', className)}
    {...props}
  />
))
TabsList.displayName = 'TabsList'

export const TabsTrigger = forwardRef<
  ElementRef<typeof RadixTabs.Trigger>,
  ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1.5 -mb-px text-base font-medium',
      'border-b-2 border-transparent text-subtle-foreground',
      'transition-colors duration-micro',
      'hover:text-foreground',
      'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:outline-none',
      // Active: foreground text + 2px ink underline (icons inherit via currentColor)
      'data-[state=active]:text-foreground data-[state=active]:border-primary data-[state=active]:font-semibold',
      'disabled:cursor-not-allowed disabled:text-muted-foreground disabled:hover:text-muted-foreground',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = forwardRef<
  ElementRef<typeof RadixTabs.Content>,
  ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn('pt-4 focus-visible:outline-none', className)}
    {...props}
  />
))
TabsContent.displayName = 'TabsContent'
