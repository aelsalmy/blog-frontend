import { api } from '../configs/axios.config'

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