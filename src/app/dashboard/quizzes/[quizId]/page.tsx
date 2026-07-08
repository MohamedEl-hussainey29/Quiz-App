/* eslint-disable @typescript-eslint/no-explicit-any */

import QuizDetailsCard from "../components/QuizDetailsCard"

export default async function QuizDetails({params}: any) {

  const {quizId} = await params
  return (
    <>
      <QuizDetailsCard quizId={quizId}/>
    </>
  )
}
