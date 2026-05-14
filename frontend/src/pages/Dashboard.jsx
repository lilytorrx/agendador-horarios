import React, { useState } from "react"

import logo from "../assets/img/imagotipo.png"
import "../assets/css/Dashboard.css"

import { IoMenu } from "react-icons/io5"
import { FaRegUserCircle } from "react-icons/fa"
import { useAuth } from "../context/AuthContext"
import { useDashboardData } from "../hooks/useDashboardData"
import Button from "../components/Button"


const Dashboard = () => {
    const { role } = useAuth()
    const {
        user,
        todaySchedules,
        allSchedules,
        totalServices,
        totalProfessionals,
        loading,
        error
    } = useDashboardData()

    const [date] = useState(new Date())

    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    function openFilterModal() {
        console.log("Por enquanto é isso pessoal")
    }

    return (
        <>
            <section className="head">
                <img className="logo" src={logo} alt="AgendIn logo" />
                <FaRegUserCircle className="user"
                    color="#883CE5"
                    size={20}
                />
                <IoMenu className="menu"
                    color="#883CE5"
                    size={20}
                />
            </section>
            <section className="welcome">
                <div>
                    <h1>Olá,<mark>{loading ? "..." : user?.name || "usuário"}!</mark></h1>
                    <p className="date-time">{days[date.getDay()]}, {date.getDate()} de {months[date.getMonth()]} de {date.getFullYear()}</p>
                </div>
                <div>
                    <Button
                        className="btn mobile"
                        children="Agendar"
                    ></Button>
                </div>
            </section>
            <section className="dashboard">
                <h1>Dashboard</h1>
                <p>Visão geral</p>
                <div className="schedules">
                    <div className="today-schedules">
                        <p>Agendamentos Hoje</p>
                        <p>{loading ? "..." : todaySchedules.length}</p>
                    </div>
                </div>
                <div className="dashboard-services">
                    <div className="total-services">
                        <p>Total de Serviços</p>
                        <p>{loading ? "..." : totalServices}</p>
                    </div>
                </div>
                <div className="dashboard-professional">
                    <div className="total-professionals">
                        <p>Total de Profissionais</p>
                        <p>{loading ? "..." : totalProfessionals}</p>
                    </div>
                </div>
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}
            </section>
            <div className="section-total-schedules">
                <div className="total-schedules">
                    <div className="top-schedules">
                        <p>Agendamentos</p>
                        <Button
                            className="btn .filter"
                            children="Filtrar"
                            onClick={openFilterModal()}
                        />
                    </div>
                    <p>{loading ? "..." : allSchedules.length}</p>
                </div>
            </div>
        </>
    )
}

export default Dashboard;