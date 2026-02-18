import { useEffect } from "react"

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [message])

  if (!message) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      
      <div className="flex items-center gap-4 
                      bg-emerald-500 text-white 
                      px-6 py-3 rounded-lg shadow-lg">

        <span className="text-sm font-bold">
          {message}
        </span>

        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition"
        >
          ✕
        </button>

      </div>
    </div>
  )
}
