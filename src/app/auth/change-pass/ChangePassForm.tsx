"use client"
import { AuthAPI } from '@/src/api';
import { ChangePassFormValues } from '@/src/types/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaCheckCircle, FaEye, FaEyeSlash, FaKey } from 'react-icons/fa'
import { toast } from 'react-toastify';

export default function ChnagePassForm() {
    const router = useRouter();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitLoading , setSubmitLoading] = useState(false);

    const {register,handleSubmit,formState: { errors } , watch} = useForm<ChangePassFormValues>();
    const newPassword = watch("password_new");

    const onSubmit = async(data: ChangePassFormValues)=>{
        try {
            setSubmitLoading(true);
            const payload = {password: data.password , password_new: data.password_new};
            const response = await AuthAPI.ChangePassword(payload);
            router.push("/dashboard");
            toast.success(response?.data?.message);
        } catch (error) {
           if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message);
           } else {
                toast.error("Something went wrong");
           }
        }finally{
            setSubmitLoading(false);
        }
    }
  return (
    <>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="oldPassword" className="text-white mb-2">
              Old Password
            </label>
            <div className="relative">
              <FaKey
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? "text-red-500" : "text-white"}`}
                size={20}
              />
              <input
                type= {showOldPassword? "text" : "password"}
                id="oldPassword"
                placeholder="Type your Old password"
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
                  required: "Old Password is required!",
                  minLength: {
                  value: 8,
                  message: "Old Password should be at least 8 characters!",
                },
                validate: (value) => !/\s/.test(value) || "Old Password cannot contain spaces",
                })}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showOldPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="newPassword" className="text-white mb-2">
              New Password
            </label>
            <div className="relative">
              <FaKey
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password_new ? "text-red-500" : "text-white"}`}
                size={20}
              />
              <input
                type= {showNewPassword? "text" : "password"}
                id="password"
                placeholder="Type your New password"
                className={`
                    w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all
                    ${
                    errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                        : "border-white focus:border-[#C5D86D] focus:ring-2 focus:ring-[#C5D86D]/30"
                    }
                    text-white
                `}
                {...register("password_new", {
                  required: "New Password is required!",
                  minLength: {
                  value: 8,
                  message: "New Password should be at least 8 characters!",
                },
                validate: (value) => !/\s/.test(value) || "New Password cannot contain spaces",
                })}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password_new && <span className="text-red-500">{errors.password_new.message}</span>}
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="confirmPassword" className="text-white mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <FaKey
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password_confirm ? "text-red-500" : "text-white"}`}
                size={20}
              />
              <input
                type= {showConfirmPassword? "text" : "password"}
                id="password"
                placeholder="Type your Confirm password"
                className={`
                    w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all
                    ${
                    errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                        : "border-white focus:border-[#C5D86D] focus:ring-2 focus:ring-[#C5D86D]/30"
                    }
                    text-white
                `}
                {...register("password_confirm", {
                  required: "Confirm Password is required!",
                  minLength: {
                  value: 8,
                  message: "Confirm Password should be at least 8 characters!",
                },
                validate: (value) => value === newPassword || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password_confirm && <span className="text-red-500">{errors.password_confirm.message}</span>}
          </div>
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                        Changing...
                    </> :
                    <>  
                        <span>Change</span>
                        <FaCheckCircle size={20} />
                    </>
                }
                
            </button>
            
          </div>
        </form>
    </>
  )
}
