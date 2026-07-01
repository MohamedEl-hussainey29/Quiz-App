"use client";
import { useState } from "react";
import {
  FaRegAddressCard,
  FaUser,
  FaEnvelope,
  FaKey,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { RegisterFormValues } from "@/src/types/auth";
import { AuthAPI } from "@/src/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setSubmitLoading(true);
      const response = await AuthAPI.Register(data);
      toast.success(response.data.message);
      router.push('/auth/login');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong");
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
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="text-white mb-2 inline-block">
              Your first name
            </label>

            <div className="relative ">
              <FaRegAddressCard
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.first_name ? "text-red-500" : "text-white"}`}
                size={20}
              />
              <input
                id="firstName"
                type="text"
                placeholder="Type your first name"
                className={`
                  w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all
                  ${
                  errors.first_name
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-white focus:border-[#C5D86D] focus:ring-2 focus:ring-[#C5D86D]/30"
                  }
                  text-white
              `}
                {...register("first_name", {
                  required: "First Name is required",
                  minLength: {
                    value: 3,
                    message: "first name must be more than 3 characters",
                  },
                })}
              />
            </div>
            {errors.first_name && (
              <span className="text-red-500">
                {" "}
                {errors.first_name.message}{" "}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="text-white mb-2 inline-block">
              Your last name
            </label>

            <div className="relative ">
              <FaRegAddressCard
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.last_name ? "text-red-500" : "text-white"}`}
                size={20}
              />
              <input
                id="lastName"
                type="text"
                placeholder="Type your last name"
                className={`
                  w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all
                  ${
                  errors.last_name
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-white focus:border-[#C5D86D] focus:ring-2 focus:ring-[#C5D86D]/30"
                  }
                  text-white
              `}
                {...register("last_name", {
                  required: "Last Name is required",
                  minLength: {
                    value: 3,
                    message: "last name must be more than 3 characters",
                  },
                })}
              />
            </div>
            {errors.last_name && (
              <span className="text-red-500">{errors.last_name.message}</span>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-4">
        <div className="mt-4">
          <label htmlFor="email" className="text-white mb-2 inline-block">
            Your email address
          </label>

          <div className="relative ">
            <FaEnvelope
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? "text-red-500" : "text-white"}`}
              size={20}
            />
            <input
              id="email"
              type="email"
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
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email is not valid!",
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
        </div>

        <div className="mt-4">
          <label htmlFor="role" className="text-white mb-2 inline-block">
            Your role
          </label>

          <div className="relative ">
            <FaUser
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.role ? "text-red-500" : "text-white"}`}
              size={20}
            />
            <select
              defaultValue=""
              id="role"
              className={`
                  w-full rounded-xl py-3 pl-12 pr-12 outline-none border-2 transition-all appearance-none
                  ${
                  errors.role
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-white focus:border-[#C5D86D] focus:ring-2 focus:ring-[#C5D86D]/30"
                  }
                  text-white
              `}
              {...register("role", {
                required: "role is required!",
              })}
            >
              <option value="" disabled>
                Choose your role
              </option>
              <option value="Student" className="text-black">
                Student
              </option>
              <option value="Instructor" className="text-black">
                Instructor
              </option>
            </select>
            <IoChevronDown className="absolute top-1/2 right-4 -translate-y-1/2 text-white pointer-events-none" />
          </div>
          {errors.role && <span className="text-red-500">{errors.role.message}</span>}
        </div>

        <button
          type="submit"
          className=" my-5
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
          {submitLoading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
              Signing Up...
            </>
          ) : (
            <>
              <span>Sign Up</span>
              <FaCheckCircle size={20} />
            </>
          )}
        </button>
      </form>
    </>
  );
}
