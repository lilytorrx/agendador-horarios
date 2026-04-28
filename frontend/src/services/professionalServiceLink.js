import { apiFetch } from "./api";

// ADMIN ONLY

// GET /professional-services
export const getProfessionalServices = () => apiFetch("/professional-services")

// POST /professional-services
export const linkProfessionalToService = (data) => apiFetch("/professional-services", {
    method: "POST",
    body: JSON.stringify(data)
})

// DELETE /professional-services/:id
export const unlinkProfessional = (id) => apiFetch(`/professional-service/${id}`, {
    method: "DELETE",
})