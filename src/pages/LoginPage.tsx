import React from "react";
import LoginForm from "../components/LoginForm";
import { Container } from "@mui/material";
import { login } from "../api/auth";

function LoginPage (){

  const handleLogIn = async (email: string , password: string) => {
    const resp = await login(email , password)

    console.log(resp)
  }

  return (
    <>
      <Container>
        <LoginForm 
          onLogIn= {handleLogIn}
        />
      </Container>
    </>
  )
}

export default LoginPage