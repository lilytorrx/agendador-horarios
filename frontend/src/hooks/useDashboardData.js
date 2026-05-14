import { useState, useEffect } from "react"
import { getUser } from "../services/userService"
import { getSchedulesByDateRange, getSchedulesByUser } from "../services/scheduleService"
import { getPublicServices } from "../services/serviceService"
import { getPublicProfessionals } from "../services/professionalService"

const formatForBackend = (date) => {
    return date.toISOString().slice(0, 19)
}

export const useDashboardData = () => {
    const [user, setUser] = useState(null)
    const [todaySchedules, setTodaySchedules] = useState([])
    const [allSchedules, setAllSchedules] = useState([])
    const [totalServices, setTotalServices] = useState(0)
    const [totalProfessionals, setTotalProfessionals] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true)
                setError(null)

                const userData = await getUser()
                setUser(userData)

                const [
                    todaySchedulesData,
                    allSchedulesData,
                    servicesData,
                    professionalsData
                ] = await Promise.all([
                    // Agendamentos de hoje
                    (() => {
                        const today = new Date()
                        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
                        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
                        return getSchedulesByDateRange(formatForBackend(startOfDay), formatForBackend(endOfDay))
                    })(),

                    getSchedulesByUser(userData.id),

                    getPublicServices(),

                    getPublicProfessionals()
                ])

                setTodaySchedules(todaySchedulesData)
                setAllSchedules(allSchedulesData)
                setTotalServices(servicesData.length)
                setTotalProfessionals(professionalsData.length)

            } catch (err) {
                console.error("Erro ao buscar dados da dashboard:", err)
                setError("Erro ao carregar dados da dashboard")
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    return {
        user,
        todaySchedules,
        allSchedules,
        totalServices,
        totalProfessionals,
        loading,
        error,

        refetch: () => {
            setLoading(true)
            setError(null)
            fetchDashboardData()
        }
    }
}