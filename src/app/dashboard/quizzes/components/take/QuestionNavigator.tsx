import { QuizQuestion } from "@/src/types/quizzes";

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  onQuestionChange: (index: number) => void;
  answers: Record<string, string>;
  questions: QuizQuestion[];
}

export default function QuestionNavigator({
  totalQuestions,
  currentQuestion,
  onQuestionChange,
  answers,
  questions
}: QuestionNavigatorProps) {
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-[#0D1321]">Questions</h2>

        <div className="grid grid-cols-2 gap-2">
          {questions.map((question, index) => {
            const isCurrent = currentQuestion === index;
            const isAnswered = !!answers[question._id];

            return (
              <button
                key={question._id}
                onClick={() => onQuestionChange(index)}
                className={`
        flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold transition cursor-pointer
        ${
          isCurrent && isAnswered
            ? "border-[#0D1321] bg-[#C5D86D] text-white"
            : isAnswered
              ? "border-[#C5D86D] bg-[#C5D86D] text-white"
              : isCurrent
                ? "border-[#C5D86D]"
                : "border-gray-300"
        }
      `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
