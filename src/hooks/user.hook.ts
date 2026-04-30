import { useContext } from "react"
import { AuthContext } from "../contexts/user.context"

export const useUser = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useUser must be used inside AuthProvider")
  return context 
}