import { Button, CircularProgress, Grid, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getUserPosts } from "../api/posts";
import { Post } from "../components/post";
import { HorizontalCenteredWrapper } from "../components/wrappers/CenteredWrapper.styled";
import { useNavigate } from "react-router-dom";

const LoadingDiv = styled("div")({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
    marginBottom: "16px"
})

export function MyPostsPage() {
    const [posts , setPosts] = useState([])
    const [page , setPage] = useState(1)
    const allRendered = useRef(false)
    const loaderRef = useRef(null)
    const [loading , setLoading] = useState(true)
    const navigate = useNavigate()

    const getPosts = async () => {          
        
        if(!allRendered.current){
            const resp = await getUserPosts(page)

            if(!resp) {
                return
            }

            if (page > resp.data.lastPage) return 

            const newPosts = resp.data.posts

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

    useEffect(() => {
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
                <Grid size={2}>
                </Grid>
                <Grid size={8}>
                    {posts.map((post) => <Post post={post}/>)}

                    <LoadingDiv ref={loaderRef} style={{ height: "50px" }}>
                        {loading && <CircularProgress size={32}/>}
                    </LoadingDiv>
                </Grid>
                <Grid size={2}>
                    <HorizontalCenteredWrapper>
                        <Button 
                            variant="contained"
                            onClick={() => navigate("/posts/create")}    
                        >
                            Write a Post!
                        </Button>
                    </HorizontalCenteredWrapper>
                </Grid>
            </Grid>
        </>
    )
}