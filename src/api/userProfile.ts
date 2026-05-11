import { api } from "../configs/axios.config"

export const getUserAcc = async () => {
    try{
        const resp = await api.get("/users")

        return resp.data
    } catch (err) {
        return null
    }
}

export const updateProfile = async (profession: string , city: string , country: string) => {
    try{
        const resp = await api.put("/users/profile" , {
            profession,
            city,
            country
        })

        return resp.data
    } catch (err) {
        return null
    }
}