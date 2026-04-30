import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { Container } from "@mui/material";
import { login } from "../api/auth";
import { useUser } from "../hooks/user.hook";
import { jwtDecode } from "jwt-decode";
import type { User } from "../contexts/user.context";
import { useNavigate } from "react-router-dom";

function LoginPage (){
  const [error , setError] = useState<string|undefined>()
  const {setUser} = useUser()
  const navigate = useNavigate()

  const handleLogIn = async (email: string , password: string) => {
    const {status , message , resp} = await login(email , password)

    if(status){
      setError(undefined)

      const {accessToken} = resp!.data

      localStorage.setItem("accessToken" , accessToken)

      const decodedToken = jwtDecode<User>(accessToken)

      setUser({
        userId: decodedToken.userId,
        role: decodedToken.role
      })

      navigate("/")
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