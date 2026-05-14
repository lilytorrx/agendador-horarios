import { apiFetch } from "./api";

// Sem token / Rotas públicas
export const loginRequest = (email, password) => apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({email, password})
})

// Register 
export const registerRequest = (name, email, password, cpf) => {
    return apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, cpf })
    })
}