import axios from 'axios'
import { api } from '../consts/api.consts'

export const login = async (username: string , password: string) => {
  const resp = await api.post("/auth/login" , {
    username: username,
    password: password
  })

  return resp.data
}