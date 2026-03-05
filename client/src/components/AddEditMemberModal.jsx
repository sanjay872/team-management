import { useEffect, useState } from "react"
import FormDropdown from "./FormDropdown"
import CloseIcon from '../assets/close-multiply.png'

export default function AddEditMemberModal({
  open,
  member,
  onClose,
  onSubmit
}) {
  const emptyState = {
    fullName: "",
    email: "",
    function: "",
    role: ""
  }

  const [form, setForm] = useState(emptyState)

  useEffect(() => {
    const updateState=()=>{
      if (open) {
        if (member) {
          setForm(member)
        } else {
          setForm(emptyState)
        }
      }
    }
    updateState();
  }, [member, open])

  if (!open) return null

  const emailValid = /\S+@\S+\.\S+/.test(form.email.trim())

  const isValid =
    form.fullName.trim() &&
    emailValid &&
    form.function &&
    form.role

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="
      w-[520px]
      flex flex-col
      gap-[10px]
      px-[30px] pt-[25px] pb-[30px]
      rounded-[8px]
      bg-[#F9FAFF]
      shadow-[2px_2px_4px_0_rgba(4,8,32,0.10)]
    ">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            {member ? "Edit Team Member" : "Add Team Member"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 text-lg"
          >
            <img src={CloseIcon} alt="close icon" />
          </button>
        </div>

        {/* Name */}
        <div className="mb-4">
         <label
            htmlFor="fullName"
            className="block mb-1 font-['Open_Sans'] text-[14px] font-bold text-[#040820]"
          >
            Name
          </label>

          <input
            id="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
            className={`
            w-full
            rounded-[40px]
            px-[25px]
            py-[16px]
            border-[1.5px]
            bg-white
            outline-none
            font-['Open_Sans']
            text-[14px]
            text-[#040820]
            placeholder:text-[#7F818F]
            ${form.fullName ? "border-[#040820]" : "border-[#7F818F]"}
            `}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className={`text-[14px] font-medium block mb-1 ${
              form.email && !emailValid
                ? "text-danger"
                : "text-dark"
            }`}
          >
            Email Address
          </label>
          <input
            id="email"
            placeholder="name@company.com"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
           className={`
            w-full
            rounded-[40px]
            px-[25px]
            py-[16px]
            border-[1.5px]
            bg-white
            outline-none
            font-['Open_Sans']
            text-[14px]
            placeholder:text-[#7F818F]
            ${
              form.email && !emailValid
                ? "border-[#FF6663] text-[#FF6663]"
                : form.email
                  ? "border-[#040820] text-[#040820]"
                  : "border-[#7F818F]"
            }
            `}
          />
          {form.email && !emailValid && (
            <p className="text-danger text-[14px] font-bold mt-[8px] font-['Open_Sans']">
              Please enter a valid email address.
            </p>
          )}
        </div>

        {/* Function */}
        <div className="mb-4">
          <FormDropdown
            label="Function"
            value={form.function}
            placeholder="Select Function"
            options={[
              "Engineering",
              "Marketing & Sales",
              "IT",
              "Product",
              "Executive"
            ]}
            onChange={(val) =>
              setForm({ ...form, function: val })
            }
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <FormDropdown
            label="Role"
            value={form.role}
            placeholder="Select Role"
            options={[
              "Admin",
              "Contributor"
            ]}
            onChange={(val) =>
              setForm({ ...form, role: val })
            }
          />
        </div>

        <div className="flex justify-center gap-[32px]">
          <button
            onClick={onClose}
            className="
            w-[48%]
            px-[20px] py-[16px]
            border-2 border-primary
            text-primary
            rounded-[6px]
            font-['Open_Sans'] text-[14px] font-extrabold leading-[120%]
            bg-transparent
            hover:border-[#23C3AB]
            hover:text-[#23C3AB]
            transition-colors
            ">
            Cancel
          </button>

          <button
            disabled={!isValid}
            onClick={() => onSubmit(form)}
            className={`
            w-[48%]
            px-[20px] py-[16px]
            rounded-[6px]
            font-['Open_Sans'] text-[14px] font-bold leading-[120%]
            transition-colors
            ${
              isValid
                ? "bg-primary text-white hover:bg-[#23C3AB]"
                : "bg-muted text-white cursor-not-allowed"
            }
            `}
          >
            {member ? "Save Changes" : "Add to Team"}
          </button>
        </div>

      </div>
    </div>
  )
}