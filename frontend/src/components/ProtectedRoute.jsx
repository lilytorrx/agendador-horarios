import { Navigate, Outlet } from "react-router-dom"
import isAuth from "../utils/isAuth"

// Se autenticado, renderiza o Outlet
// Se não, redireciona para /login

const ProtectedRoute = () => {
    return isAuth() ? <Outlet/> : <Navigate to="/login" replace/> 
}

export default ProtectedRoute