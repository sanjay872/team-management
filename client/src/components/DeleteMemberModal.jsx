import LeftArrow from "../assets/arrow-left.png";

export default function DeleteMemberModal({
  open,
  member,
  onClose,
  onConfirm
}) {
  if (!open || !member) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      
      <div
        className="bg-[#F9FAFF] w-[520px] rounded-[10px] p-8 shadow-xl flex flex-col gap-3"
      >
        
        {/* Back */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-base font-bold text-gray-800"
        >
          <img src={LeftArrow} alt="left arrow" /> Back
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-txt text-center mt-2">
          Delete Member?
        </h2>

        {/* Description */}
        <p className="text-sm font-normal text-txt text-center leading-relaxed">
          This will permanently remove this team member.
          <br />
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          
          <button
            onClick={onClose}
            className="w-[220px] border border-[#FF6663] text-red-500 py-3 rounded-md font-medium hover:bg-red-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(member.id)}
            className="w-[220px] bg-[#FF6663] text-white py-3 rounded-md font-medium hover:bg-red-600 transition"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  )
}
