
import { GroupFormData } from "@/src/app/dashboard/groups/components/GroupData"
import axiosClient from "../axiosClient"

export const GetGroupById = (id: string) => {
    return axiosClient.get(`/group/${id}`)
}

export const GetAllGroups = () => {
    return axiosClient.get("/group")
}

export const CreateGroup = (data: GroupFormData) => {
    return axiosClient.post('/group', data);
}

export const UpdateGroup = (id: string ,data: GroupFormData) => {
    return axiosClient.put(`/group/${id}`, data);
}

export const DeleteGroup = (id: string) => {
    return axiosClient.delete(`/group/${id}`)
}