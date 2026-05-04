import { useState } from "react"
import { Sidebar } from "../components/layout/sidebar"
import { useUser } from "../hooks/user.hook"

export function Layout({children}: {children: React.ReactNode}) {
    const [open , setOpen] = useState<boolean>(false)
    const {user} = useUser()

    return (
        <>
            <div>
                {user && <Sidebar open={open} setOpen={setOpen} />}
            </div>
            <div>
                {children}
            </div>
        </>
    )
}