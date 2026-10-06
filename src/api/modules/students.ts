import axiosClient from "../axiosClient";

export const getAllStudents = () => {
    return axiosClient.get('/student');
}