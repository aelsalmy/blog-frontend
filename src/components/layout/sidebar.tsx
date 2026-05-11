import { Button, Drawer, IconButton, List } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerItem } from "./DrawerItem";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon  from '@mui/icons-material/Check';
import { logout } from "../../api/auth";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { useUser } from "../../hooks/user.hook";
import { useEffect, useState } from "react";
import { ROLES } from "../../constants/roles";

const StyledDrawerItem = styled(DrawerItem)({
    borderRadius: "10px",
    margin: "8px",
    "&.active": {
        backgroundColor: "#e0e0e0",
        border: "1px solid black",
    },
    "&:hover": {
        backgroundColor: "#f0f0f0"
    }
})

export function Sidebar({open , setOpen}: {open: boolean, setOpen: (open: boolean) => void}) {
    const navigate = useNavigate()
    const {user , setUser} = useUser()
    const [isAdmin , setIsAdmin] = useState(false)


    const handleLogout = async () => {
        const {status , message} = await logout()

        if(status){
            localStorage.removeItem("accessToken")
            setUser(null)
            navigate("/login")
        }   
        else{
            console.log(message)
            setUser(null)
            navigate("/login")
        }
    }

    useEffect(() => {
        console.log(user)
        setIsAdmin(user!.roles.some(role => role === ROLES.ADMIN))
    } , [])

    return (
        <div className="w-50vw h-100vh">
            <IconButton sx={{mt: 2}} onClick={() => setOpen(!open)}>
                <MenuIcon />
            </IconButton>

            <Drawer open={open} onClose={() => setOpen(false)}>
                <List>
                    <StyledDrawerItem 
                        component={NavLink}
                        to="/"
                        icon={<HomeIcon />} 
                        label="User Profile" 
                        onClick={() => {
                            navigate("/")
                            setOpen(false)
                        }} 
                    />
                    <StyledDrawerItem 
                        icon={<ArticleIcon />} 
                        component={NavLink}
                        to="/feed"
                        label="Feed" 
                        onClick={() => {
                            navigate("/feed")
                            setOpen(false)
                        }} 
                    />

                    <StyledDrawerItem 
                        icon={<ArticleIcon />} 
                        component={NavLink}
                        to="/posts"
                        label="My Posts" 
                        onClick={() => {
                            navigate("/posts")
                            setOpen(false)
                        }} 
                    />
                    
                    {isAdmin &&
                         <StyledDrawerItem 
                            icon={<CheckCircleIcon />} 
                            component={NavLink}
                            to="/admin"
                            label="Approve Posts" 
                            onClick={() => {
                                navigate("/admin")
                                setOpen(false)
                            }} 
                        />
                    }

                    <StyledDrawerItem 
                        icon={<LogoutIcon />} 
                        label="Logout" 
                        component={Button}
                        sx={{color: "black"}}
                        onClick={() => handleLogout()} 
                    />

                </List>
            </Drawer>
        </div>
    )
}