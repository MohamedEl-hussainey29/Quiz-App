import { Group } from "./groups";

export interface LoginFormValues{
    email: string;
    password: string;
}

export interface RegisterFormValues{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
}

export interface ChangePassFormValues{
    password: string;
    password_new: string;
    password_confirm: string;
}

export interface ForgetPasswordValues{
    email: string;
}

export interface ResetPasswordValues{
    otp: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface User{
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    role: string;
    group?: Group;
}

export interface AccountUpdateForm{
    first_name: string;
    last_name: string;
}