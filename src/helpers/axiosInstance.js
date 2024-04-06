import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

const axiosInstance = axios.create({withCredentials: true});

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
