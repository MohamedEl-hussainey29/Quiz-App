import axiosClient from "../axiosClient";

export const GetAllQuestions = ()=>{
    return axiosClient.get("/question");
}