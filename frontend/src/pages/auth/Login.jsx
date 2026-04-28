import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Login = () => {
    const { saveToken } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const data = await loginRequest(email, password)
            saveToken(data.token)
            navigate("/dashboard")
        } catch (err){
            setError(err.message)
        } finally {
            setLoading(false)
        }
    } 

    return (
        <></>
    )
}

export default Login;