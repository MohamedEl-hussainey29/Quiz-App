import { QuestionCardProps } from "@/src/types/quizzes";

export default function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
  onNext,
  onPrevious,
  onAnswerSelect,
  selectedAnswer,
  isLastQuestion,
  onSubmit,
  isSubmitting
}: QuestionCardProps) {
 
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold text-[#0D1321]">
          Question {currentQuestion + 1} of {totalQuestions}
        </h2>

        <p className="mb-4 text-lg text-gray-700">{question.title}</p>
        <div className="space-y-4">
          {Object.entries(question.options)
            .filter(([key]) => key !== "_id")
            .map(([key, value]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-[#C5D86D]"
              >
                <input
                  type="radio"
                  name="question"
                  value={key}
                  checked={selectedAnswer === key}
                  onChange={() => onAnswerSelect(key)}
                  className="h-5 w-5 accent-[#C5D86D] cursor-pointer"
                />

                <span>
                  <strong>{key}.</strong> {value}
                </span>
              </label>
            ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <button
            disabled={currentQuestion === 0}
            onClick={onPrevious}
            className={`cursor-pointer rounded-lg px-5 py-2 ${
              currentQuestion === 0
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "border hover:bg-gray-100"
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={() => (isLastQuestion ? onSubmit() : onNext())}
            disabled={isSubmitting}
            className={`cursor-pointer rounded-lg bg-[#C5D86D] px-5 py-2 font-medium text-[#0D1321] transition hover:opacity-90`}
          >
            {isLastQuestion
              ? isSubmitting
                ? "Submitting..."
                : "Submit Quiz"
              : "Next →"}
          </button>
        </div>
      </div>
    </>
  );
}
