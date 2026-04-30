import { api } from "../../configs/axios.config";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})