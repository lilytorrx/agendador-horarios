import { useAuth } from "../context/AuthContext"
import { Outlet, Navigate } from "react-router-dom"

const AdminRoute = () => {
    const { token } = useAuth()

    //Decodifica payload JWT para ler role
    const payload = token ? JSON.parse(atob(token.split(".")[1])) : null
    const isAdmin = payload?.role === "ROLE_ADMIN" 

    return isAdmin ? <Outlet/> : <Navigate to="/dashboard" replace/>
}

export default AdminRoute