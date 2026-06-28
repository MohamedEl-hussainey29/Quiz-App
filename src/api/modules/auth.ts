import { loginFormValues, RegisterFormValues } from "@/src/types/auth"
import axiosClient from "../axiosClient"



export const Login = (data: loginFormValues) =>{
    return axiosClient.post("/auth/login" , data)
}

export const Logout = () =>{
    return axiosClient.get("/auth/logout")
}

export const Register = (data: RegisterFormValues) =>{
    return axiosClient.post("/auth/register" , data)
}