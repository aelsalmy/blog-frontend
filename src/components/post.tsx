import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, IconButton, styled } from "@mui/material";
import { green } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";

interface PostParams {
    post: any,
    isOwner: boolean,
    onDelete?: (postId: number) => void
    onPublish?: (postId: number) => void
    onEdit?: (postId: number) => void
}

export const StyledCard = styled(Card)({
    margin: "16px"
})

const StyledAvatar = styled(Avatar)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: green[500],
    height: "32px" , 
    width: "32px"
})

const StyledActionFooter = styled(CardActions)({
    display: "flex",
    justifyContent: "end"
})

export function Post({
    post, 
    isOwner,
    onDelete,
    onEdit,
    onPublish
}: PostParams) {
    const [isPublished , setIsPublished] = useState(false)

    useEffect(() => {
        if(post.isPublished){
            setIsPublished(true)
        } else {
            setIsPublished(false)
        }
    } , [])

    const postStatus = () => {
        if(!isPublished){
            return <Chip label="Not Published" color="error"/>
        } else {
            if (!post.isApproved){
                return <Chip label="Pending" color="warning"/>
            } else {
                return <Chip label="Approved" color="success"/>
            }
        }
    }
    
    return (
        <>
            <StyledCard sx={{m:"16px"}}>
                <CardHeader 
                    avatar = {
                    <StyledAvatar>
                        {post.user.username[0]}
                    </StyledAvatar>}
                    title={post.user.username}
                    subheader={post.user.email}
                    action= {
                        isOwner && postStatus()
                    }
                />
                {post.image &&
                    <CardMedia 
                        component="img"
                        height="194"
                        image={post.image}
                        alt="img"
                    />
                }
                <CardContent>
                    {post.content}
                </CardContent>
                {isOwner &&
                    <StyledActionFooter>
                        {!isPublished && 
                            <Button 
                                size="small" 
                                variant="outlined"
                                onClick={() => {
                                    setIsPublished(true)
                                    onPublish(post.id)
                                }}
                            >
                                Publish
                            </Button>
                        }
                        <IconButton onClick={() => onEdit(post.id)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => onDelete(post.id)}>
                            <DeleteIcon color="error"/>
                        </IconButton>
                    </StyledActionFooter>
                }
            </StyledCard>
        </>
    )
}