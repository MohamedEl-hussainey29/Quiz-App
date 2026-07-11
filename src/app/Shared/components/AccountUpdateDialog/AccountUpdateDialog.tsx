"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useAuth } from "@/src/context/AuthContext";
import { AccountUpdateForm, User } from "@/src/types/auth";
import { Check, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface AccountFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userInfo: User;
}

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
          "shrink-0 self-stretch flex items-center bg-[#FFEDDF] px-2 sm:px-3 text-xs sm:text-sm font-bold text-black whitespace-nowrap",
          labelClassName
        )}
      >
        {label}
      </label>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}


export default function AccountUpdateDialog({ open, onOpenChange, userInfo}: AccountFormProps) {
  const [loading, setLoading] = useState(false);
  const { updateAccount } = useAuth();;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AccountUpdateForm>();

  useEffect(() => {
    if (!open) return;

    if (userInfo) {
      reset({
        first_name: userInfo.first_name ?? "",
        last_name: userInfo.last_name ?? "",
      });
    } else {
      reset();
    }
  }, [open, userInfo, reset]);

  const onSubmit = async (data: AccountUpdateForm) => {
    setLoading(true);
    try {
      await updateAccount(data);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:max-w-md mx-auto max-h-[90vh] overflow-y-auto rounded-2xl border-0 p-0 shadow-xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white shadow-xl">
          <h2 className="px-4 py-3 text-base font-bold text-black sm:px-6 sm:py-4 sm:text-xl">
            Update Account Info
          </h2>

          <div className="flex shrink-0"> 
            <button
              type="submit"
              form="acc-form"
              disabled={loading}
              className="flex h-12 w-11 items-center justify-center border-l-3 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer sm:h-16 sm:w-14"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              ) : (
                <Check className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex h-12 w-11 items-center justify-center border-l-3 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer sm:h-16 sm:w-14"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 py-5 sm:px-8 sm:py-8">
          <form id="acc-form" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <LabeledField label="First Name:" htmlFor="f_name">
              <input
                id="f_name"
                className="h-11 w-full bg-transparent px-3 text-sm outline-none"
                {...register("first_name", {
                  required: "First Name is required!",
                  validate: (value) =>
                    value.trim().length > 0 || "First Name cannot contain only spaces",
                })}
              />
              {errors.first_name && <span className="text-red-500">{errors.first_name.message}</span>}
            </LabeledField>
            <LabeledField label="Last Name:" htmlFor="l_name">
              <input
                id="l_name"
                className="h-11 w-full bg-transparent px-3 text-sm outline-none"
                {...register("last_name", {
                  required: "Last Name is required!",
                  validate: (value) =>
                    value.trim().length > 0 || "Last Name cannot contain only spaces",
                })}
              />
              {errors.last_name && <span className="text-red-500">{errors.last_name.message}</span>}
            </LabeledField>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}