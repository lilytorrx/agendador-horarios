import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    // Já lê o token do LocalStorage e persiste entre refreshs
    const [token, setToken] = useState(() => localStorage.getItem("token") ?? null) 

    const saveToken = (newToken) => {
        localStorage.getItem("token", newToken)
        setToken(newToken)
    }

    const clearToken = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider value = {{ token, saveToken, clearToken }}>
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