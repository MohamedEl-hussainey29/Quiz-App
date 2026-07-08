import { QuestionFormValues } from "@/src/types/questions";
import axiosClient from "../axiosClient";

export const GetAllQuestions = ()=>{
    return axiosClient.get("/question");
}

export const GetQuestionById = (id: string)=>{
    return axiosClient.get(`/question/${id}`);
}

export const CreateQuestion = (data: QuestionFormValues)=>{
    return axiosClient.post("/question", data);
}

export const UpdateQuestion = (id: string, data: QuestionFormValues)=>{
    return axiosClient.put(`/question/${id}`, data);
}

export const DeleteQuestion = (id: string)=>{
    return axiosClient.delete(`/question/${id}`);
}