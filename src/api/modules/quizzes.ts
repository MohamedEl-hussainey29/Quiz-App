import axiosClient from "../axiosClient"


export const GetUpcommingQuizzes = ()=>{
    return axiosClient.get("/quiz/incomming");
}

export const GetCompletedQuizzes = ()=>{
    return axiosClient.get("/quiz/completed");
}