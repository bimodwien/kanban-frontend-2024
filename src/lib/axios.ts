import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

export function axiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: "https://kanban-backend-2024-production.up.railway.app/api/",
    withCredentials: true,
  });
}
