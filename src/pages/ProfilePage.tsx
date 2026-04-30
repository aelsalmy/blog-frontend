import { Text2Comp } from "../components/common/text/text2.styled";
import { useUser } from "../hooks/user.hook";
import { logout } from "../api/auth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
    const {setUser} = useUser()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const {status , message} = await logout()

        if(status){
            localStorage.removeItem("accessToken")
            setUser(null)
            navigate("/login")
        }
        else{
            console.log(message)
        }
    }
    
    return (
        <>
            <Text2Comp>Profile</Text2Comp>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    )
}