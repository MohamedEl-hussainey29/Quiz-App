export interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: string[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  participants: number;
}

export interface QuizFormValues {
  title: string;
  description: string;
  group: string;
  questions_number: number;
  difficulty: string;
  type: string;
  schadule: string;
  duration: number;
  score_per_question: number;
}

export interface DetailedQuiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: QuizQuestion[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface JoinQuizFormValues {
  code: string;
}

export interface QuizOptions {
  _id: string;
  A: string;
  B: string;
  C: string;
  D: string;
}
export interface QuizQuestion {
  _id: string;
  title: string;
  options: QuizOptions;
}

export interface QuestionCardProps {
  question: QuizQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  onAnswerSelect: (answer: string) => void;
  selectedAnswer?: string;
  isLastQuestion: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
  quizResult: QuizResult | null;
  studentAnswers: Record<string, string>;
}

export interface SubmitQuizPayload {
  answers: {
    question: string;
    answer: string;
  }[];
}

export interface QuizResultQuestion {
  _id: string;
  title: string;
  options: {
    _id: string;
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
}

export interface QuizResult {
  _id: string;
  quiz: string;
  participant: string;
  score: number;
  started_at: string;
  finished_at: string;
  questions: QuizResultQuestion[];
}