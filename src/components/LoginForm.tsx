import { Button, Container, Paper, Stack } from "@mui/material";
import React, { useState } from "react";
import { CenteredWrapper } from "./wrappers/CenteredWrapper.styled";
import { Text2Comp } from "./common/text/text2.styled";
import CustomTextField from "./common/custom.input";

type LoginFormParams = {
  onLogIn: (email: string , password: string) => void
}

function LoginForm({
  onLogIn
}:LoginFormParams){
  const [username , setUsername] = useState<string>()
  const [password , setPassword] = useState<string>()
  
  return (
    <>
      <CenteredWrapper>
        <Container sx={{width:"40%"}} disableGutters>
          <Paper sx={{boxShadow: 6 , borderRadius: "12px"}}>
            <Stack className="p-7">
              <Text2Comp>Login</Text2Comp>
              <CustomTextField 
                label="username" type="text"
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
              <CustomTextField 
                label="password" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <Button 
                sx={{mt:2}} variant="contained"
                onClick={() => onLogIn(username! , password!)}
              >
                Login
              </Button>
            </Stack>
          </Paper>
        </Container>
      </CenteredWrapper>
    </>
  )
}

export default LoginForm