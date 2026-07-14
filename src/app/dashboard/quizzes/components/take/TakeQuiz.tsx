"use client";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import QuestionNavigator from "./QuestionNavigator";
import { DetailedQuiz, QuizResult } from "@/src/types/quizzes";
import { QuizzesAPI } from "@/src/api";
import { toast } from "sonner";
import QuizResults from "../results/QuizResults";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";

interface TakeQuizProps {
  quizId: string;
}

export default function TakeQuiz({ quizId }: TakeQuizProps) {
  const [quiz, setQuiz] = useState<DetailedQuiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoSubmitted, setIsAutoSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [question._id]: answer }));
  };

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await QuizzesAPI.GetQuestionsWithoutAnswers(quizId);
        setTimeLeft(response.data.data.duration * 60);
        setQuiz(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && quiz && !isSubmitting && !isAutoSubmitted) {
      toast.warning("Time is up! Submitting your quiz...");
      setIsAutoSubmitted(true);
      handleSubmit(true);
    }
  }, [timeLeft, quiz, isSubmitting, isAutoSubmitted]);


if (!quiz) {
  return (
    <div className="flex flex-1  items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle
          className="h-12 w-12 animate-spin text-[#C5D86D]"
        />

        <p className="text-lg font-medium text-gray-600">
          Preparing your quiz...
        </p>
      </div>
    </div>
  );
}

  if (quizResult) {
    return <QuizResults result={quizResult} studentAnswers={answers} />;
  }

  const questions = quiz.questions;
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSubmit = async (isAutoSubmit = false) => {
    
    if (!isAutoSubmit && Object.keys(answers).length !== questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        answers: Object.entries(answers).map(([question, answer]) => ({
          question,
          answer,
        })),
      };

      const response = await QuizzesAPI.SubmitQuiz(quiz._id, payload);
      setQuizResult(response.data.data);

      toast.success(response.data.message);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="min-h-[calc(100vh - 70px)] p-6 rounded-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0D1321]">{quiz.title}</h1>

            <p className="mt-2 text-gray-500">
              {quiz.questions_number} Questions • {quiz.duration} min •{" "}
              {quiz.difficulty}
            </p>
          </div>

          <div className="rounded-xl bg-red-50 px-5 py-3 text-center">
            <p className="text-sm text-red-500">Time Left</p>

            <p className="text-2xl font-bold text-red-600">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
          <QuestionCard
            question={question}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={answers[question._id]}
            isLastQuestion={isLastQuestion}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            quizResult={quizResult}
            studentAnswers={answers}
          />

          <QuestionNavigator
            totalQuestions={questions.length}
            currentQuestion={currentQuestion}
            onQuestionChange={setCurrentQuestion}
            answers={answers}
            questions={questions}
          />
        </div>
      </section>
    </>
  );
}
