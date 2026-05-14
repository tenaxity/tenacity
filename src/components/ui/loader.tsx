import { cn } from '@/lib/cn'

/*
  Loader — only the stamp variants. Tenacity-distinctive judicial-industrial idiom.

  stamp:  A single rubber stamp pressing. Decisive single-action moment.
          Compact enough to fit inline / inside buttons.
  stamps: Four stamps firing in sequence — assembly line of judicial seals.
          Use for batch / system processing.

  No generic spinners, no dots, no pendulums. The stamp is the system's voice
  for "in progress." Single = one thing. Multiple = many things. That's it.
*/

type Variant = 'stamp' | 'stamps'
type Size = 'sm' | 'md' | 'lg' | 'xl'
type Tone = 'primary' | 'foreground' | 'muted' | 'white'

export interface LoaderProps {
  variant?: Variant
  size?: Size
  tone?: Tone
  className?: string
  label?: string
}

const toneClass: Record<Tone, string> = {
  primary: 'text-primary',
  foreground: 'text-foreground',
  muted: 'text-muted-foreground',
  white: 'text-primary-foreground',
}

const sizes: Record<Size, {
  stamp: { container: string; block: string; imprint: string; showImprint: boolean }
  stamps: { container: string; block: string; imprint: string; gap: string }
}> = {
  sm: {
    // small: omit imprint to fit cleanly inside buttons
    stamp:  { container: 'h-4', block: 'h-3 w-3', imprint: '', showImprint: false },
    stamps: { container: 'h-4', block: 'h-2.5 w-2.5', imprint: 'h-0.5 w-2', gap: 'gap-1' },
  },
  md: {
    stamp:  { container: 'h-6', block: 'h-4 w-4', imprint: 'h-1 w-3.5', showImprint: true },
    stamps: { container: 'h-6', block: 'h-3 w-3', imprint: 'h-0.5 w-2.5', gap: 'gap-1.5' },
  },
  lg: {
    stamp:  { container: 'h-8', block: 'h-5 w-5', imprint: 'h-1 w-5', showImprint: true },
    stamps: { container: 'h-8', block: 'h-4 w-4', imprint: 'h-1 w-3.5', gap: 'gap-2' },
  },
  xl: {
    stamp:  { container: 'h-10', block: 'h-7 w-7', imprint: 'h-1.5 w-7', showImprint: true },
    stamps: { container: 'h-10', block: 'h-5 w-5', imprint: 'h-1 w-4', gap: 'gap-2.5' },
  },
}

export function Loader({ size = 'md', tone = 'primary', variant = 'stamp', className, label = 'Loading' }: LoaderProps) {
  const s = sizes[size]
  const tClass = toneClass[tone]
  const baseProps = { role: 'status' as const, 'aria-label': label }

  if (variant === 'stamps') {
    return (
      <span {...baseProps} className={cn('inline-flex items-end', s.stamps.gap, tClass, className)}>
        {[0, 1, 2, 3].map(i => (
          <span key={i} className={cn('inline-flex flex-col items-center justify-end', s.stamps.container)}>
            <span
              className={cn('rounded-sm bg-current animate-loader-stamps origin-bottom', s.stamps.block)}
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            <span
              className={cn('rounded-sm bg-current animate-loader-stamps-imprint mt-0.5', s.stamps.imprint)}
              style={{ animationDelay: `${i * 0.5}s`, opacity: 0 }}
            />
          </span>
        ))}
      </span>
    )
  }

  // stamp (default)
  return (
    <span {...baseProps} className={cn('inline-flex flex-col items-center justify-end', s.stamp.container, tClass, className)}>
      <span className={cn('rounded-sm bg-current animate-loader-stamp origin-bottom', s.stamp.block)} />
      {s.stamp.showImprint && (
        <span className={cn('rounded-sm bg-current animate-loader-imprint mt-0.5', s.stamp.imprint)} style={{ opacity: 0 }} />
      )}
    </span>
  )
}
