import Avatar from './assets/Avatar.png';
import Search from './assets/search 1.png';


function App() {
  return (
    <div className='flex justify-center items-start h-screen w-screen'>
      <div className="flex flex-col m-[48px] gap-5 ">
        <div className="relative w-fit">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by Name or Email Address"
            className="border border-gray-300 outline-none w-[480px] rounded-full pl-6 pr-12 py-4"
          />
          <img
            src={Search}
            alt="search"
            className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2"
          />
        </div>
        <div>
          <div>
            <div>
              Your Team
            </div>
            <div>
              Add new members, change roles or permissions, and view existing team members.
            </div>
          </div>
          <button>Add Member</button>
        </div>
        <div className='w-[60em] flex flex-col gap-2'>
          <div>
            <select name="Function" id=""></select>
            <select name="Role" id=""></select>
          </div>
          <table className="w-full border-collapse m-4">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="px-6 py-3"></th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Function</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-100 text-left">
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <img src={Avatar} alt="profile" className="w-8 h-8 rounded-full" />
                  </div>
                </td>
                <td className="px-6 py-4">Olivia Harper</td>
                <td className="px-6 py-4">
                  <div className='rounded-2xl text-center text-bold size-fit px-4 text-sm font-bold py-1 bg-gray-200 text-gray-400'>Product</div>
                </td>
                <td className="px-6 py-4">
                    <div className='rounded-2xl text-center text-bold size-fit px-4 text-sm font-bold py-1 bg-blue-200 text-blue-800'>Contributor</div>
                </td>
                <td className="px-6 py-4 text-center text-sm font-bold">⋮</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default App
