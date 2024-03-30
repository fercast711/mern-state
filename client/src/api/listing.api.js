import axios from "axios";

export const createListing = async(data) => 
    axios.post('/api/listing/create',data)