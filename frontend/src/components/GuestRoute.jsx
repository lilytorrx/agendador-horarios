import { Navigate, Outlet } from "react-router-dom"
import { checkAuth } from "../utils/isAuth"
import { useState, useEffect } from "react"

const GuestRoute = () => {
    const [auth, setAuth] = useState(null)

    useEffect(() => {
        checkAuth().then(setAuth)
    }, [])

    if (auth === null) return null
    return auth ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export default GuestRoute