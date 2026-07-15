import { QuizResultQuestion } from "@/src/types/quizzes";

interface QuestionReviewCardProps {
  question: QuizResultQuestion;
  questionNumber: number;
  studentAnswer: string;
}

export default function QuestionReviewCard({
  question,
  questionNumber,
  studentAnswer,
}: QuestionReviewCardProps) {
  const getOptionStyle = (optionKey: string) => {
    if (optionKey === studentAnswer && studentAnswer === question.answer) {
      return "border-green-500 bg-green-50";
    }

    if (optionKey === studentAnswer && studentAnswer !== question.answer) {
      return "border-red-500 bg-red-50";
    }

    if (optionKey === question.answer) {
      return "border-green-500 bg-green-50";
    }

    return "border-gray-200";
  };

  const studentAnswerText =
    studentAnswer &&
    question.options[studentAnswer as keyof typeof question.options];

  const correctAnswerText =
    question.options[question.answer as keyof typeof question.options];

    
  return (
    <div className="rounded-xl border border-gray-200 p-8 mb-3">
      <h2 className="font-semibold">Question {questionNumber}</h2>

      <p className="mt-2">{question.title}</p>

      <div className="mt-4 space-y-3">
        {Object.entries(question.options)
          .filter(([key]) => key !== "_id")
          .map(([key, value]) => (
            <div
              key={key}
              className={`rounded-lg border p-3 ${getOptionStyle(key)}`}
            >
              <strong>{key}.</strong> {value}
            </div>
          ))}
      </div>
      <div className="mt-5 rounded-lg bg-gray-50 p-4 text-sm">
  <p>
    <span className="font-semibold text-[#0D1321]">
      Your Answer:
    </span>{" "}
    {studentAnswer ? (
      <>
        {studentAnswer}. {studentAnswerText}
      </>
    ) : (
      <span className="text-red-500">Not answered</span>
    )}
  </p>

  <p className="mt-2">
    <span className="font-semibold text-[#0D1321]">
      Correct Answer:
    </span>{" "}
    {question.answer}. {correctAnswerText}
  </p>
</div>
    </div>
  );
}
