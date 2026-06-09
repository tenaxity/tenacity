import * as RadixSwitch from '@radix-ui/react-switch'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  Toggle — a machined switch: a raised square knob sliding in a recessed
  channel (relief language, Hard Rule #7). Not a soft pill — sharp is the
  machined signature (Hard Rule #6).

  Track:  rectangular, sharp corners, 40px wide × 22px tall, recessed (`well`).
          The channel stays recessed when checked (bg-primary + well).
  Knob:   16px square, white, raised key (`key-raised`); bevel inverts on
          press (`key-pressed`) like a Button. Slides left/right; relief
          snaps, only the slide transitions.
  Off:    bg-muted track, knob on left
  On:     bg-primary (ink) track, knob on right — checked renders in ink
  Disabled: muted track + subtle knob, all relief goes flat (a dead control
          has no relief), no opacity tricks (per Rule #1)
  Focus:  2px ink outline, 2px offset (matches Button)
*/

export const Toggle = forwardRef<
  ElementRef<typeof RadixSwitch.Root>,
  ComponentPropsWithoutRef<typeof RadixSwitch.Root>
>(({ className, ...props }, ref) => (
  <RadixSwitch.Root
    ref={ref}
    className={cn(
      'group peer relative inline-flex h-[22px] w-10 shrink-0 items-center rounded-sm border border-border bg-muted p-0.5 well',
      'transition-colors duration-micro',
      'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
      'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
      // Disabled fully overrides on/off identity — and goes flat
      'disabled:cursor-not-allowed disabled:bg-muted disabled:border-border disabled:shadow-none',
      'disabled:data-[state=checked]:bg-muted disabled:data-[state=checked]:border-border',
      className
    )}
    {...props}
  >
    <RadixSwitch.Thumb
      className={cn(
        'pointer-events-none block h-4 w-4 rounded-sm bg-surface border border-border key-raised',
        'transition-transform duration-micro',
        'data-[state=checked]:translate-x-[18px]',
        'group-active:key-pressed',
        'group-disabled:bg-subtle group-disabled:shadow-none'
      )}
    />
  </RadixSwitch.Root>
))
Toggle.displayName = 'Toggle'
