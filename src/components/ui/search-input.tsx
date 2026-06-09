import { forwardRef, type InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { cn } from '@/lib/cn'

/*
  SearchInput — Input with the search affordance built in. This composition
  was being hand-rolled in every consumer (filter strips, pickers, panels);
  promoting it locks the icon geometry to the 32px well.
*/

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional shortcut hint rendered at the right edge, e.g. "⌘K" */
  shortcut?: string
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, shortcut, ...props }, ref) => (
    <div className={cn('relative', className)}>
      <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input ref={ref} className={cn('pl-8', shortcut && 'pr-10')} {...props} />
      {shortcut && (
        <Kbd className="absolute right-2 top-1.5">{shortcut}</Kbd>
      )}
    </div>
  )
)
SearchInput.displayName = 'SearchInput'
