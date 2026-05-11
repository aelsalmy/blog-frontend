import { api } from "../configs/axios.config"


export const getNotApprovedPosts = async (page: number , limit?: 10) => {
    try{
        const posts = await api.get("/posts/notApproved" , {
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

export const approvePost = async (postId: number) => {
    try{
        const approvedPost = await api.post(`/posts/approve/${postId}`)

        return approvedPost
    } catch (err) {
        return null
    }
}