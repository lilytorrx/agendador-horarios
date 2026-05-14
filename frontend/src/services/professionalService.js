import { apiFetch } from "./api";

// GET /professionals/public
export const getPublicProfessionals = () => apiFetch("/professionals/public")

// ADMIN ONLY

// GET /professionals
export const getProfessionals = () => apiFetch("/professionals")

// GET /professionals/:id
export const getProfessionalById = (id) => apiFetch(`/professionals/${id}`)

// POST /professionals
export const createProfessional = (data) => apiFetch("/professionals", {
    method: "POST",
    body: JSON.stringify(data)
})

// PUT /professionals/:id
export const updateProfessional = (id, data) => apiFetch(`/professionals/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
})

// DELETE /professionals/:id
export const deleteProfessional = (id) => apiFetch(`/professionals/${id}`, {
    method: "DELETE"
}) 