/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function QuizDetails({params}: any) {

  const {quizId} = await params
  return (
    <>
      <div>QuizDetails</div>
      <h1> Quiz ID is : {quizId}</h1>
    </>
  )
}
