/* eslint-disable @typescript-eslint/no-explicit-any */

import TakeQuiz from "../../components/take/TakeQuiz";

interface StudentQuizProps {
  params: Promise<{
    quizId: string;
  }>;
}

export default async function StudentQuiz({params}:StudentQuizProps ) {

    const {quizId} = await params;

  return (
    <div>
      <TakeQuiz quizId={quizId}/>
       
    </div>
  )
}
