import { Outlet } from "react-router-dom"
import { UnauthorizedPage } from "../../pages/UnauthorizedPage"
import { useUser } from "../../hooks/user.hook"

export function RoleProtectedRoute({allowedRoles}: {allowedRoles: string[]}) {
    const {user} = useUser()

    const allowed = user!.roles.some(role => allowedRoles.includes(role))

    if(!allowed) return <UnauthorizedPage />

    return <Outlet />
}