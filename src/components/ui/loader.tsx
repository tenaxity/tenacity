import { cn } from '@/lib/cn'

/*
  Loader — an indeterminate rule. A hairline track with a sliding ink
  segment: the system's only ambient motion (Hard Rule #13). No spinners,
  no dots, no mascots. The stamp loader is retired (Hard Rule #12).
*/

type Size = 'sm' | 'md' | 'lg' | 'xl'
type Tone = 'primary' | 'foreground' | 'muted' | 'white'

export interface LoaderProps {
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

const widthClass: Record<Size, string> = {
  sm: 'w-6',   // 24px — fits inline / inside buttons
  md: 'w-8',   // 32px
  lg: 'w-12',  // 48px
  xl: 'w-16',  // 64px
}

export function Loader({ size = 'md', tone = 'primary', className, label = 'Loading' }: LoaderProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'relative inline-block h-0.5 overflow-hidden bg-subtle align-middle',
        widthClass[size],
        toneClass[tone],
        className
      )}
    >
      <span className="absolute top-0 h-full w-1/3 bg-current animate-progress-indeterminate" />
    </span>
  )
}
