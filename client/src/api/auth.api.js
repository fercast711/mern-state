import axios from 'axios'
export const createUser = async (data) =>
    await axios.post('/api/auth/signup', data)

export const authUser = async (data) => 
    await axios.post('/api/auth/signin', data)
