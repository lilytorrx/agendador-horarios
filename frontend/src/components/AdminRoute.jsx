import { useAuth } from "../context/AuthContext"
import { Outlet, Navigate } from "react-router-dom"

const AdminRoute = () => {
    const { role } = useAuth()
    
    console.log("role do usuário: ", role)
    const isAdmin = role === "ROLE_ADMIN" 
    return isAdmin ? <Outlet/> : <Navigate to="/dashboard" replace/>
}

export default AdminRoute