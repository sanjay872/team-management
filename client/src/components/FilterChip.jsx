import { useState, useRef, useEffect } from "react"

export default function FilterChip({
  label,
  options,
  value,
  onChange
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
    <div className="relative" ref={ref}>
      
      {/* Chip */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-[10px]
                   h-[40px]
                   px-[20px] py-[12px]
                   bg-[#C7E2FF]
                   rounded-[40px]
                   text-blue-800 font-semibold"
      >
        {value || label}

        {/* Clear button */}
        {value ? (
          <span
            onClick={(e) => {
              e.stopPropagation()
              onChange("")
            }}
            className="ml-1 cursor-pointer text-blue-900"
          >
            ✕
          </span>
        ) : (
          <span
            className={`transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            ▲
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-[200px] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">

          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`block w-full text-left px-5 py-3 text-gray-800
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
