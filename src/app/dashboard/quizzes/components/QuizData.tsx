"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GroupsAPI, QuizzesAPI } from "@/src/api";
import { Quiz, QuizFormValues } from "@/src/types/quizzes";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import QuizForm from "./QuizForm";
import useGetData from "@/src/hooks/useGetData";
import { Group } from "@/src/types/groups";
import QuizSuccessDialog from "./QuizSuccessDialog";

interface QuizDataProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quizInfo?: Quiz | null
}

const emptyDefaults: QuizFormValues = {
    title:"",
    description:"",
    group:"",
    questions_number: 5,
    difficulty:"",
    type:"",
    schadule:"",
    duration: 10,
    score_per_question: 1,
}

export default function QuizData({ open, onOpenChange, quizInfo}: QuizDataProps) {
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [quizCode, setQuizCode] = useState("");

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<QuizFormValues>({
    defaultValues: emptyDefaults,
  });

  useEffect(() => {
    if (!open) return;

    if (quizInfo) {
      reset({
        title: quizInfo.title ?? "",
        description: quizInfo.description ?? "",
        group: quizInfo.group ?? "",
        questions_number: quizInfo.questions_number ?? 1,
        difficulty: quizInfo.difficulty ?? "",
        type: quizInfo.type ?? "",
        schadule: quizInfo.schadule ?? "",
        duration: quizInfo.duration ?? "",
        score_per_question: quizInfo.score_per_question ?? 1 ,
      });
    } else {
      reset(emptyDefaults);
    }
  }, [open, quizInfo, reset]);

  const { data: allGroups } = useGetData<Group[]>(
    GroupsAPI.GetAllGroups
  );

  const onSubmit = async (data: QuizFormValues) => {
    setLoading(true)
    try {
      const response = quizInfo
        ? await QuizzesAPI.UpdateQuiz(quizInfo._id, data)
        : await QuizzesAPI.CreateQuiz(data);

      onOpenChange(false);
      reset(emptyDefaults);

      if (!quizInfo) {
        setQuizCode(response?.data?.data?.code ?? "");
        setSuccessOpen(true);
      } else {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:max-w-3xl mx-auto max-h-[90vh] overflow-y-auto rounded-2xl border-0 p-0 shadow-xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between bg-white shadow-xl">
            <h2 className="px-4 py-3 text-base font-bold text-black sm:px-6 sm:py-4 sm:text-xl">
              {quizInfo ? "Edit Quiz": "Set up a new Quiz"}
            </h2>

            <div className="flex shrink-0">
                <button
                  type="submit"
                  form="quiz-form"
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
            <form id="quiz-form" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <QuizForm mode={quizInfo ? "edit" : "create"} register={register} control={control} errors={errors} groups={allGroups} />
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <QuizSuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        code={quizCode}
      />
    </>
  )
}