"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { QuizzesAPI } from "@/src/api";
import { JoinQuizFormValues } from "@/src/types/quizzes";
import axios from "axios";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function LabeledField({ label, htmlFor, className, labelClassName, align = "center", children }: {
  label: string;
  htmlFor?: string;
  className?: string;
  labelClassName?: string;
  align?: "center" | "start";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-xl border border-gray-200 bg-white",
        align === "start" ? "items-stretch" : "items-center",
        className
      )}
    >
      <label
        htmlFor={htmlFor}
        className={cn(
          "shrink-0 self-stretch flex items-center bg-[#FFEDDF] px-4 sm:px-5 text-sm sm:text-base font-bold text-black whitespace-nowrap",
          labelClassName
        )}
      >
        {label}
      </label>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

interface JoinQuizProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function JoinQuizForm({ open, onOpenChange}: JoinQuizProps) {
    const router = useRouter();
    const[submitLoading , setSubmitLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<JoinQuizFormValues>();

  const onSubmit = async(data: JoinQuizFormValues)=>{
    setSubmitLoading(true);
    try{
        const response = await QuizzesAPI.JoinQuiz(data);
        router.push(`/dashboard/quizzes/take/${response?.data?.data?.quiz}`);
        toast.success(response?.data?.message);
    }catch(error){
        if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong")
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("An unexpected error occurred")
      }
    }finally{
        setSubmitLoading(false);
    }
  }
  return (
    <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:max-w-lg mx-auto max-h-[90vh] overflow-y-auto rounded-3xl border-0 p-0 shadow-xl"
            >
                <form
                    id="quiz-form"
                    className="flex flex-col items-center"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex w-full flex-col items-center gap-8 px-6 pt-8 pb-10 sm:px-10 sm:pt-10 sm:pb-12">
                        <h2 className="text-center text-2xl font-bold text-black sm:text-3xl">
                            Join Quiz
                        </h2>

                        <div className="flex w-full flex-col items-center gap-6">
                            <p className="text-center text-sm text-black sm:text-base">
                                Input the code received for the quiz below to join
                            </p>

                            <div className="w-full">
                                <LabeledField label="Code" htmlFor="quiz-code">
                                    <input
                                        id="quiz-code"
                                        className="h-12 w-full bg-transparent px-3 text-sm outline-none sm:h-14"
                                        {...register("code", {
                                            required: "Quiz Code is required!",
                                            validate: (value) =>
                                            value.trim().length > 0 || "Quiz Code cannot contain only spaces",
                                        })}
                                    />
                                </LabeledField>
                                {errors.code && (
                                    <span className="mt-1 block text-sm text-red-500">
                                        {errors.code.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center overflow-hidden rounded-t-xl border border-b-0 border-gray-200">
                        <button
                            type="submit"
                            disabled={submitLoading}
                            className="flex h-14 w-16 items-center justify-center border-r border-gray-200 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer sm:h-16 sm:w-20"
                        >
                            {submitLoading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                            ) : (
                                <Check className="h-5 w-5 sm:h-6 sm:w-6" />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            disabled={submitLoading}
                            className="flex h-14 w-16 items-center justify-center transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer sm:h-16 sm:w-20"
                        >
                            <X className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </>
  )
}
