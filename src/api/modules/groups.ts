import axiosClient from "../axiosClient"

export const GetGroupById = (id: string)=>{
    return axiosClient.get(`/group/${id}`)
}

export const GetAllGroups = ()=>{
    return axiosClient.get("/group")
}