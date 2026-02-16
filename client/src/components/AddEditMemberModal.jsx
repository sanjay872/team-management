import { useEffect, useState } from "react"

export default function AddEditMemberModal({
  open,
  member,
  onClose,
  onSubmit
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    function: "",
    role: ""
  })

  useEffect(() => {
    const updateState=()=>{
        if (member) {
            setForm(member)
        } else {
            setForm({
                fullName: "",
                email: "",
                function: "",
                role: ""
            })
        }
    }
    updateState();
  }, [member])

  if (!open) return null

  const emailValid = /\S+@\S+\.\S+/.test(form.email)

  const isValid =
    form.fullName &&
    emailValid &&
    form.function &&
    form.role

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[420px] rounded-xl p-6 space-y-5 shadow-lg">

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {member ? "Edit Team Member" : "Add Team Member"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-3">
          <input
            placeholder="Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
            className="w-full border rounded-full px-4 py-3"
          />

          <div>
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className={`w-full border rounded-full px-4 py-3 ${
                form.email && !emailValid
                  ? "border-red-500"
                  : ""
              }`}
            />
            {form.email && !emailValid && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email address.
              </p>
            )}
          </div>

          <select
            value={form.function}
            onChange={(e) =>
              setForm({ ...form, function: e.target.value })
            }
            className="w-full border rounded-full px-4 py-3"
          >
            <option value="">Select Function</option>
            <option>Engineering</option>
            <option>Marketing & Sales</option>
            <option>IT</option>
            <option>Product</option>
          </select>

          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            className="w-full border rounded-full px-4 py-3"
          >
            <option value="">Select Role</option>
            <option>Admin</option>
            <option>Contributor</option>
          </select>
        </div>

        <div className="flex gap-3 pt-3">
          <button
            onClick={onClose}
            className="w-full border border-blue-700 text-blue-700 rounded-lg py-2"
          >
            Cancel
          </button>

          <button
            disabled={!isValid}
            onClick={() => onSubmit(form)}
            className={`w-full rounded-lg py-2 ${
              isValid
                ? "bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {member ? "Save Changes" : "Add to Team"}
          </button>
        </div>
      </div>
    </div>
  )
}
