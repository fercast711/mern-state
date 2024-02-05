import {useSelector} from 'react-redux'
import {useEffect, useRef, useState} from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser} = useSelector((state) => state.user)
  const [file, setFile] = useState(null)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({})
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
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=" text-3xl text-center font-semibold my-7">Profile</h1>
      <form className='flex flex-col gap-4'>
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
