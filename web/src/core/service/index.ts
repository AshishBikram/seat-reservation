import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 3000,
});

export default axiosInstance
