import { Student } from "./students";

export interface Result{
    quiz: {
        _id: string;
        code: string;
        title: string;
        description: string;
        status: string;
        instructor: string;
        group: string;
        questions_number: number;
        schadule: string;
        duration: number;
        score_per_question: number;
        type: string;
        difficulty: string;
        updatedAt: string;
        createdAt: string;
        __v: number;
        closed_at: string;
    },
    participants: Student[]
}