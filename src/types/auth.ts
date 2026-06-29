
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