import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useRef, useState} from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
import { deleteUser, updateUser } from '../api/user.api'
import { authSignOut } from '../api/auth.api'

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(null)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({})
  const [successUpdate, setSuccessUpdate] = useState(false);
  const dispatch = useDispatch();
  //firebase storage
  // allow read;
  // allow write: if 
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file])

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(updateStart())
    try {
      const res = await updateUser(currentUser._id, formData)
      dispatch(updateSuccess(res.data))
      setSuccessUpdate(true)
    } catch (error) {
      dispatch(updateFailure(error.response.data.message));
      setSuccessUpdate(false);
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      setFilePerc(Math.round(progress))
    },
    (error) => {
      console.error(error)
      setFileUploadError(true)
    },
    () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setFormData({...formData, avatar: downloadURL})
      setFileUploadError(false);
    })
    }
    )
  }
  const handleDeleteUser = async() => {
    try {
      dispatch(deleteUserStart())
      await deleteUser(currentUser._id)
      dispatch(deleteUserSuccess())
    } catch (error) {
      dispatch(deleteUserFailure(error.response.data.message))
    }
  }
  const handleSignOut = async() => {
    try {
      dispatch(signOutUserStart())
      await authSignOut()
      dispatch(signOutUserSuccess())
    } catch (error) {
      dispatch(signOutUserFailure(error.response.data.message))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=" text-3xl text-center font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])}
        type='file' 
        ref={fileRef} 
        hidden 
        accept='image/*'/>
        <img src={formData.avatar || currentUser.avatar} onClick={() => fileRef.current.click()} alt='profile' className=' rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2'/>
        <p className='text-sm self-center'>
          {
            
            filePerc > 0 && filePerc < 100 ?
            (<span className=''>{`Uploading ${filePerc}%`}</span>) :
            filePerc === 100 && fileUploadError ? 
            (<span className=' text-red-700'>Error image Upload</span>):
            filePerc === 100 && !fileUploadError ?
            (<span className='text-green-700'>Image Successfuly Uploaded!!</span>) :
            ''
          }
        </p>
        <input onChange={handleChange} defaultValue={currentUser.username} placeholder='Username' className='rounded-lg border p-3' id='username'/>
        <input onChange={handleChange}defaultValue={currentUser.email} placeholder='Email' className='rounded-lg border p-3' id='email' type='email'/>
        <input onChange={handleChange} placeholder='Password' className='rounded-lg border p-3' id='password' type='password'/>
        <button disabled={loading} className=' bg-slate-700 text-white p-3 hover:opacity-95 rounded-lg uppercase'>{loading ? 'loading...' : 'update'}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span 
        onClick={handleDeleteUser}
        className='text-red-700 cursor-pointer'>Delete Account</span>
        <span 
        onClick={handleSignOut}
        className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className=' text-red-700 mt-5'>{error || ''}</p>
      <p className=' text-green-700 mt-5'>{successUpdate ? 'User is updated successfully!!' : ''}</p>
    </div>
  )
}
