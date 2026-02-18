import ErrorIcon from "../assets/error icon.png";

export default function ErrorModal({
  open,
  onClose
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-[524px] rounded-2xl p-8 shadow-2xl text-center">

        <div className="flex justify-center mb-4">
          <img src={ErrorIcon} alt="error" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Something Went Wrong
        </h2>

        <p className="text-gray-600 text-base leading-relaxed mb-6">
          We encountered an unexpected issue while processing your request. Please try again or contact support@complama.com.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
