import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const StyledTextField = styled(TextField)({
  marginTop: "16px",
  "& .MuiInputBase-root": {
    height: 50,
  },
})

type PasswordTextFieldParams = {
  label: string
  value?: string,
  type: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function CustomTextField({
  label,
  type,
  value,
  onChange
}: PasswordTextFieldParams){
  const [showPassword , setShowPassword] = useState<boolean>(false)

  return (
    <StyledTextField 
      label={label}
      type={
        type === "password"? 
          showPassword? 
            "text" : 
            "password"
          : "text"
      }
      id="outlined-basic"
      variant="outlined"
      onChange={onChange}
      value={value}
      slotProps={
        type === "password"?
          {
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size={"small"} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            )
          }
        }: undefined
    }
    />
  )
}

export default CustomTextField