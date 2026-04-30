import { Container, Paper } from "@mui/material";
import { CustomForm } from "../components/common/forms/CustomForm";
import { CenteredWrapper } from "../components/wrappers/CenteredWrapper.styled";
import { registerSchema, type CreateUserDto } from "../schemas/auth.schemas";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function RegisterPage() {
    const [error , setError] = useState<string|undefined>()
    const navigate = useNavigate()

    const fields = [
        {label: "Username", key: "username", type: "text"},
        {label: "Email", key: "email", type: "email"},
        {label: "profession", key: "profession", type: "text"},
        {label: "city", key: "city", type: "text"},
        {label: "country", key: "country", type: "text"},
        {label: "Password", key: "password", type: "password"},
        {label: "Confirm Password", key: "confirmPassword", type: "password"},
    ]

    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profession: "",
        city: "",
        country: ""
    }
    
    const handleRegister = async (values: any) => {
        const createUserDto = values as CreateUserDto

        const {status , message , resp} = await register(createUserDto)

        if(status){
            navigate("/login")
        }
        else{
            console.log(resp)
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
                            title="Register"
                            initialValues={initialValues}
                            fields={fields}
                            error={error}
                            submitButtonText="Create Account"
                            schema={registerSchema}
                            onSubmit={handleRegister}
                        />
                    </Paper>
                </Container>
            </CenteredWrapper>       
        </Container>
    )
}