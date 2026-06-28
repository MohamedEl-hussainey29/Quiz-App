import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
});

axiosClient.interceptors.request.use(
  (config) => {
    // This code only runs in the browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const isAuthPage = window.location.pathname.startsWith("/auth");

      if (error.response?.status === 401 && !isAuthPage) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;