//chamada global da API
const API_URL = "http://localhost:8080"

export async function apiFetch(endpoint, options = {}) {
    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include"
    }) 

    if(!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message ?? "Erro na requisição.")
    }

    // 204 No content - sem corpo
    if (response.status === 204) return null
    
    return response.json()
}