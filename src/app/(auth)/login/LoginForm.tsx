"use client"
import { AuthAPI } from '@/src/api';
import { AuthContext } from '@/src/context/AuthContext';
import { LoginFormValues } from '@/src/types/auth';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaCheckCircle, FaEnvelope, FaEye, FaEyeSlash, FaKey } from 'react-icons/fa'
import { toast } from 'sonner';

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [submitLoading , setSubmitLoading] = useState(false);

    const {register,handleSubmit,formState: { errors }} = useForm<LoginFormValues>();

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be used within AuthProvider");
    }
    const { saveUserData } = authContext;

    const onSubmit = async(data: LoginFormValues)=>{
        try {
            setSubmitLoading(true);
            const response = await AuthAPI.Login(data);
            const { accessToken, profile } = response.data.data;
            localStorage.setItem("token" , accessToken)
            saveUserData(profile);
            router.push("/dashboard")
            toast.success(response?.data?.message)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Invalid email or password");
            } else {
                toast.error("Something went wrong");
            }
        }finally{
            setSubmitLoading(false)
        }
    }
  return (
    <>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white mb-2">
              Registered email address
            </label>
            <div className="relative">
              <FaEnvelope
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? "text-red-500" : "text-white"}`}
                size={20}
              />
              <input
                type="email"
                id="email"
                placeholder="Type your email"
                className={`
                    w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all
                    ${
                    errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                        : "border-white focus:border-[#C5D86D] focus:ring-2 focus:ring-[#C5D86D]/30"
                    }
                    text-white
                `}
                {...register("email", {
                  required: "Email is required!",
                  pattern:{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message:'Email is not valid!'
                },
                validate: (value) => !/\s/.test(value) || "Email cannot contain spaces",
                })}
              />
              
            </div>
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="password" className="text-white mb-2">
              Password
            </label>
            <div className="relative">
              <FaKey
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? "text-red-500" : "text-white"}`}
                size={20}
              />
              <input
                type= {showPassword? "text" : "password"}
                id="password"
                placeholder="Type your password"
                className={`
                    w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all
                    ${
                    errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                        : "border-white focus:border-[#C5D86D] focus:ring-2 focus:ring-[#C5D86D]/30"
                    }
                    text-white
                `}
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters!",
                },
                validate: (value) => !/\s/.test(value) || "Password cannot contain spaces",
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button
                type="submit"
                className="
                    flex w-full items-center justify-center gap-2
                    rounded-xl bg-white px-8 py-4
                    font-bold text-black
                    transition-all duration-300
                    hover:bg-gray-200
                    hover:scale-[1.02]
                    active:scale-95
                    sm:w-auto cursor-pointer
                    "
            >
                {submitLoading ? 
                    <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"/>
                        Signing In...
                    </> :
                    <>  
                        <span>Sign In</span>
                        <FaCheckCircle size={20} />
                    </>
                }
                
            </button>
            <p className="text-center text-sm text-white sm:text-left">
                Forgot password? <Link href="/forget-pass" className="font-semibold text-[#C5D86D]" >Click here</Link>
            </p>
            
          </div>
        </form>
    </>
  )
}
