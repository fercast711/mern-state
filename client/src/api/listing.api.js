import axios from "axios";

export const createListing = async(data) => 
    axios.post('/api/listing/create',data)

export const deleteListing = async(id) => 
    axios.delete(`/api/listing/delete/${id}`)