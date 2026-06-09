import { type LabelHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
  Field — the label / control / helper sandwich, standardized.
  Stories and app code were hand-rolling this everywhere; the wrapper
  locks the voice: label is human (sans, medium), helper is meta
  (muted), error is the only colored text a form may show (Hard Rule #1
  — validation text is a sanctioned use of functional color).
*/

interface FieldProps {
  label?: ReactNode
  /** Ties the label to the control */
  htmlFor?: string
  required?: boolean
  helper?: ReactNode
  error?: ReactNode
  children: ReactNode
  className?: string
}

export function Field({ label, htmlFor, required, helper, error, children, className }: FieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <FieldLabel htmlFor={htmlFor}>
          {label}
          {required && <span aria-hidden className="text-danger ml-0.5">*</span>}
        </FieldLabel>
      )}
      {children}
      {error
        ? <p className="text-xs text-danger">{error}</p>
        : helper && <p className="text-xs text-muted-foreground">{helper}</p>}
    </div>
  )
}

export function FieldLabel({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('block text-xs font-medium text-foreground', className)}
      {...props}
    />
  )
}
