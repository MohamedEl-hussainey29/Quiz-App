
export interface Quiz{
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
    participants: number
}

export interface QuizFormValues{
    title:string;
    description:string;
    group:string;
    questions_number:number;
    difficulty:string;
    type:string;
    schadule:string;
    duration:number;
    score_per_question: number;
}