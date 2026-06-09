import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/cn'

/*
  Checkbox — filled-gravity selection control. Checked renders in ink,
  never colored (color is scarce — Hard Rule #1).

  Relief: latched = binary state (Hard Rule #7). Unchecked rests as a tiny
  well; checked fills with ink and seats in (`latched` — dark top edge over
  the fill). Relief snaps — no box-shadow transition.

  Unchecked: 2px gray border, white well.
  Checked:   ink fill + latched, white check glyph.
  Indeterminate: ink fill + latched, white minus glyph (for "some selected" in trees/lists).
  Disabled:  bg-muted, border-border, no check, flat — a dead control has no relief.
  Focus:     2px ink outline, 2px offset (matches Button focus idiom — Hard Rule #5).
*/

export const Checkbox = forwardRef<
  ElementRef<typeof RadixCheckbox.Root>,
  ComponentPropsWithoutRef<typeof RadixCheckbox.Root>
>(({ className, ...props }, ref) => (
  <RadixCheckbox.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border-2 border-border bg-surface well',
      'transition-colors duration-micro',
      'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
      'data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=checked]:latched',
      'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:latched',
      // Disabled fully overrides variant identity (matches Button rule)
      'disabled:cursor-not-allowed disabled:bg-muted disabled:border-border disabled:shadow-none',
      'disabled:data-[state=checked]:bg-muted disabled:data-[state=checked]:border-border disabled:data-[state=checked]:text-muted-foreground disabled:data-[state=checked]:shadow-none',
      'disabled:data-[state=indeterminate]:bg-muted disabled:data-[state=indeterminate]:border-border disabled:data-[state=indeterminate]:text-muted-foreground disabled:data-[state=indeterminate]:shadow-none',
      className
    )}
    {...props}
  >
    <RadixCheckbox.Indicator className="flex items-center justify-center">
      {props.checked === 'indeterminate' ? (
        <Minus className="h-3 w-3" strokeWidth={3} />
      ) : (
        <Check className="h-3 w-3" strokeWidth={3} />
      )}
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
))
Checkbox.displayName = 'Checkbox'
