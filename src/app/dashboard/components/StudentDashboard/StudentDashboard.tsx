import { AlarmClockPlus } from "lucide-react";
import CompletedQuizzesCard from "../../quizzes/components/CompletedQuizzesCard";
import UpcommingQuizzesCard from "@/src/app/Shared/components/QuizzesCard/UpcommingQuizzesCard";
import JoinQuizForm from "../../quizzes/components/JoinQuizForm";
import { useState } from "react";


export default function StudentDashboard() {
  const[joinFormOpen , setJoinFormOpen] = useState(false);

  return (
    <>
      <div className='flex flex-col lg:flex-row gap-4 mt-2 mx-2 items-stretch lg:items-start h-auto lg:h-[calc(100vh-5rem)] overflow-y-auto lg:overflow-hidden'>
        <div className='flex flex-col gap-4 w-full lg:w-3/5  min-h-0'>
            <div className='flex flex-row gap-3 shrink-0'>
            <button
                onClick={()=> setJoinFormOpen(true)}
                className='border-2 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors flex-1 basis-0 lg:max-w-1/4'>
                <AlarmClockPlus className='w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16' />
                <span className='font-semibold text-center text-xs sm:text-sm lg:text-base'>
                    Join Quiz
                </span>
            </button>
            </div>

            <div className='min-h-100 lg:flex-1 lg:min-h-0 p-1'>
            <CompletedQuizzesCard maxHeight="100%" />
            </div>
        </div>

        <div className='w-full lg:w-2/5 min-h-100  lg:min-h-0 p-1'>
            <UpcommingQuizzesCard />
        </div>
      </div>
      <JoinQuizForm
        open={joinFormOpen}
        onOpenChange={setJoinFormOpen}
      />
    </>
  )
}
