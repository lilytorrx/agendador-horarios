import { apiFetch } from "./api";

// GET /users 
export const getUserData = () => apiFetch("/users")

// PUT /users 
export const updateUser = (data) => apiFetch("/users", {
    method: "PUT",
    body: JSON.stringify(data)
})
