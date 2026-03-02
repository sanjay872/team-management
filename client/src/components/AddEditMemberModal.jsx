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
      <div className="bg-white w-[420px] rounded-[8px] p-6 shadow-xl">

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
         <label
            htmlFor="fullName"
            className="text-sm font-medium block mb-1"
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
            w-full rounded-full px-4 py-3 outline-none border
            ${form.fullName
              ? "border-dark"
              : "border-gray-300"
            }
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
            w-full rounded-full px-4 py-3 outline-none border
            ${
              form.email && !emailValid
                ? "border-danger text-danger"
                : form.email
                  ? "border-dark"
                  : "border-gray-300"
            }
          `}
          />
          {form.email && !emailValid && (
            <p className="text-danger text-[14px] font-bold mt-1">
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
            className="w-[48%] border border-primary text-primary rounded-[6px] py-2.5 hover:bg-accent hover:text-white transition"
          >
            Cancel
          </button>

          <button
            disabled={!isValid}
            onClick={() => onSubmit(form)}
            className={`w-[48%] rounded-[6px] py-2.5 text-sm transition ${
              isValid
                ? "bg-primary text-white hover:bg-accent"
                : "bg-muted text-white font-bold"
            }`}
          >
            {member ? "Save Changes" : "Add to Team"}
          </button>
        </div>

      </div>
    </div>
  )
}