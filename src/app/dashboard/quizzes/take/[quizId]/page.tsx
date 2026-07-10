/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function StudentQuiz({params}:any ) {
    const {quizId} = await params;
  return (
    <div>
        {quizId}
    </div>
  )
}
