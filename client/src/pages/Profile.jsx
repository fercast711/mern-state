import {useSelector} from 'react-redux'
export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=" text-3xl text-center font-semibold my-7">Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt='profile' className=' rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2'/>
        <input placeholder='Username' className='rounded-lg border p-3' id='username'/>
        <input placeholder='Email' className='rounded-lg border p-3' id='email' type='email'/>
        <input placeholder='Password' className='rounded-lg border p-3' id='password' type='password'/>
        <button className=' bg-slate-700 text-white p-3 hover:opacity-95 rounded-lg uppercase'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
