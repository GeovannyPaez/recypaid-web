import { API_URL } from "@/config";
import axios from "axios";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default api;
