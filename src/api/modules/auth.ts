import { AccountUpdateForm, ForgetPasswordValues, LoginFormValues, RegisterFormValues, ResetPasswordValues } from "@/src/types/auth"
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

export const ForgetPassword = (data: ForgetPasswordValues) =>{
    return axiosClient.post("/auth/forgot-password" , data)
}

export const ResetPassword = (data: ResetPasswordValues) =>{
    return axiosClient.post("/auth/reset-password" , data)
}

export const UpdateAccount = (data: AccountUpdateForm) =>{
    return axiosClient.put("/student" , data)
}