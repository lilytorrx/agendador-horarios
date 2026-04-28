import { apiFetch } from "./api";

// Sem token / Rotas públicas
export const loginRequest = (email, password) => apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({email, password})
})

// Register 
export const registerRequest = (username,  email, password, cpf) => apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({username, email, password, cpf})
}) 