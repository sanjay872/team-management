import { useEffect, useState } from "react"
import Avatar from "./assets/Avatar.png"
import Search from "./assets/search 1.png"

import AddEditMemberModal from "./components/AddEditMemberModal"
import Toast from "./components//Toast"

function App() {
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("")
  const [func, setFunc] = useState("")

  const [modalOpen, setModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)

  const [toast, setToast] = useState(null)

  useEffect(() => {
    const fetchMembers = async () => {
        const params = new URLSearchParams()
        if (search) params.append("q", search)
        if (role) params.append("role", role)
        if (func) params.append("function", func)

        const res = await fetch(`/api/team-members?${params}`)
        const data = await res.json()
        setMembers(data)
    }
    fetchMembers()
  }, [search, role, func])

  // 🔥 Create or Update
  const handleSubmit = async (form) => {
    if (editingMember) {
      const res = await fetch(
        `/api/team-members/${editingMember.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      )
      const updated = await res.json()
      setMembers((prev) =>
        prev.map((m) =>
          m.id === updated.id ? updated : m
        )
      )
      setToast("Member Updated")
    } else {
      const res = await fetch("/api/team-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const created = await res.json()
      setMembers((prev) => [...prev, created])
      setToast("New Member Added")
    }

    setModalOpen(false)
    setEditingMember(null)
  }

  const handleDelete = async (id) => {
    await fetch(`/api/team-members/${id}`, {
      method: "DELETE",
    })
    setMembers((prev) =>
      prev.filter((m) => m.id !== id)
    )
    setToast("Member Deleted")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-[900px] mt-12 space-y-8">

        {/* Search */}
        <div className="relative w-[480px]">
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by Name or Email Address"
            className="w-full rounded-full border py-4 pl-6 pr-12"
          />
          <img
            src={Search}
            className="w-4 absolute right-5 top-1/2 -translate-y-1/2"
          />
        </div>

        {/* Header */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Your Team
            </h1>
            <p className="text-gray-500 mt-2">
              Add new members, change roles or permissions,
              and view existing team members.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingMember(null)
              setModalOpen(true)
            }}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Add Member
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={func}
            onChange={(e) =>
              setFunc(e.target.value)
            }
            className="bg-blue-100 px-5 py-2 rounded-full"
          >
            <option value="">Function</option>
            <option>Engineering</option>
            <option>Marketing & Sales</option>
            <option>IT</option>
            <option>Product</option>
          </select>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="bg-blue-100 px-5 py-2 rounded-full"
          >
            <option value="">Role</option>
            <option>Admin</option>
            <option>Contributor</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

  <table className="w-full border-separate border-spacing-0">
    
    <thead>
      <tr className="bg-blue-100 text-left text-gray-700">
        <th className="px-6 py-4"></th>
        <th className="px-6 py-4 font-semibold">Name</th>
        <th className="px-6 py-4 font-semibold">Function</th>
        <th className="px-6 py-4 font-semibold">Role</th>
        <th className="px-6 py-4"></th>
      </tr>
    </thead>

    <tbody>
      {members.length === 0 ? (
        <tr>
          <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
            Add your first team member to get started and start collaborating.
          </td>
        </tr>
      ) : (
        members.map((member) => (
          <tr key={member.id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <img src={Avatar} className="w-9 rounded-full" />
            </td>

            <td className="px-6 py-4">{member.fullName}</td>

            <td className="px-6 py-4">
              <span className="bg-gray-200 px-4 py-1 rounded-full text-sm">
                {member.function}
              </span>
            </td>

            <td className="px-6 py-4">
              <span
                className={`px-4 py-1 rounded-full text-sm ${
                  member.role === "Admin"
                    ? "bg-green-200 text-green-700"
                    : "bg-blue-200 text-blue-800"
                }`}
              >
                {member.role}
              </span>
            </td>

            <td className="px-6 py-4 text-center">⋮</td>
          </tr>
        ))
      )}
    </tbody>

  </table>
</div>


        <AddEditMemberModal
          open={modalOpen}
          member={editingMember}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />

        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />

      </div>
    </div>
  )
}

export default App