import { Navigate, Outlet } from "react-router-dom"
import { checkAuth } from "../utils/isAuth"
import { useEffect, useState } from "react"

// Se autenticado, renderiza o Outlet
// Se não, redireciona para /login

const ProtectedRoute = () => {
    // null = verificando
    const [auth, setAuth] = useState(null)
    
    useEffect(() => {
        checkAuth().then(setAuth)
    }, [])

    if(auth === null) return null

    return auth ? <Outlet/> : <Navigate to="/login" replace/> 
}

export default ProtectedRoute