import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { authUserGoogle } from '../api/auth.api';
import { useDispatch } from 'react-redux'
import { signInFailure, signSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom'

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res =await authUserGoogle({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})
            dispatch(signSuccess(res.data));
            navigate('/')
        } catch (error) {
            console.log('Could not sign in with google ',error);
            dispatch(signInFailure(error.response.data.message));
        }
    }
  return (
    <button onClick={handleGoogleClick} type="button" className=" bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Continue With Google</button>
  )
}
