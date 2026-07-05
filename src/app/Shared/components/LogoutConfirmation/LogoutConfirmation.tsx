"use client"

import { useState } from "react"
import { Check, X , LogOut } from "lucide-react"
import {Dialog,DialogContent,DialogTitle,DialogDescription} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface LogoutConfirmProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function LogoutConfirmation({
  open,
  onOpenChange,
  onConfirm,
}: LogoutConfirmProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
    } finally {
      setLoading(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
            showCloseButton={false}
            className="w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border-0 p-0 shadow-xl"
        >
            {/* Header */}
            <div className="flex items-center justify-between shadow-xl">
                <h2 className="px-4 py-4 text-lg font-bold text-black sm:px-6 sm:text-xl">
                    Logout
                </h2>

                <div className="flex shrink-0">
                    <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className={cn(
                        "flex h-16 w-14 items-center justify-center border-l-3 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                    )}
                    >
                    {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"/> : <Check className="h-5 w-5" />}
                    </button>

                    <button
                    onClick={() => onOpenChange(false)}
                    disabled={loading}
                    className="flex h-16 w-14 items-center justify-center border-l-3 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                    >
                    <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="px-5 py-6 text-center sm:px-8 sm:py-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFEDDF] text-red-500">
                <LogOut className="h-6 w-6" />
            </div>

            <DialogTitle className="text-lg font-semibold sm:text-xl">
                {loading? "Logging out ..." :"Log out?"}
            </DialogTitle>

            <DialogDescription className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                You &apos;ll need to sign in again to access your account.
            </DialogDescription>
            </div>
        </DialogContent>
    </Dialog>
  )
}