"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, Clock3, Pencil, Trash2 } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { QuizzesAPI } from "@/src/api"

import { Quiz } from "@/src/types/quizzes"
import NoData from "@/src/app/Shared/components/NoData/NoData"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import QuizData from "./QuizData"
import { DeleteConfirmation } from "@/src/app/Shared/components/DeleteConfirmation/DeleteConfirmation"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between overflow-hidden rounded-xl border border-gray-200 bg-white">
      <span className="m-1 shrink-0 rounded-full bg-[#FFEDDF] px-4 py-2 text-sm font-semibold text-black">
        {label}
      </span>
      <span className="pr-4 text-sm text-gray-700 font-semibold">{value}</span>
    </div>
  )
}

function DetailRowSkeleton() {
  return (
    <div className="flex items-center justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-1">
      <Skeleton className="h-8 w-32 rounded-full" />
      <Skeleton className="mr-4 h-4 w-16" />
    </div>
  )
}

function QuizDetailsSkeleton() {
  return (
    <Card className="w-full max-w-md sm:mx-2">
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <div className="mt-1 flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-5 items-center">
          <DetailRowSkeleton />
          <DetailRowSkeleton />
        </div>
        <DetailRowSkeleton />
        <DetailRowSkeleton />
        <DetailRowSkeleton />

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <Skeleton className="h-8 w-full rounded-none" />
          <div className="px-4 py-3 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <DetailRowSkeleton />
          <DetailRowSkeleton />
        </div>

        <div className="flex justify-end gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

interface QuizDetailsCardProps {
  quizId: string;
}

export default function QuizDetailsCard({ quizId }: QuizDetailsCardProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const router = useRouter();


  const getQuiz = useCallback(async () => {
    if (!quizId) return
    setLoading(true)
    try {
      const response = await QuizzesAPI.GetQuizById(quizId)
      setQuiz(response.data)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }, [quizId])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getQuiz()
  }, [getQuiz])

  const deleteQuiz = async () => {
    if (!quiz?._id) return;
    try {
      const response = await QuizzesAPI.DeleteQuiz(quiz?._id);
      router.replace("/dashboard/quizzes");
      toast.success(response?.data?.message)
      setQuiz(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  if (loading) {
    return (
      <>
        <Breadcrumb className="my-4 mx-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/quizzes">Quizzes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Skeleton className="h-4 w-24" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <QuizDetailsSkeleton />
      </>
    )
  }

  if (!quiz) {
    return <NoData item="Quiz" />
  }

  const isClosed = quiz.status?.toLowerCase() === "closed";

  const date = new Date(quiz.schadule)
  const formattedDate = `${pad(date.getDate())} / ${pad(date.getMonth() + 1)} / ${date.getFullYear()}`
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <>
      <Breadcrumb className="my-4 mx-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/quizzes">Quizzes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-black font-semibold">
            <BreadcrumbLink>{quiz.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="w-full max-w-md sm:mx-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{quiz.title}</CardTitle>
          <div className="mt-1 flex items-center gap-4 text-sm text-gray-700">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock3 className="h-4 w-4" />
              {formattedTime}
            </span>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <div className="flex gap-5 items-center">
            <DetailRow label="Category Type" value={`${quiz.type}`} />
            <DetailRow label="Difficulty" value={`${quiz.difficulty}`} />
          </div>
          <DetailRow label="Duration" value={`${quiz.duration} Minutes`} />
          <DetailRow label="Number of questions" value={`${quiz.questions_number} Questions`} />
          <DetailRow label="Score per question" value={`${quiz.score_per_question} Points`} />

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <span className="block bg-[#FFEDDF] px-4 py-2 text-sm font-semibold text-black">
              Description
            </span>
            <p className="whitespace-pre-line px-4 py-3 text-sm text-gray-700">
              {quiz.description}
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <DetailRow label="Status" value={quiz.status} />
            <DetailRow label="Join Code" value={quiz.code} />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setDeleteOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
            {!isClosed &&
              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-[#0F1C2E] px-4 py-2 text-sm font-semibold text-white cursor-pointer"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
            }
          </div>
        </CardContent>
      </Card>

      <QuizData
        open={editOpen}
        onOpenChange={setEditOpen}
        quizInfo={quiz}
        quizRefetch={getQuiz}
      />
      <DeleteConfirmation
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={deleteQuiz}
        item="Quiz"
        itemData={quiz}
        displayName={quiz?.title}
      />
    </>
  )
}