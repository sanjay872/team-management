import { useEffect, useState, useRef } from "react"
import Avatar from "./assets/Avatar.png"
import Search from "./assets/search 1.png"

import AddEditMemberModal from "./components/AddEditMemberModal"
import Toast from "./components//Toast"
import DeleteMemberModal from "./components/DeleteMemberModal"
import FilterChip from "./components/FilterChip"
import ErrorModal from "./components/ErrorModal"
import DisclosureTrigger from "./assets/Icon Disclosure Trigger.png";

function App() {
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("")
  const [func, setFunc] = useState("")

  const [modalOpen, setModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)

  const [toast, setToast] = useState(null)

  const [activeDropdown, setActiveDropdown] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const dropdownRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const params = new URLSearchParams()
        if (search) params.append("q", search)
        if (role) params.append("role", role)
        if (func) params.append("function", func)

        const res = await fetch(`/api/team-members?${params}`)

        if (!res.ok) throw new Error("Failed to fetch!")

        const data = await res.json()
        setMembers(data);

      } catch (err) {
        setError(err.message)
      }
    }
    fetchMembers()
  }, [search, role, func])

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setActiveDropdown(null)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [])


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
      setToast("Changes Saved")
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

        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold">
              Your Team
            </h1>
            <p className="text-gray-400 mt-2 text-base">
              Add new members, change roles or permissions,
              and view existing team members.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingMember(null)
              setModalOpen(true)
            }}
            className="bg-primary text-white px-6 py-3 rounded-lg w-[130px] h-[49px]"
          >
            Add Member
          </button>
        </div>

        <div className="flex gap-4">
          <FilterChip
            label="Function"
            value={func}
            options={[
              "Engineering",
              "Marketing & Sales",
              "IT",
              "Product"
            ]}
            onChange={(val) => setFunc(val)}
          />

          <FilterChip
            label="Role"
            value={role}
            options={[
              "Admin",
              "Contributor"
            ]}
            onChange={(val) => setRole(val)}
          />

        </div>
        
        <table className="w-full border-separate border-spacing-0">
    
          <thead className="rounded-2xl text-sm font-bold">
            <tr className="bg-blue-100 text-left text-gray-700">
              <th className="px-6 py-4 rounded-tl-lg rounded-bl-lg"></th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Function</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 rounded-tr-lg rounded-br-lg"></th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center pt-2 text-base">
                    {search
                      ? "No team members match your search"
                      : role || func
                      ? "No team members match the selected filters"
                      : "Add your first team member to get started and start collaborating."}
                  </td>
                </tr>
              ) : (
              members.map((member) => (
                <tr key={member.id} className="even:bg-gray-100">
                  <td className="px-6 py-4 rounded-tl-lg rounded-bl-lg">
                    <img src={Avatar} className="w-9 rounded-full" />
                  </td>

                  <td className="px-6 py-4 font-normal text-sm text-[#040820]">{member.fullName}</td>

                  <td className="px-6 py-4">
                    <span className="bg-gray-200 px-4 py-1 rounded-full font-bold text-sm text-gray-400">
                      {member.function}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-bold text-sm">
                    <span
                      className={`px-4 py-1 rounded-full ${
                        member.role === "Admin"
                          ? "bg-[#23C3AB40] text-[#23C3AB]"
                          : "bg-[#004AAD40] text-primary"
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center relative rounded-tr-lg rounded-br-lg">

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveDropdown(
                        activeDropdown === member.id ? null : member.id
                      )
                    }}
                    className="text-lg"
                  >
                    <img src={DisclosureTrigger} alt="trigger" />
                  </button>

                  {activeDropdown === member.id && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-6 mt-2 w-32 bg-white rounded-md shadow-lg z-50"
                    >
                      
                      <button
                        onClick={() => {
                          setEditingMember(member)
                          setModalOpen(true)
                          setActiveDropdown(null)
                        }}
                        className="block w-full text-left px-4 py-2 border-b-1 border-gray-300 hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setDeleteTarget(member)
                          setDeleteOpen(true)
                        }}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        Delete
                      </button>

                    </div>
                  )}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>

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

        <DeleteMemberModal
          open={deleteOpen}
          member={deleteTarget}
          onClose={() => {
            setDeleteOpen(false)
            setDeleteTarget(null)
          }}
          onConfirm={(id) => {
            handleDelete(id)
            setDeleteOpen(false)
            setDeleteTarget(null)
          }}
        />

        <ErrorModal
          open={!!error}
          message={error}
          onClose={() => setError(null)}
        />

      </div>
    </div>
  )
}

export default App