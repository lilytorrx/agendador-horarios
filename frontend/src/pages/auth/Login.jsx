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
        <>
            <section className="background">
                <form className="loginForm" onSubmit={handleLogin}>
                    <p className="errorMessage">{ error }</p>
                    <div className="top">
                        <img src={Logo} alt="Logo AgendIn" />
                        <p>Seja bem-vindo ao sistema!</p>
                        <p><mark>Entre para continuar.</mark></p>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                id="email"
                                type="email"
                                placeholder="Ex: joaosilva@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login;