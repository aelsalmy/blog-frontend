import { Alert, Button, CircularProgress, Grid, Snackbar, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { deletePost, getUserPosts, publishPost, updatePost, uploadImage } from "../api/posts";
import { Post } from "../components/post";
import { HorizontalCenteredWrapper } from "../components/wrappers/CenteredWrapper.styled";
import { useNavigate } from "react-router-dom";
import { EditPostDialog } from "../components/EditPostDialog";

const LoadingDiv = styled("div")({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
    marginBottom: "16px"
})

export function MyPostsPage() {
    const [posts , setPosts] = useState<Post[]>([])
    const [page , setPage] = useState(1)
    const allRendered = useRef(false)
    const loaderRef = useRef(null)
    const [loading , setLoading] = useState(true)
    const navigate = useNavigate()
    const [editDialogShown , setEditDialogShown] = useState(false)
    const [selectedPost , setSelectedPost] = useState<Post>()
    const [editError , setEditError] = useState("")
    const [editSuccessOpen , setEditSuccessOpen] = useState(false)

    const getPosts = async () => {          
        
        if(!allRendered.current){
            const resp = await getUserPosts(page)

            if(!resp) {
                return
            }

            if (page > resp.data.lastPage) return 

            const newPosts: Post[] = resp.data.posts

            setPosts((prev) => {
                const existingIds = new Set(prev.map(p => p.id));
                const filtered = newPosts.filter((p) => !existingIds.has(p.id));
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
    } , [page , posts])

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
    
    const handlePublishPost = async (postId: number) => {
        const {status , message} = await publishPost(postId)

        if(!status){
            console.log(message || "Something went wrong")
        }

        setPosts(prev =>
            prev.map(post =>
              post.id === postId
                ? { ...post, isPublished: true }
                : post
            )
          );
    }

    const handleDeletePost = async (postId: number) => {
        const {status , message} = await deletePost(postId)

        if(!status){
            console.log(message || "Something went wrong")
        }

        setPosts(prev => prev.filter(p => p.id !== postId));
    }

    const handleOpenDialog = async (postId: number) => {
        setSelectedPost(posts.find((p) => p.id === postId))
        
        setEditDialogShown(true)
    }

    const handleEditPost = async (values: any , file: File|null , postId: number) => {
        const {status} = await updatePost(postId , values.content)

        if(status){
            setEditDialogShown(false)

            setPosts((prev) => prev.map((post) => 
                post.id === postId 
                    ? {
                        ...post,
                        content: values.content,
                    }
                    : post
            ))
        }
        else{
            setEditError("Something went wrong")
            return
        }

        if(file){
            const {status , resp} = await uploadImage(postId , file)

            if(status){
                setEditDialogShown(false)

                setPosts((prev) => prev.map((post) =>
                    post.id === postId
                        ? {
                            ...post,
                            image: resp.data?.image,
                        }
                        : post
                ))
            }
            else{
                setEditError("Something went wrong")
                return
            }
        }

        setEditSuccessOpen(true)
    }

    return (
        <>
            <Grid sx={{display: "flex" , justifyContent:"center"}} container spacing={2}>
                <Grid size={2}>
                </Grid>
                <Grid size={8}>
                    {posts.map((post) => <Post onDelete={handleDeletePost} 
                                               onPublish={handlePublishPost}
                                               onEdit={handleOpenDialog} 
                                               isOwner={true} post={post}/>)}

                    <EditPostDialog
                        open={editDialogShown}
                        onClose={() => setEditDialogShown(false)}
                        post={selectedPost}
                        handleEdit={handleEditPost}
                        error={editError}
                    />

                    <Snackbar
                        open={editSuccessOpen}
                        autoHideDuration={3000}
                        onClose={() => setEditSuccessOpen(false)}
                    >
                        <Alert severity="success" variant="filled">
                            Post updated successfully
                        </Alert>
                    </Snackbar>

                    <LoadingDiv ref={loaderRef} style={{ height: "50px" }}>
                        {
                            posts.length !== 0? 
                                loading && <CircularProgress size={32}/>:
                                "No Posts Yet!!"    
                        }
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