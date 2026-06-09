import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/*
  Textarea — a deeper well. Same recess + focus behavior as Input
  (relief language, Hard Rule #7): recessed at rest, ink border + bar
  joins the recess on focus.
*/

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'flex w-full rounded-md border border-border bg-surface px-3 py-2 text-base text-foreground well',
        'placeholder:text-muted-foreground resize-y',
        'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none',
        'transition-colors duration-micro outline-none',
        'focus-visible:border-primary focus-visible:well-focus',
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'
