import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, styled } from "@mui/material";
import { CustomForm } from "./common/forms/CustomForm";
import { createPostSchema } from "../schemas/post.schemas";
import { useRef, useState } from "react";
import { Text4Comp } from "./common/text/text4.styled";

const ImageContainer = styled(Container)({
    padding: 0,
    marginTop: "16px",
    fontSize: "14px",
    fontFamily: "Roboto , Arial , sans-serif",
    "img": {
        marginTop: "8px",
        padding: "8px", 
    }
})

const NoImageContainer = styled(Container)({
    marginTop: "8px",
    border: "1px solid lightgray",
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
})

export function EditPostDialog({
    post,
    onClose,
    open,
    handleEdit,
    error
}) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [image , setImage] = useState<File | null>(null)

    const fields = [
        {label: "Post Content", key: "content", type: "text" , value: post ? post.content:""},
    ]

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(file) setImage(file)
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth> 
            <DialogTitle>Edit Post</DialogTitle>

            <DialogContent>
                <CustomForm
                    id="edit-post-form"
                    initialValues={{content: post.content}}
                    fields={fields}
                    error={error}
                    schema={createPostSchema}
                    showSubmit={false}
                    onSubmit={(values) => handleEdit(values , image , post.id)}
                />
                <ImageContainer disableGutters>
                    Uploaded Image:
                    {post.image ? 
                        <img
                            src={post.image}
                        />
                        
                    :
                        image?
                            <img
                                src={URL.createObjectURL(image)}
                            />
                        :
                        <NoImageContainer>
                            <Text4Comp>No Image Uploaded</Text4Comp>
                        </NoImageContainer>
                    }

                </ImageContainer>
            </DialogContent>

            <DialogActions>
                <input type="file" hidden ref={inputRef} onChange={handleImageChange}/>

                <Button variant="outlined" onClick={() => inputRef.current?.click()}>
                    {post.image ? "Change Image" : "Add Image"}
                </Button>

                <Button type="submit" form="edit-post-form" variant="contained">
                    Save
                </Button>

            </DialogActions>
        </Dialog>
    )
}