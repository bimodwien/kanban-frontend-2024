import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

export function axiosInstance(): AxiosInstance {
  const token = getCookie("access_token") || "";
  return axios.create({
    baseURL: "https://kanban-backend-2024-production.up.railway.app/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
}
