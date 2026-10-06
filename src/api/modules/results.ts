import axiosClient from "../axiosClient";

export const getAllResults = () => {
    return axiosClient.get('/quiz/result');
}