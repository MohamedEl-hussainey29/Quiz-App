"use client";
import { AuthAPI } from "@/src/api";
import { ResetPasswordValues } from "@/src/types/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeSlashFill } from "react-icons/bs";
import { FaCheckCircle, FaEnvelope, FaEye, FaKey, FaShieldAlt } from "react-icons/fa";
import { toast } from "sonner";

export default function ResetPassForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, getValues} = useForm<ResetPasswordValues>();

  const onSubmit = async ({email, otp, password}: ResetPasswordValues) => {
    try {
        setSubmitLoading(true);
        const response = await AuthAPI.ResetPassword({email, otp, password});
        toast.success(response.data.message);
        router.push('/login');
        
    } catch (error) {
        if(axios.isAxiosError(error)){
            toast.error(error.response?.data.message || 'Something went wrong');
        } else{
            toast.error('Something went wrong');
        } 
    }finally{
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-white mb-2">
            Your email address
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
              className={` w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all
                              ${
                                errors.email
                                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                                  : "border-white focus:border-[#C5D86D] focus:ring-2 focus:ring-[#C5D86D]/30"
                              }
                              text-white
                          `}
              {...register("email", {
                required: "email is required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email is not valid",
                },
                validate: (value) =>
                  !/\s/.test(value) || "Email cannot contain spaces",
              })}
            />
          </div>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="otp" className="text-white mb-2">
            OTP
          </label>
          <div className="relative">
            <FaShieldAlt
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.otp ? "text-red-500" : "text-white"}`}
              size={20}
            />
            <input
              type="text"
              id="otp"
              placeholder="Type your otp"
              className={` w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all
                            ${
                              errors.otp
                                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                                : "border-white focus:border-[#C5D86D] focus:ring-2 focus:ring-[#C5D86D]/30"
                            }
                            text-white
                        `}
              {...register("otp", { required: "OTP is required!" })}
            />
          </div>
          {errors.otp && (
            <span className="text-red-500">{errors.otp.message}</span>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="text-white mb-2 inline-block">
            Password
          </label>

          <div className="relative ">
            <FaKey
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? "text-red-500" : "text-white"}`}
              size={20}
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Type your password"
              className={` w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all
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
                validate: (value) =>
                  !/\s/.test(value) || "Password cannot contain spaces",
              })}
            />
            <div className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer z-10">
              {showPassword ? (
                <BsEyeSlashFill
                  className="text-white"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEye
                  className="text-white"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="confirmPassword" className="text-white mb-2 inline-block">
            Confirm Password
          </label>
          <div className="relative ">
            <FaKey
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.confirmPassword ? "text-red-500" : "text-white"}`}
              size={20}
            />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className={` w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all
                            ${
                              errors.confirmPassword
                                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                                : "border-white focus:border-[#C5D86D] focus:ring-2 focus:ring-[#C5D86D]/30"
                            }
                            text-white
                        `}
              {...register("confirmPassword", {
                required: "confirmPassword is required!",
                validate: (value) => value === getValues("password") || "Passwords do not match"
              })}
            />
            <div className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer z-10">
              {showConfirmPassword ? (
                <BsEyeSlashFill
                  className="text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <FaEye
                  className="text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>
          </div>
        </div>

        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}

        <button type="submit"
            className=" md:my-5 mt-10 flex w-full items-center justify-center gap-2
             rounded-xl bg-white px-8 py-4 font-bold text-black transition-all duration-300 hover:bg-gray-200
             hover:scale-[1.02] active:scale-95 sm:w-auto cursor-pointer"
                >
                  {submitLoading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                      Reseting...
                    </>
                  ) : (
                    <>
                      <span>Reset</span>
                      <FaCheckCircle size={20} />
                    </>
                  )}
                </button>
      </form>
    </>
  );
}
