import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { Children, forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  Modal — overlay dialog. Tenacity-coded:
    - Sharp corners (4px max — uses --radius-lg)
    - Backdrop is dark navy at ~50% opacity, no blur
    - Content has 1px border + shadow-lg, centered
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

const contentStyles = cva(
  'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background shadow-lg flex flex-col max-h-[90vh]',
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
    <RadixDialog.Overlay className="fixed inset-0 z-50 bg-foreground/50 data-[state=open]:animate-in data-[state=closed]:animate-out" />
    <RadixDialog.Content
      ref={ref}
      className={cn(contentStyles({ size }), 'data-[state=open]:animate-in data-[state=closed]:animate-out', className)}
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
        <div ref={ref} className={cn('px-5 pt-5 pb-3 pr-12', className)} {...props}>
          <div className="flex items-center gap-3">
            <div className="shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">{titleChild}</div>
          </div>
          {rest.length > 0 && <div className="mt-2">{rest}</div>}
        </div>
      )
    }
    return (
      <div ref={ref} className={cn('px-5 pt-5 pb-3 pr-12', className)} {...props}>
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
      className={cn('px-5 py-3 flex-1 overflow-y-auto', className)}
      {...props}
    />
  )
)
ModalBody.displayName = 'ModalBody'

export const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-end gap-2 px-5 py-4 border-t border-border', className)}
      {...props}
    />
  )
)
ModalFooter.displayName = 'ModalFooter'
