import { useEffect, useState } from "react"
import FormDropdown from "./FormDropdown"

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
      <div className="bg-white w-[420px] rounded-xl p-6 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            {member ? "Edit Team Member" : "Add Team Member"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-1">
            Name
          </label>
          <input
            placeholder="Jane Doe"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
            className="w-full border border-gray-300 rounded-full px-4 py-3 outline-none focus:border-gray-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className={
            `text-sm font-medium block mb-1 ${
              form.email && !emailValid
                ? "text-red-500"
                : ""
            }`
          }>
            Email Address
          </label>
          <input
            placeholder="name@company.com"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className={`w-full border rounded-full px-4 py-3 outline-none ${
              form.email && !emailValid
                ? "border-red-400 text-red-500"
                : "border-gray-300"
            }`}
          />
          {form.email && !emailValid && (
            <p className="text-red-500 text-sm font-medium mt-1">
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

        <div className="flex justify-between gap-3">
          <button
            onClick={onClose}
            className="w-[48%] border border-primary text-primary rounded-md py-2.5"
          >
            Cancel
          </button>

          <button
            disabled={!isValid}
            onClick={() => onSubmit(form)}
            className={`w-[48%] rounded-md py-2.5 text-sm ${
              isValid
                ? "bg-primary text-white"
                : "bg-[#7F818F] text-white font-bold"
            }`}
          >
            {member ? "Save Changes" : "Add to Team"}
          </button>
        </div>

      </div>
    </div>
  )
}