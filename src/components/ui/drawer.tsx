import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { Children, forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/*
  Drawer — side panel that slides in from an edge. Used for detail views,
  filters, secondary navigation. Same plumbing as Modal (Radix Dialog) but
  positioned at an edge with width/height instead of centered.

  Default: slides in from right at md width.

  Composition mirrors Modal (DrawerHeader, DrawerBody, DrawerFooter, DrawerClose)
  for muscle-memory consistency.
*/

export const Drawer = RadixDialog.Root
export const DrawerTrigger = RadixDialog.Trigger
export const DrawerClose = RadixDialog.Close

const contentStyles = cva(
  'fixed z-50 bg-background border-border shadow-lg flex flex-col',
  {
    variants: {
      side: {
        right:  'right-0 top-0 h-full border-l data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
        left:   'left-0 top-0 h-full border-r',
        top:    'top-0 left-0 w-full border-b',
        bottom: 'bottom-0 left-0 w-full border-t',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
    },
    compoundVariants: [
      // right / left widths
      { side: 'right', size: 'sm', class: 'w-full max-w-sm' },
      { side: 'right', size: 'md', class: 'w-full max-w-md' },
      { side: 'right', size: 'lg', class: 'w-full max-w-2xl' },
      { side: 'right', size: 'xl', class: 'w-full max-w-4xl' },
      { side: 'left',  size: 'sm', class: 'w-full max-w-sm' },
      { side: 'left',  size: 'md', class: 'w-full max-w-md' },
      { side: 'left',  size: 'lg', class: 'w-full max-w-2xl' },
      { side: 'left',  size: 'xl', class: 'w-full max-w-4xl' },
      // top / bottom heights
      { side: 'top',    size: 'sm', class: 'h-1/4' },
      { side: 'top',    size: 'md', class: 'h-1/3' },
      { side: 'top',    size: 'lg', class: 'h-1/2' },
      { side: 'bottom', size: 'sm', class: 'h-1/4' },
      { side: 'bottom', size: 'md', class: 'h-1/3' },
      { side: 'bottom', size: 'lg', class: 'h-1/2' },
    ],
    defaultVariants: { side: 'right', size: 'md' },
  }
)

interface DrawerContentProps
  extends ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    VariantProps<typeof contentStyles> {
  hideClose?: boolean
}

export const DrawerContent = forwardRef<
  ElementRef<typeof RadixDialog.Content>,
  DrawerContentProps
>(({ className, side = 'right', size = 'md', children, hideClose, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="fixed inset-0 z-50 bg-foreground/50 data-[state=open]:animate-in data-[state=closed]:animate-out" />
    <RadixDialog.Content
      ref={ref}
      className={cn(contentStyles({ side, size }), className)}
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
DrawerContent.displayName = 'DrawerContent'

interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
}

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, icon, children, ...props }, ref) => {
    if (icon) {
      const arr = Children.toArray(children)
      const [titleChild, ...rest] = arr
      return (
        <div ref={ref} className={cn('px-5 pt-5 pb-3 pr-12 border-b border-border', className)} {...props}>
          <div className="flex items-center gap-3">
            <div className="shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">{titleChild}</div>
          </div>
          {rest.length > 0 && <div className="mt-2">{rest}</div>}
        </div>
      )
    }
    return (
      <div ref={ref} className={cn('px-5 pt-5 pb-4 pr-12 border-b border-border', className)} {...props}>
        {children}
      </div>
    )
  }
)
DrawerHeader.displayName = 'DrawerHeader'

export const DrawerTitle = forwardRef<
  ElementRef<typeof RadixDialog.Title>,
  ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn('text-md font-semibold tracking-tight text-foreground', className)}
    {...props}
  />
))
DrawerTitle.displayName = 'DrawerTitle'

export const DrawerDescription = forwardRef<
  ElementRef<typeof RadixDialog.Description>,
  ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn('text-base text-subtle-foreground mt-1', className)}
    {...props}
  />
))
DrawerDescription.displayName = 'DrawerDescription'

export const DrawerBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-5 py-5 flex-1 overflow-y-auto', className)} {...props} />
  )
)
DrawerBody.displayName = 'DrawerBody'

export const DrawerFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-end gap-2 px-5 py-4 border-t border-border', className)}
      {...props}
    />
  )
)
DrawerFooter.displayName = 'DrawerFooter'
