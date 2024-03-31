import axios from "axios";

export const createListing = async(data) => 
    axios.post('/api/listing/create',data)

export const deleteListing = async(id) => 
    axios.delete(`/api/listing/delete/${id}`)

export const getListing = async(id) => 
    axios.get(`/api/listing/get/${id}`)

export const updateListing = async(id, data) => 
    axios.patch(`/api/listing/update/${id}`,data)