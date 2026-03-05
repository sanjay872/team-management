import { useState, useRef, useEffect } from "react"
import ChevronDrop from "../assets/chevron-down 1.png";
import Multiply from "../assets/multiply-add-form.png"

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
        className={`w-full
           border-[1.5px]
           rounded-[40px]
           py-[16px]
           pl-[25px]
           pr-[20px]
           flex items-center justify-between
           ${value ? "border-[#040820] text-[#040820]" : "border-[#7F818F]"}
           bg-white outline-none
           font-['Open_Sans'] text-[14px]`}
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

        {open ? (
          <img
            src={Multiply}
            alt="clear"
            className="w-[18px] h-[18px]"
            onClick={(e) => {
              e.stopPropagation()
              onChange("")
              setOpen(false)
            }}
          />
        ) : (
          <img
            src={ChevronDrop}
            alt="drop"
            className="w-[18px] h-[18px]"
          />
        )}
      </button>

      {open && (
        <div className="absolute mt-[8px] w-full bg-white rounded-xl shadow-lg border border-muted/40 py-[4px] z-50">

          {options.map((opt, index) => {
            const isLast = index === options.length - 1

            return (
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
                    ${value === opt ? "bg-blue-100" : "hover:bg-[#C7E2FF]"}
                  `}
                >
                  {opt}
                </div>

                {/* Divider (only if NOT last item) */}
                {!isLast && (
                  <div className="mt-[6px] border-t border-gray-300"></div>
                )}
              </button>
            )
          })}

        </div>
      )}
    </div>
  )
}
