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
    <div className="min-h-screen bg-gray-50 flex justify-center p-[48px]">
      <div className="w-[900px]">
        <div className="relative w-[480px] mb-[60px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name or Email Address"
            className={`
              w-full
              rounded-full
              py-4 pl-6 pr-12
              text-[14px] font-normal
              outline-none
              border
              ${
                search
                ? "border-dark"
                : "border-muted"
              }
            `}
          />
          <img
            src={Search}
            className="w-4 absolute right-5 top-1/2 -translate-y-1/2"
          />
        </div>

        <div className="flex justify-between items-end mb-[60px]">
          <div>
            <h1 className="text-[36px] font-bold text-dark">
              Your Team
            </h1>

            <p className="text-[16px] font-normal text-dark mt-[4px]">
              Add new members, change roles or permissions,
              and view existing team members.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingMember(null)
              setModalOpen(true)
            }}
            className="
              px-[20px] py-[16px]
              rounded-[6px]
              bg-[#004AAD]
              text-[#F9FAFF]
              font-['Open_Sans']
              text-[14px]
              font-bold
              leading-[120%]
            "
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
        
        <table className="w-full border-separate border-spacing-0 mt-[24px]">
    
          <thead className="text-sm font-bold">
            <tr className="bg-chip text-left text-gray-700">
              <th className="px-6 py-4 rounded-l-[4px]"></th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Function</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 rounded-r-[4px]"></th>
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
                members.map((member, idx) => {
                  const isGrey = idx % 2 === 1

                  return (
                    <tr key={member.id}>
                      <td
                        className={`px-6 py-4 ${isGrey ? "bg-gray-100 rounded-l-[4px]" : ""}`}
                      >
                        <img src={Avatar} className="w-9 rounded-full" />
                      </td>

                      <td
                        className={`px-6 py-4 font-normal text-sm text-dark ${isGrey ? "bg-gray-100" : ""}`}
                      >
                        {member.fullName}
                      </td>

                      <td className={`px-6 py-4 ${isGrey ? "bg-gray-100" : ""}`}>
                        <span className="px-4 py-1 rounded-full font-bold text-sm bg-muted/20 text-muted">
                          {member.function}
                        </span>
                      </td>

                      <td className={`px-6 py-4 font-bold text-sm ${isGrey ? "bg-gray-100" : ""}`}>
                        <span
                          className={`px-4 py-1 rounded-full ${
                            member.role === "Admin"
                              ? "bg-accent/25 text-accent"
                              : "bg-primary/25 text-primary"
                          }`}
                        >
                          {member.role}
                        </span>
                      </td>

                      <td
                        className={`px-6 py-4 text-center relative ${isGrey ? "bg-gray-100 rounded-r-[4px]" : ""}`}
                      >

                  <button
                    data-testid={`member-actions-${member.id}`}
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
                      
                      {/* Edit */}
<div className="py-[4px]">
  <button
    onClick={() => {
      setEditingMember(member)
      setModalOpen(true)
      setActiveDropdown(null)
    }}
    className="
      block w-full text-left
      px-[16px] py-[6px]
      text-[14px]
      font-normal
      text-[#040820]
      hover:bg-[#C7E2FF]
    "
  >
    Edit
  </button>
</div>

<div className="mt-[6px] h-px bg-[#7F818F40]" />

{/* Delete */}
<div className="py-[4px]">
  <button
    onClick={() => {
      setDeleteTarget(member)
      setDeleteOpen(true)
    }}
    className="
      block w-full text-left
      px-[16px] py-[6px]
      text-[14px]
      font-normal
      text-[#FF6663]
      hover:bg-[#C7E2FF]
    "
  >
    Delete
  </button>
</div>

                    </div>
                  )}
                  </td>

                </tr>
              )})
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