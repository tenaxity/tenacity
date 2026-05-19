import { forwardRef, useRef, useEffect, type TextareaHTMLAttributes } from 'react'
import { Send, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'

export interface ChatComposerProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit'> {
  onSend?: (value: string) => void
  onStop?: () => void
  loading?: boolean
}

export const ChatComposer = forwardRef<HTMLTextAreaElement, ChatComposerProps>(
  ({ className, onSend, onStop, loading = false, disabled, value, onChange, placeholder = 'Type a message…', ...props }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement>(null)
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? innerRef

    useEffect(() => {
      const el = textareaRef.current
      if (!el) return
      el.style.height = '0'
      el.style.height = `${Math.min(el.scrollHeight, 160)}px`
    }, [value, textareaRef])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !loading && !disabled) {
        e.preventDefault()
        const v = (e.target as HTMLTextAreaElement).value.trim()
        if (v) onSend?.(v)
      }
    }

    return (
      <div
        className={cn(
          'flex items-end gap-2 rounded-md border border-border bg-background p-2',
          'transition-colors',
          'focus-within:border-primary focus-within:shadow-bar-focus',
          disabled && 'bg-muted cursor-not-allowed',
          className,
        )}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={cn(
            'flex-1 resize-none bg-transparent text-base text-foreground outline-none',
            'placeholder:text-muted-foreground',
            'disabled:cursor-not-allowed disabled:text-muted-foreground',
            'min-h-[36px] max-h-[160px] py-1.5 px-1',
          )}
          {...props}
        />
        {loading ? (
          <Button variant="destructive" size="sm" onClick={onStop} className="shrink-0">
            <Square className="h-3.5 w-3.5" />Stop
          </Button>
        ) : (
          <Button
            size="sm"
            disabled={disabled || !value?.toString().trim()}
            onClick={() => {
              const v = value?.toString().trim()
              if (v) onSend?.(v)
            }}
            className="shrink-0"
          >
            <Send className="h-3.5 w-3.5" />Send
          </Button>
        )}
      </div>
    )
  }
)
ChatComposer.displayName = 'ChatComposer'
