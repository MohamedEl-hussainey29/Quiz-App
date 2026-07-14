import { QuizResult } from "@/src/types/quizzes";
import QuestionReviewCard from "./QuestionReviewCard";

interface QuizResultProps {
  result: QuizResult;
  studentAnswers: Record<string, string>;
}

export default function QuizResults({
  result,
  studentAnswers,
}: QuizResultProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <h1 className="text-3xl font-bold">Quiz Result</h1>

      <p className="mt-4 text-xl">
        Score: {result.score}/{result.questions.length}
      </p>

      <p className="mt-2">
        Started: {new Date(result.started_at).toLocaleString()}
      </p>

      <p>Finished: {new Date(result.finished_at).toLocaleString()}</p>

      <div className="mt-8 space-y-6">
        {result.questions.map((question, index) => (
          <QuestionReviewCard
            key={question._id}
            question={question}
            questionNumber={index + 1}
            studentAnswer={studentAnswers[question._id]}
          />
        ))}
      </div>
    </section>
  );
}
