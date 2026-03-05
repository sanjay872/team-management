import { useState, useRef, useEffect } from "react"
import ChevronDown from "../assets/chevron-down.png"
import ChevronUp from "../assets/chevron-up.png"
import Multiply from "../assets/multiply.png" // 16x16 icon

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
      {/* Interaction Button */}
      <button
        onClick={() => setOpen(!open)}
       className={`
        flex items-center gap-[10px]
        px-[20px] py-[12px]
        rounded-full
        text-[14px] font-bold leading-[120%]
        text-[#004AAD]
        border border-transparent
        ${
          open
            ? "bg-[#C7E2FF]"
            : "bg-[#C7E2FF] hover:bg-transparent hover:border-[#004AAD]"
        }
      `}
      >
        {value || label}

        {/* Icon Logic */}
        {value ? (
          <img
            src={Multiply}
            alt="clear"
            className="w-[16px] h-[16px]"
            onClick={(e) => {
              e.stopPropagation()
              onChange("")
            }}
          />
        ) : open ? (
          <img
            src={ChevronUp}
            alt="up"
            className="w-[10px] h-[5px]"
          />
        ) : (
          <img
            src={ChevronDown}
            alt="down"
            className="w-[10px] h-[5px]"
          />
        )}
      </button>

      {/* Dropdown */}
      {open && (
      <div
        className="
          absolute mt-[8px]
          w-[180px]
          rounded-[4px]
          bg-[#F9FAFF]
          shadow-md
          py-[4px]
        "
      >
        {options.map((opt, index) => {
          const isLast = index === options.length - 1

          return (
            <div key={opt} className="px-0">
              {/* 4px stack padding */}
              <div className="py-[4px]">
                {/* Blue selection area */}
                <button
                  onClick={() => {
                    onChange(opt)
                    setOpen(false)
                  }}
                  className={`
                    w-full text-left
                    px-[16px] py-[6px]
                    text-[14px]
                    font-normal
                    text-[#040820]
                    ${value === opt ? "bg-[#C7E2FF]" : ""}
                    hover:bg-[#C7E2FF]
                  `}
                >
                  {opt}
                </button>
              </div>

              {/* Divider (only if not last item) */}
              {!isLast && (
                <div className="mt-[6px] h-px bg-[#7F818F40]" />
              )}
            </div>
          )
        })}
      </div>
    )}
    </div>
  )
}