"use client";
import { ForgetPasswordValues } from "@/src/types/auth";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { AuthAPI } from "@/src/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgetPassForm() {
  const router = useRouter();
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordValues>();

  const onSubmit = async (data: ForgetPasswordValues) => {
    try {
      setSubmitLoading(true);
      const response = await AuthAPI.ForgetPassword(data);
      toast.success(response.data.message);
      router.push("/auth/reset-pass");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-white mb-2">
            Email address
          </label>
          <div className="relative">
            <FaEnvelope
              className={`absolute left-4 top-1/2 -translate-y-1/2 text-white`}
              size={20}
            />
            <input
              type="email"
              id="email"
              placeholder="Type your email"
              className={`
                         w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all
                        
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

        <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4
                 font-bold text-black transition-all duration-300 hover:bg-gray-200 hover:scale-[1.02] active:scale-95 sm:w-auto cursor-pointer "
          >
            {submitLoading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                Sending...
              </>
            ) : (
              <>
                <span>Send email</span>
                <FaCheckCircle size={20} />
              </>
            )}
          </button>
          <p className="text-center text-md text-white sm:text-left">
            Login?{" "}
            <Link href="/auth/login" className="font-semibold text-[#C5D86D]">
              Click here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
