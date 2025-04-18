"use client"

import { useToasts } from "./use-toast"
import { X } from "lucide-react"

export const Toaster = () => {
  const { toasts, dismissToast } = useToasts()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-md shadow-lg max-w-md animate-in fade-in slide-in-from-bottom-5 ${
            toast.variant === "destructive"
              ? "bg-red-100 border-l-4 border-red-500"
              : "bg-white border-l-4 border-blue-500"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              {toast.title && (
                <h3 className={`font-medium ${toast.variant === "destructive" ? "text-red-800" : "text-blue-800"}`}>
                  {toast.title}
                </h3>
              )}
              {toast.description && <p className="text-sm text-slate-600 mt-1">{toast.description}</p>}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Close toast"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
