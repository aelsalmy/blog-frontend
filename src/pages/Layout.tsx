import { useState } from "react"
import { Sidebar } from "../components/layout/sidebar"

export function Layout({children}: {children: React.ReactNode}) {
    const [open , setOpen] = useState<boolean>(false)
    return (
        <>
            <div>
                <Sidebar open={open} setOpen={setOpen} />
            </div>
            <div>
                {children}
            </div>
        </>
    )
}