import axios from "axios";

export const updateUser = async(id,data) => 
    axios.patch(`/api/user/update/${id}`,data)