import Link from "next/link";
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quiz Result</h1>
          <p className="mt-4 text-xl">
            Score: {result.score}
          </p>
          <p className="mt-2">
            Started: {new Date(result.started_at).toLocaleString()}
          </p>
          <p>Finished: {new Date(result.finished_at).toLocaleString()}</p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex w-full items-center justify-center rounded-lg bg-[#C5D86D] px-4 py-2 text-sm font-medium text-black transition sm:w-auto"
        >
          Back to home
        </Link>
      </div>

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