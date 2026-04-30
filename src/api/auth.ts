import { api } from '../configs/axios.config'
import type { CreateUserDto } from '../schemas/auth.schemas'

export const login = async (username: string , password: string) => {
  try{
    const resp = await api.post("/auth/login" , {
      username: username,
      password: password
    })

    return {
      status: true,
      resp: resp
    }
  }
  catch(err:any){
    console.log(err.response.data.message)
    return {
      status: false , 
      message: err.response.data.message
    }
  }
}

export const logout = async () => {
  try{
    const resp = await api.post("/auth/signout")
    return {
      status: true,
      resp: resp
    }
  }
  catch(err:any){
    console.log(err.response.data.message)
    return {
      status: false , 
      message: err.response.data.message
    }
  }
}

export const register = async (values: CreateUserDto) => {
  try{
    const resp = await api.post("/users" , {
      username: values.username,
      email: values.email,
      password: values.password,
      profile: {
        profession: values.profession,
        city: values.city,
        country: values.country
      }
    })

    return {
      status: true,
      resp: resp
    }
  }
  catch(err:any){
    return {
      status: false,
      resp: err.response,
      message: err.response.data.message
    }
  }
}