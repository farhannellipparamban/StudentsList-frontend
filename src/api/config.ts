import axios, { AxiosError, AxiosInstance } from "axios";

// The base URL for the API endpoints.
const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosAuthorized: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// request interceptor .
axiosAuthorized.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

//response interceptor .
axiosAuthorized.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export { axiosAuthorized };
