import axios from 'axios'
export const createUser = async (data) =>{
    return await axios.post('/api/auth/signup', data)

}