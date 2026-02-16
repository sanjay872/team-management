import { useEffect } from "react"

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [message])

  if (!message) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow">
      {message}
    </div>
  )
}
