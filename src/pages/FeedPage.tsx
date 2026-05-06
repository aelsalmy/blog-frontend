import { CircularProgress, Grid, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Post } from "../components/post";
import { getAllPosts } from "../api/posts";

const LoadingDiv = styled("div")({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
    marginBottom: "16px"
})

export function FeedPage() {
    const [posts , setPosts] = useState([])
    const [page , setPage] = useState(1)
    const allRendered = useRef(false)
    const loaderRef = useRef(null)
    const [loading , setLoading] = useState(true)

    const getPosts = async () => {          
        
        if(!allRendered.current){
            const resp = await getAllPosts(page)

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
                    {posts.map((post) => <Post post={post}/>)}
                    
                    <LoadingDiv ref={loaderRef} style={{ height: "50px" }}>
                        {loading && <CircularProgress size={32}/>}
                    </LoadingDiv>
                </Grid>
            </Grid>
        </>
    )
}