import { apiFetch } from "./api";

// ADMIN ONLY

// GET /services
export const getServices = () => apiFetch("/services")

// GET /services/:id
export const getServiceById = (id) => apiFetch(`/services/${id}`)

// POST /services
export const createService = (data) => apiFetch("/services", {
    method: "POST",
    body: JSON.stringify(data)
})

// PUT /services/:id
export const updateService = (id, data) => apiFetch(`/services/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
})

// DELETE /services/:id
export const deleteService = (id) => apiFetch(`/services/${id}`, {
    method: "DELETE"
})