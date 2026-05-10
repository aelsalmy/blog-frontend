import { IconButton, InputAdornment, styled, TextField } from "@mui/material"
import { useState } from "react"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Visibility from "@mui/icons-material/Visibility"
import { useField } from "formik"

const StyledTextField = styled(TextField)({
    marginTop: "16px",
    "& .MuiInputBase-root": {
      height: 50,
    },
})

interface CustomFormFieldProps {
    label: string
    type: string
    name: string
    value?: string
}

function CustomFormField({
    label,
    type,
    name,
}: CustomFormFieldProps){
    const [showPassword , setShowPassword] = useState<boolean>(false)
    const [field , meta] = useField(name)
  
    return (
      <>
        <StyledTextField 
            {...field}
            label={label}
            name={name}
            type={
            type === "password"? 
                showPassword? 
                "text" : 
                "password"
                : "text"
            }
            id="outlined-basic"
            variant="outlined"
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
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
      </>
    )
  }
  
  export default CustomFormField