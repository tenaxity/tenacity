import * as RadixSwitch from '@radix-ui/react-switch'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  Toggle — boxy slide switch. Reads like a physical hardware toggle (remote-control
  car / electronic equipment / panel switch), not a soft pill.

  Track:  rectangular, 2px radius, 40px wide × 22px tall
  Knob:   rectangular, 2px radius, 16px square. Slides left/right.
  Off:    bg-muted track, knob on left
  On:     bg-primary track, knob on right
  Disabled: muted track + muted knob, no opacity tricks (per Rule #1)
  Focus:  2px primary outline, 2px offset (matches Button)

  Sharp corners + rectangular shape align with Hard Rule #4 (sharp edges)
  and the broader "industrial-modernist" aesthetic.
*/

export const Toggle = forwardRef<
  ElementRef<typeof RadixSwitch.Root>,
  ComponentPropsWithoutRef<typeof RadixSwitch.Root>
>(({ className, ...props }, ref) => (
  <RadixSwitch.Root
    ref={ref}
    className={cn(
      'peer relative inline-flex h-[22px] w-10 shrink-0 items-center rounded-sm border border-border bg-muted p-0.5',
      'transition-colors',
      'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:outline-none',
      'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
      // Disabled fully overrides on/off identity
      'disabled:cursor-not-allowed disabled:bg-muted disabled:border-border',
      'disabled:data-[state=checked]:bg-muted disabled:data-[state=checked]:border-border',
      className
    )}
    {...props}
  >
    <RadixSwitch.Thumb
      className={cn(
        'pointer-events-none block h-4 w-4 rounded-sm bg-background border border-border/60 shadow-sm',
        'transition-transform',
        'data-[state=checked]:translate-x-[18px] data-[state=checked]:border-primary-foreground/30',
        'group-disabled:bg-muted-foreground/30'
      )}
    />
  </RadixSwitch.Root>
))
Toggle.displayName = 'Toggle'
