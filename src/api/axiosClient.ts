import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://upskilling-egypt.com:3005/api",
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
      const path = window.location.pathname;
      if (error.response?.status === 401 && path != "/login" && path != "/" && path !== "/change-pass") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;