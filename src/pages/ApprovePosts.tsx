import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { Alert, CircularProgress, Grid, Snackbar } from "@mui/material";
import { Post } from "../components/post";
import { approvePost, getNotApprovedPosts } from "../api/admin";

const LoadingDiv = styled("div")({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
    marginBottom: "16px"
})

export function ApprovePostsPage() {
    const [posts , setPosts] = useState<Post[]>([])
    const [page , setPage] = useState(1)
    const allRendered = useRef(false)
    const loaderRef = useRef(null)
    const [loading , setLoading] = useState(true)
    const [errorPopupShow , setErrorPopupShow] = useState(false)

    const getPosts = async () => {          
        
        if(!allRendered.current){
            const resp = await getNotApprovedPosts(page)

            if(!resp) return

            if (page > resp.data.lastPage) return 

            const newPosts: Post[] = resp.data.posts

            setPosts((prev) => {
                const existingIds = new Set(prev.map(p => p.id));
                const filtered = newPosts.filter(p => !existingIds.has(p.id));
                return [...prev, ...filtered];
            });

            if (page === resp.data.lastPage) {
                allRendered.current = true
                setLoading(false)
            }

        } else {
            console.log("all posts rendered")
        }
    }

    const handleApprove = async (postId: number) => {
        const approvedPost = await approvePost(postId)

        if(approvedPost){

        } else {
            setErrorPopupShow(true)
        }
    }

    useEffect(() => {
        console.log(page)
        getPosts()
    } , [page])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if(entries[0].isIntersecting){
                    setPage((prev) => allRendered.current ? prev : prev + 1)
                }
            },
            {threshold: 1}
        );

        if(loaderRef.current){
            observer.observe(loaderRef.current)
        }

        return () => observer.disconnect()
    } , [])

    return (
        <>
            <Grid sx={{display: "flex" , justifyContent:"center"}} container spacing={2}>
                <Grid size={8}>
                    <Snackbar
                        open={errorPopupShow}
                        autoHideDuration={3000}
                        onClose={() => setErrorPopupShow(false)}
                    >
                        <Alert severity="error" onClose={() => setErrorPopupShow(false)}>
                            Something went wrong
                        </Alert>
                    </Snackbar>
                    {posts.map((post) => <Post isAdmin={true} post={post} onApproval={handleApprove}/>)}
                    
                    <LoadingDiv ref={loaderRef} style={{ height: "50px" }}>
                        {
                        posts.length !== 0? 
                            loading && <CircularProgress size={32}/>:
                            "No Posts Yet!!"    
                        }
                    </LoadingDiv>
                </Grid>
            </Grid>
        </>
    )
}