import { Navigate, Outlet } from "react-router-dom"
import isAuth from "../utils/isAuth"

const GuestRoute = () => {
    return isAuth() ? <Navigate to="/dashboard" replace/> : <Outlet/>
}

export default GuestRoute