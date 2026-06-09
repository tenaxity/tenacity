import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { Children, forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  Modal — overlay dialog. Tenacity-coded:
    - Sharp corners (2px), white surface
    - Scrim is graphite chrome at 50%, no blur — the housing dims the screen
    - Panel: 1px border + shadow-overlay (the one functional shadow, Hard Rule #7),
      seats into place with animate-seat-scale (Hard Rule #13)
    - Close button (X) in top-right, ghost styling
    - Three sizes (sm / md / lg) for different content densities
    - Footer is a horizontal action bar with right-aligned buttons by default

  Behavior (via Radix Dialog):
    - Focus trapped while open
    - Esc closes
    - Click outside closes
    - Returns focus to trigger on close
    - Aria-modal correctly set

  Composition:
    <Modal>
      <ModalTrigger asChild><Button>Open</Button></ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Title</ModalTitle>
          <ModalDescription>Optional description</ModalDescription>
        </ModalHeader>
        <ModalBody>Body content (scrollable)</ModalBody>
        <ModalFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
*/

export const Modal = RadixDialog.Root
export const ModalTrigger = RadixDialog.Trigger
export const ModalClose = RadixDialog.Close

// Centering comes from the flex wrapper, not translate — the seat-scale
// keyframe owns `transform` while the panel arrives.
const contentStyles = cva(
  'relative pointer-events-auto w-full rounded-md border border-border bg-surface shadow-overlay flex flex-col max-h-[90vh] animate-seat-scale',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-2xl',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

interface ModalContentProps
  extends ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    VariantProps<typeof contentStyles> {
  hideClose?: boolean
}

export const ModalContent = forwardRef<
  ElementRef<typeof RadixDialog.Content>,
  ModalContentProps
>(({ className, size, children, hideClose, ...props }, ref) => (
  <RadixDialog.Portal>
    {/* Graphite scrim — the housing dims the screen. No blur (Hard Rule #7). */}
    <RadixDialog.Overlay className="fixed inset-0 z-50 bg-chrome/50" />
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <RadixDialog.Content
        ref={ref}
        className={cn(contentStyles({ size }), className)}
        {...props}
      >
        {children}
        {!hideClose && (
          <RadixDialog.Close
            className="absolute right-3 top-3 rounded-sm p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:outline-none"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </div>
  </RadixDialog.Portal>
))
ModalContent.displayName = 'ModalContent'

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional icon (typically a FeaturedIcon) placed inline-left of the title/description block. */
  icon?: ReactNode
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, icon, children, ...props }, ref) => {
    // When icon is provided: title (first child) sits inline with the icon,
    // remaining children (description, etc.) span full width below.
    // This avoids leaving empty space under the icon when description is long.
    if (icon) {
      const arr = Children.toArray(children)
      const [titleChild, ...rest] = arr
      return (
        <div ref={ref} className={cn('px-4 pt-4 pb-3 pr-10', className)} {...props}>
          <div className="flex items-center gap-3">
            <div className="shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">{titleChild}</div>
          </div>
          {rest.length > 0 && <div className="mt-2">{rest}</div>}
        </div>
      )
    }
    return (
      <div ref={ref} className={cn('px-4 pt-4 pb-3 pr-10', className)} {...props}>
        {children}
      </div>
    )
  }
)
ModalHeader.displayName = 'ModalHeader'

export const ModalTitle = forwardRef<
  ElementRef<typeof RadixDialog.Title>,
  ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn('text-md font-semibold tracking-tight text-foreground', className)}
    {...props}
  />
))
ModalTitle.displayName = 'ModalTitle'

export const ModalDescription = forwardRef<
  ElementRef<typeof RadixDialog.Description>,
  ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn('text-base text-subtle-foreground mt-1', className)}
    {...props}
  />
))
ModalDescription.displayName = 'ModalDescription'

export const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-4 py-3 flex-1 overflow-y-auto', className)}
      {...props}
    />
  )
)
ModalBody.displayName = 'ModalBody'

export const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-end gap-2 px-4 py-3 border-t border-rule', className)}
      {...props}
    />
  )
)
ModalFooter.displayName = 'ModalFooter'
