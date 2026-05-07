import { api } from "../configs/axios.config"


export const getAllPosts = async (page: number , limit?: 10) => {
    try{
        const posts = await api.get("/posts" , {
            params: {
                page: page,
                limit: limit
            }
        })

        return posts
    } catch (err) {
        return null
    }
}

export const getUserPosts = async (page: number , limit?: 10) => {
    try{
        const posts = await api.get("/posts/user/myPosts" , {
            params: {
                page: page,
                limit: limit
            }
        })

        return posts
    } catch (err) {
        return null
    }
}

export const createPost = async (content: string) => {
    try{
        const resp = await api.post("/posts" , {
            content: content
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

export const publishPost = async (postId: number) => {
    try{
        const resp = await api.post(`/posts/${postId}`)
    
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

export const deletePost = async (postId: number) => {
    try{
        const resp = await api.delete(`/posts/${postId}`)
    
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