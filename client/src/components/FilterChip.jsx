import { useState, useRef, useEffect } from "react"
import CheronDown from "../assets/chevron-down.png"

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
      
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-[10px]
                   h-[40px]
                   px-[20px] py-[12px]
                   bg-chip
                   rounded-[40px]
                   text-primary font-semibold"
      >
        {value || label}

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
            <img src={CheronDown} alt="down" />
          </span>
        )}
      </button>

      {open && (
          <div className="absolute mt-[8px] w-[200px] bg-white rounded-xl shadow-lg border border-gray-100 py-[4px] z-50">

          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`
              block w-full text-left
              px-[0] py-[4px]
              text-gray-800
            `}
            >
              <div
                className={`
                  px-[16px] py-[6px]
                  ${value === opt ? "bg-chip" : "hover:bg-gray-50"}
                `}
              >
                {opt}
              </div>

              <div className="mt-[6px] border-t border-gray-300"></div>
            </button>
          ))}

        </div>
      )}
    </div>
  )
}
