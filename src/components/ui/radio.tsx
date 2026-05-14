import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  RadioGroup — single-select. Wraps the items.
  Radio       — individual option. Selected state shows an inner dot.

  Visual: same circle/border treatment as Checkbox but rounded-full.
  When selected, the entire fill becomes primary AND there's a small inner dot.
  Sticking with filled gravity — the selected state should feel committed, not soft.
*/

export const RadioGroup = forwardRef<
  ElementRef<typeof RadixRadioGroup.Root>,
  ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
>(({ className, ...props }, ref) => (
  <RadixRadioGroup.Root
    ref={ref}
    className={cn('grid gap-2', className)}
    {...props}
  />
))
RadioGroup.displayName = 'RadioGroup'

export const Radio = forwardRef<
  ElementRef<typeof RadixRadioGroup.Item>,
  ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>
>(({ className, ...props }, ref) => (
  <RadixRadioGroup.Item
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-full border-2 border-border bg-background',
      'transition-colors',
      'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:outline-none',
      'data-[state=checked]:border-primary',
      // Disabled fully overrides selected identity
      'disabled:cursor-not-allowed disabled:bg-muted disabled:border-border',
      'disabled:data-[state=checked]:border-border',
      'group',
      className
    )}
    {...props}
  >
    <RadixRadioGroup.Indicator className="flex items-center justify-center">
      <span className="h-2 w-2 rounded-full bg-primary group-disabled:bg-muted-foreground" />
    </RadixRadioGroup.Indicator>
  </RadixRadioGroup.Item>
))
Radio.displayName = 'Radio'
