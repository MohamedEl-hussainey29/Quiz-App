import axiosClient from "../axiosClient"


export const GetUpcommingQuizzes = ()=>{
    return axiosClient.get("/quiz/incomming");
}