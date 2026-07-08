"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface QuizSuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  code: string
}

export default function QuizSuccessDialog({ open, onOpenChange, code }: QuizSuccessDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-2rem)] max-w-sm rounded-2xl border-0 p-8 text-center shadow-xl"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0F1C2E]">
          <Check className="h-8 w-8 text-white" strokeWidth={3} />
        </div>

        <h2 className="mt-4 text-lg font-bold text-black sm:text-xl">
          Quiz was successfully created
        </h2>

        <div className="mt-6 flex items-center overflow-hidden rounded-full border border-gray-200 bg-white">
          <span className="shrink-0 rounded-full bg-[#FFEDDF] px-5 py-2 text-sm font-bold text-black">
            CODE:
          </span>
          <span className="flex-1 px-3 text-sm font-semibold tracking-wide text-black">
            {code}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="mr-3 shrink-0 text-gray-500 hover:text-black cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="mt-6 w-full rounded-full bg-[#C5D86D] py-3 text-sm font-bold text-black transition hover:brightness-95 cursor-pointer"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  )
}