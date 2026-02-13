import Avatar from './assets/Avatar.png';


function App() {
  return (
    <div className='flex justify-center items-start h-screen'>
      <div className="flex flex-col m-[48px] gap-5">
        <input type="text" name="search" id="search" placeholder="Search by Name or Email Address"
                className=''/>
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
        <div>
          <div>
            <select name="Function" id=""></select>
            <select name="Role" id=""></select>
          </div>
          <table className='w-full border-separate border-spacing-x-4'>
            <thead>
              <tr className='bg-blue-100'>
                <th></th>
                <th>Name</th>
                <th>Function</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                <tr className='text-center hover:hover:bg-gray-700'>
                <td><img src={Avatar} alt='profile' /></td>
                <td>
                  <div>
                    Ethan Caldwell
                  </div>
                </td>
                <td>
                  <div>
                    Marketing & Sales
                  </div>
                </td>
                <td>
                  <div>
                    Admin
                  </div>
                </td>
                <td>
                  <button>Action</button>
                </td>
              </tr>
              <tr className='text-center'>
                <td><img src={Avatar} alt='profile' /></td>
                <td>
                  <div>
                    Maya Thornton
                  </div>
                </td>
                <td>
                  <div>
                    IT
                  </div>
                </td>
                <td>
                  <div>
                    Contributor
                  </div>
                </td>
                <td>
                  <button>Action</button>
                </td>
              </tr>
              <tr className='text-center'>
                <td><img src={Avatar} alt='profile' /></td>
                <td>
                  <div>
                    Olivia Harper
                  </div>
                </td>
                <td>
                  <div>
                    Product
                  </div>
                </td>
                <td>
                  <div>
                    Contributor
                  </div>
                </td>
                <td>
                  <button>Action</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
