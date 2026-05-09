import { apiFetch } from "../services/api";

export async function checkAuth() {
    try {
        await apiFetch("/users")
        return true
    } catch {
        return false
    }
}