
import { GroupFormData } from "@/src/app/dashboard/groups/components/GroupData"
import axiosClient from "../axiosClient"

export const GetGroupById = (id: string)=>{
    return axiosClient.get(`/group/${id}`)
}

export const GetAllGroups = ()=>{
    return axiosClient.get("/group")
}

export const getAllGroups = () => {
    return axiosClient.get('/group');
}

export const createGroup = (data: GroupFormData) => {
    return axiosClient.post('/group', data);
}