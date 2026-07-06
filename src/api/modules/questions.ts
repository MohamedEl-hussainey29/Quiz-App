import axiosClient from "../axiosClient";

export const GetAllQuestions = ()=>{
    return axiosClient.get("/question");
}

export const DeleteQuestion = (id: string)=>{
    return axiosClient.delete(`/question/${id}`);
}