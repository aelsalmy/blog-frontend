import { Navigate , Outlet } from "react-router-dom"
import { useUser } from "../../hooks/user.hook"

export function PublicRoutes() {
    const {user} = useUser()

    if(user) return <Navigate to="/" />

    return <Outlet />
}