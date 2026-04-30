import { createContext , useState } from "react"
import { jwtDecode } from "jwt-decode"

interface User {
  userId: number,
  role: string[]
}

interface AuthContextType {
  user: User,
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user , setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("accessToken")
    return token? jwtDecode<User>(token) : null
  })

  return (
    <AuthContext.Provider value={{user , setUser}}>
      {children}
    </AuthContext.Provider>
  )

}