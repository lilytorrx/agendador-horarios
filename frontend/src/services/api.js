//chamada global da API
const API_URL = "http://localhost:8080"

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token")

    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}`}),
        ...options.headers,
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    }) 

    // 401 - status erro token inválido ou expirado - redireciona
    if(response.status === 401) {
        localStorage.removeItem("token")
        window.location.href="/login"
        return
    }

    if(!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message ?? "Erro na requisição.")
    }

    // 204 No content - sem corpo
    if (response === 204) return null
    
    return response.json()
}