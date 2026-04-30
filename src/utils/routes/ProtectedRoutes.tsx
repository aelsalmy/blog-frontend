import { useUser } from "../../hooks/user.hook"
import { Navigate , Outlet } from "react-router-dom"

export function ProtectedRoutes() {
    const {user} = useUser()

    if(!user) return <Navigate to="/login" />

    return <Outlet />
}