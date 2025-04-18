"use client"

import { useState, useEffect } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

type Toast = ToastProps & {
  id: string
}

// Create a global store for toasts
let toasts: Toast[] = []
let listeners: (() => void)[] = []

const notifyListeners = () => {
  listeners.forEach((listener) => listener())
}

export function toast(props: ToastProps) {
  const id = Math.random().toString(36).substring(2, 9)
  const newToast: Toast = {
    ...props,
    id,
    duration: props.duration || 5000,
  }

  toasts = [...toasts, newToast]
  notifyListeners()

  // Auto-dismiss after duration
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    notifyListeners()
  }, newToast.duration)

  return id
}

export function useToasts() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>(toasts)

  useEffect(() => {
    const updateToasts = () => {
      setCurrentToasts([...toasts])
    }

    listeners.push(updateToasts)
    updateToasts() // Initial update

    return () => {
      listeners = listeners.filter((listener) => listener !== updateToasts)
    }
  }, [])

  const dismissToast = (id: string) => {
    toasts = toasts.filter((t) => t.id !== id)
    notifyListeners()
  }

  return {
    toasts: currentToasts,
    dismissToast,
  }
}
