import { Avatar, Card, CardContent, CardHeader, CardMedia, styled } from "@mui/material";
import { green } from "@mui/material/colors";

const StyledCard = styled(Card)({
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

export function Post({
    post
}) {
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
            </StyledCard>
        </>
    )
}