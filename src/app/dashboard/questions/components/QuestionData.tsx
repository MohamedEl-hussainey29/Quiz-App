"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QuestAPI } from "@/src/api";
import { Question, QuestionFormValues } from "@/src/types/questions";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import QuestionForm from "./QuestionForm";

interface QuestionDataProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  questionInfo: Question | null
  mode: string
  refetch: () => void
}

const emptyDefaults: QuestionFormValues = {
  title: "",
  description: "",
  options: { A: "", B: "", C: "", D: "" },
  answer: "",
  type: "",
  difficulty: "",
}

export default function QuestionData({ open, onOpenChange, questionInfo, mode, refetch }: QuestionDataProps) {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<QuestionFormValues>({
    defaultValues: emptyDefaults,
  });

  useEffect(() => {
    if (!open) return;

    if (questionInfo) {
      reset({
        title: questionInfo.title ?? "",
        description: questionInfo.description ?? "",
        options: {
          A: questionInfo.options?.A ?? "",
          B: questionInfo.options?.B ?? "",
          C: questionInfo.options?.C ?? "",
          D: questionInfo.options?.D ?? "",
        },
        answer: questionInfo.answer ?? "",
        difficulty: questionInfo.difficulty ?? "",
        type: questionInfo.type ?? "",
      });
    } else {
      reset(emptyDefaults);
    }
  }, [open, questionInfo, reset]);

  const onSubmit = async (data: QuestionFormValues) => {
    setLoading(true)
    try {
      const response = mode === "edit" && questionInfo
        ? await QuestAPI.UpdateQuestion(questionInfo._id, data)
        : await QuestAPI.CreateQuestion(data);

      refetch();
      onOpenChange(false);
      toast.success(response?.data?.message)
      reset(emptyDefaults);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:max-w-3xl mx-auto max-h-[90vh] overflow-y-auto rounded-2xl border-0 p-0 shadow-xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white shadow-xl">
          <h2 className="px-4 py-3 text-base font-bold text-black sm:px-6 sm:py-4 sm:text-xl">
            {mode === "edit" ? "Edit question" : mode === "view" ? "Question Details" : "Set up a new question"}
          </h2>

          <div className="flex shrink-0">
            {mode !== "view" && (
              <button
                type="submit"
                form="question-form"
                disabled={loading}
                className="flex h-12 w-11 items-center justify-center border-l-3 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer sm:h-16 sm:w-14"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                ) : (
                  <Check className="h-5 w-5" />
                )}
              </button>
            )}

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
          <form id="question-form" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <QuestionForm mode={mode} register={register} control={control} errors={errors} />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}