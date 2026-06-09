import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  RadioGroup — single-select. Wraps the items.
  Radio       — individual option.

  Same filled gravity and relief as Checkbox: latched = binary state
  (Hard Rule #7). Unselected rests as a tiny well; selected fills with ink,
  seats in (`latched`) and shows a white inner dot. Disabled goes flat.
  The outer ring stays circular — a radio is genuinely round, the one
  permitted exception to sharp edges (Hard Rule #6); the 1px inset relief
  reads fine on the curve.
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
      'peer h-4 w-4 shrink-0 rounded-full border-2 border-border bg-surface well',
      'transition-colors duration-micro',
      'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
      'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:latched',
      // Disabled fully overrides selected identity — and goes flat
      'disabled:cursor-not-allowed disabled:bg-muted disabled:border-border disabled:shadow-none',
      'disabled:data-[state=checked]:bg-muted disabled:data-[state=checked]:border-border disabled:data-[state=checked]:shadow-none',
      'group',
      className
    )}
    {...props}
  >
    <RadixRadioGroup.Indicator className="flex items-center justify-center">
      <span className="h-2 w-2 rounded-full bg-primary-foreground group-disabled:bg-muted-foreground" />
    </RadixRadioGroup.Indicator>
  </RadixRadioGroup.Item>
))
Radio.displayName = 'Radio'
