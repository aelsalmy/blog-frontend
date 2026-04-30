import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { Container } from "@mui/material";
import { login } from "../api/auth";
import { useUser } from "../hooks/user.hook";
import { jwtDecode } from "jwt-decode";

function LoginPage (){
  const [error , setError] = useState<string|undefined>()
  const {user , setUser} = useUser()

  const handleLogIn = async (email: string , password: string) => {
    const {status , message , resp} = await login(email , password)

    if(status){
      setError(undefined)

      const {accessToken} = resp!.data

      localStorage.setItem("accessToken" , accessToken)

      const decodedToken = jwtDecode(accessToken)

      setUser({
        userId: decodedToken.userId,
        role: decodedToken.role
      })

      console.log(user)
    }
    else{
      setError(message || "Something went wrong")
    }
  }

  return (
    <>
      <Container>
        <LoginForm 
          onLogIn = {handleLogIn}
          error = {error}
        />
      </Container>
    </>
  )
}

export default LoginPage