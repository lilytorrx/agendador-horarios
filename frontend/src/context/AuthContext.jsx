import { createContext, useContext, useState } from "react"
import { apiFetch } from "../services/api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [role, setRole] = useState(() => sessionStorage.getItem("role") ?? null)

    const login = (userRole) => {
        setIsAuthenticated(true)
        setRole(userRole)
        sessionStorage.setItem("role", userRole)
    }

    const logout = async () => {
        await apiFetch("/auth/logout", { method: "POST" })
        setIsAuthenticated(false)
        setRole(null)
        sessionStorage.removeItem("role")
    }

    return (
        <AuthContext.Provider value = {{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook para consumir o contexto
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth deve ser usado dentro de AuthProvider")

    return context
}