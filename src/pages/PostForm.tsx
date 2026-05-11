import { Container, Paper } from "@mui/material";
import { CustomForm } from "../components/common/forms/CustomForm";
import { CenteredWrapper } from "../components/wrappers/CenteredWrapper.styled";
import { createPostSchema } from "../schemas/post.schemas";
import { createPost } from "../api/posts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function PostForm(){
    const [error , setError] = useState<string>()
    const navigate = useNavigate()

    const fields = [
        {label: "content", key: "content", type: "text"},
    ]

    const handleCreatePost = async (values: any) => {

        const {status , message , resp} = await createPost(values.content)

        if(status){
            navigate("/posts")
        }
        else{
            if(resp.status === 400){
                setError(message)
            }
            else{
                setError("Something went wrong")
            }
        }
    }

    return (
      <Container>
        <CenteredWrapper>
          <Container sx={{width:"40%"}} disableGutters>
            <Paper sx={{boxShadow: 6 , borderRadius: "12px" , padding: "16px"}}>
                <CustomForm
                    title="Create Post"
                    initialValues={{content: ""}}
                    fields={fields}
                    error={error}
                    submitButtonText="Create Post"
                    schema={createPostSchema}
                    onSubmit={handleCreatePost}
                />
            </Paper>
          </Container>
        </CenteredWrapper>       
      </Container>
        
    )
}