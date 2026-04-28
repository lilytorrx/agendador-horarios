import { apiFetch } from "./api";

// POST /schedules
export const createSchedule = (data) => apiFetch("/schedules", {
    method: "POST",
    body: JSON.stringify(data)
})

// GET /schedules/user/:userId
export const getSchedulesByUser = (userId) => apiFetch(`/schedules/user/${userId}`)

// GET /schedules/status/:status | "AGENDADO", "CONCLUÍDO", "CANCELADO"
export const getSchedulesByStatus = (status) => apiFetch(`/schedules/status/${status}`)

// GET /schedules/data?start=...&end=...
export const getSchedulesByDateRange = (start, end) => apiFetch(`/schedules/data?start=${start}&end=${end}`)

// PATCH /schedules/:id/cancelar
export const cancelSchedule = (id) => apiFetch(`/schedule/${id}/cancelar`, {
    method: "PATCH"
})