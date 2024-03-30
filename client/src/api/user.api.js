import axios from "axios";

export const updateUser = async(id,data) => 
    axios.patch(`/api/user/update/${id}`,data)

export const deleteUser = async(id) => 
    axios.delete(`/api/user/delete/${id}`)

export const getUserListings = async(id) => 
    axios.get(`/api/user/listings/${id}`)