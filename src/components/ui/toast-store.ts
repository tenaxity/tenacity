import type { ReactNode } from 'react'

export type ToastTone = 'success' | 'danger' | 'info'

export interface Toast {
  id: string
  title: ReactNode
  description?: ReactNode
  tone: ToastTone
  duration: number
}

type Listener = (toasts: Toast[]) => void

let toasts: Toast[] = []
const listeners = new Set<Listener>()

function notify() {
  listeners.forEach((listener) => listener(toasts))
}

export function subscribeToasts(listener: Listener) {
  listener(toasts)
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function toast(input: Omit<Toast, 'id' | 'duration'> & { duration?: number }) {
  const id = Math.random().toString(36).slice(2)
  const duration = input.duration ?? 3500
  const nextToast: Toast = { ...input, id, duration }
  toasts = [...toasts, nextToast]
  notify()

  if (duration > 0 && typeof window !== 'undefined') {
    window.setTimeout(() => {
      dismissToast(id)
    }, duration)
  }

  return id
}

export function dismissToast(id: string) {
  toasts = toasts.filter((item) => item.id !== id)
  notify()
}
