import { LoginFormValues, RegisterFormValues } from "@/src/types/auth"
import axiosClient from "../axiosClient"



export const Login = (data: LoginFormValues) =>{
    return axiosClient.post("/auth/login" , data)
}

export const Logout = () =>{
    return axiosClient.get("/auth/logout")
}

export const Register = (data: RegisterFormValues) =>{
    return axiosClient.post("/auth/register" , data)
}

export const ChangePassword = (data: {password: string , password_new: string}) =>{
    return axiosClient.post("/auth/change-password" , data)
}