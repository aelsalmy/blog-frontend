import { useState } from "react";
import { Container, Paper } from "@mui/material";
import { login } from "../api/auth";
import { useUser } from "../hooks/user.hook";
import { jwtDecode } from "jwt-decode";
import type { User } from "../contexts/user.context";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/auth.schemas";
import { CustomForm } from "../components/common/forms/CustomForm";
import { CenteredWrapper } from "../components/wrappers/CenteredWrapper.styled";

function LoginPage (){
  const [error , setError] = useState<string|undefined>()
  const {setUser} = useUser()
  const navigate = useNavigate()

  const handleLogIn = async (values: any) => {
    const {username , password} = values

    const {status , message , resp} = await login(username , password)

    if(status){
      setError(undefined)
      
      const {accessToken} = resp!.data

      localStorage.setItem("accessToken" , accessToken)

      const decodedToken = jwtDecode<User>(accessToken)

      console.log(decodedToken)

      setUser({
        userId: decodedToken.userId,
        roles: decodedToken.roles
      })

      navigate("/")
    }
    else{
      setError(message || "Something went wrong")
    }
  }

  const fields = [
    {label: "Username", key: "username", type: "text"},
    {label: "Password", key: "password", type: "password"},
  ]

  const buttons = [
    { 
      text: "Don't have an account? Register Now!", 
      variant: "text" as const, 
      color: "primary" as const, 
      size: "small" as const, 
      sx: {mt: 2 , mb:2}, 
      onClick: () => navigate("/register")
    },
  ]

  return (
    <Container>
      <CenteredWrapper>
        <Container sx={{width:"40%"}} disableGutters>
          <Paper sx={{boxShadow: 6 , borderRadius: "12px" , padding: "16px"}}>
            <CustomForm
              title="Login"
              initialValues={{username: "", password: ""}}
              fields={fields}
              buttons={buttons}
              error={error}
              submitButtonText="Login"
              schema={loginSchema}
              onSubmit={handleLogIn}
            />
          </Paper>
        </Container>
      </CenteredWrapper>       
    </Container>
  )
}

export default LoginPage