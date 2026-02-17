import { useState, useRef, useEffect } from "react"

export default function FormDropdown({
  label,
  value,
  options,
  onChange,
  placeholder
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative mb-4" ref={ref}>
      
      <label className="text-sm font-medium block mb-2">
        {label}
      </label>

      {/* Input Field */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-[52px] 
                   border-2 border-gray-800
                   rounded-full
                   px-5 flex items-center justify-between
                   bg-white"
      >
        <span className="text-gray-800">
          {value || placeholder}
        </span>

        {value ? (
          <span
            onClick={(e) => {
              e.stopPropagation()
              onChange("")
            }}
            className="text-gray-500"
          >
            ✕
          </span>
        ) : (
          <span
            className={`transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">

          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`block w-full text-left px-6 py-3 
                ${
                  value === opt
                    ? "bg-blue-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
            >
              {opt}
            </button>
          ))}

        </div>
      )}
    </div>
  )
}
