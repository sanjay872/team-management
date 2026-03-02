import { useState, useRef, useEffect } from "react"
import ChevronDrop from "../assets/chevron-down 1.png";

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
      
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-[52px] 
                   border-1 border-muted/40
                   rounded-full
                   px-5 flex items-center justify-between
                   bg-white outline-none"
      >
          <span
          className={
            value
              ? "text-dark"
              : "text-muted"
          }
        >
          {value || placeholder}
        </span>

        <span
            className={`transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            <img src={ChevronDrop} alt="drop" />
        </span>
      </button>

      {open && (
        <div className="absolute mt-[8px] w-full bg-white rounded-xl shadow-lg border border-muted/40 py-[4px] z-50">

          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className="block w-full text-left py-[4px]"
            >
              {/* Blue selection area */}
              <div
                className={`
                  py-[6px] px-[16px]
                  ${value === opt ? "bg-chip" : "hover:bg-gray-50"}
                `}
              >
                {opt}
              </div>

              {/* Divider */}
              <div className="mt-[6px] border-t border-gray-300"></div>
            </button>
          ))}

        </div>
      )}
    </div>
  )
}
