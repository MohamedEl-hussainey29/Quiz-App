"use client"

import { useState } from "react"
import { Check, X, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface DeleteConfirmProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  item: string
  itemData: {
    _id: string;
    description: string
  } | null | undefined;
  displayName?: string;
}

export function DeleteConfirmation({ open, onOpenChange, onConfirm, item, itemData, displayName }: DeleteConfirmProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!itemData?._id) return
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
                    Delete {item}
                </h2>

                <div className="flex shrink-0">
                    <button
                    onClick={handleConfirm}
                    disabled={loading || !itemData?._id}
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
                <Trash2 className="h-6 w-6" />
            </div>

            <DialogTitle className="text-lg font-semibold sm:text-xl">
                {loading ? `Deleting ${item}...` : `Delete ${displayName ?? item}?`}
            </DialogTitle>

            <DialogDescription className="mt-2 text-sm leading-6 text-black sm:text-base">
                {itemData?.description}
            </DialogDescription>

            <DialogDescription className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                This action cannot be undone.
            </DialogDescription>
            </div>
        </DialogContent>
    </Dialog>
  )
}