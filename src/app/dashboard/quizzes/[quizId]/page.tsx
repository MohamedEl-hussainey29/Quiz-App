/* eslint-disable @typescript-eslint/no-explicit-any */

import ProtectedRoutes from "@/src/app/Shared/components/ProtectedRoutes/ProtectedRoutes"
import QuizDetailsCard from "../components/QuizDetailsCard"

export default async function QuizDetails({params}: any) {

  const {quizId} = await params
  return (
    <>
      <ProtectedRoutes role="Instructor">
        <QuizDetailsCard quizId={quizId}/>
      </ProtectedRoutes>
    </>
  )
}
