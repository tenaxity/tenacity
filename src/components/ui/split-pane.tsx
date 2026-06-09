import { useState, useRef, useCallback, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
  SplitPane — two panes separated by a draggable 4px vertical rule.
  The divider is the only vertical rule the system condones (Hard Rule #3);
  it goes ink on hover — the active-edge idiom.
*/

interface SplitPaneProps {
  left: ReactNode
  right: ReactNode
  defaultWidth?: number
  minWidth?: number
  maxWidth?: number
  className?: string
}

export function SplitPane({
  left,
  right,
  defaultWidth = 380,
  minWidth = 240,
  maxWidth = 600,
  className,
}: SplitPaneProps) {
  const [width, setWidth] = useState(defaultWidth)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startW = useRef(0)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    startX.current = e.clientX
    startW.current = width
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return
      const delta = ev.clientX - startX.current
      setWidth(Math.max(minWidth, Math.min(maxWidth, startW.current + delta)))
    }
    const onUp = () => {
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [width, minWidth, maxWidth])

  return (
    <div className={cn('flex h-full overflow-hidden', className)}>
      <div className="shrink-0 overflow-y-auto" style={{ width }}>
        {left}
      </div>
      <div
        onMouseDown={onMouseDown}
        className="shrink-0 w-1 cursor-col-resize bg-border hover:bg-primary transition-colors duration-micro"
      />
      <div className="flex-1 min-w-0 overflow-y-auto">
        {right}
      </div>
    </div>
  )
}
