import { QuizFormValues } from "@/src/types/quizzes";
import axiosClient from "../axiosClient"


export const GetUpcommingQuizzes = ()=>{
    return axiosClient.get("/quiz/incomming");
}

export const GetCompletedQuizzes = ()=>{
    return axiosClient.get("/quiz/completed");
}

export const GetQuizById = (id: string)=>{
    return axiosClient.get(`/quiz/${id}`);
}

export const CreateQuiz = (data: QuizFormValues)=>{
    return axiosClient.post("/quiz", data);
}

export const UpdateQuiz = (id: string, data: QuizFormValues)=>{
    return axiosClient.put(`/quiz/${id}`, data);
}