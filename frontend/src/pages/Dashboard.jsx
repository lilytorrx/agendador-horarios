import React, { useState } from "react"

import logo from "../assets/img/imagotipo.png"
import "../assets/css/Dashboard.css"

import { IoMenu } from "react-icons/io5"
import { FaRegUserCircle, FaCalendarAlt, FaUsers } from "react-icons/fa"
import { RiScissorsFill } from "react-icons/ri";

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
                <div className="icons">
                    <FaRegUserCircle className="icon"
                        color="#883CE5"
                        size={25}
                    />
                    <IoMenu className="icon"
                        color="#883CE5"
                        size={25}
                    />
                </div>
            </section>
            <section className="welcome">
                <div>
                    <h1>Olá, <mark>{loading ? "..." : user?.name || "usuário"}!</mark></h1>
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
                <p>Visão geral de seus agendamentos, serviços e profissionais.</p>
                <div className="section-total schedules">
                    <div className="today-schedules">
                        <p>Agendamentos Hoje</p>
                        <p className="number">{loading ? "..." : todaySchedules.length}</p>
                    </div>
                     <div className="icon-total icon-today-schedules">
                        <FaCalendarAlt color="#883CE5"/>
                     </div>
                </div>
                <div className="section-total dashboard-services">
                    <div className="total-services">
                        <p>Total de Serviços</p>
                        <p className="number">{loading ? "..." : totalServices}</p>
                    </div>
                    <div className="icon-total icon-services">
                        <RiScissorsFill color="#99A5F6"/>
                    </div>
                </div>
                <div className="section-total dashboard-professional">
                    <div className="total-professionals">
                        <p>Total de Profissionais</p>
                        <p className="number">{loading ? "..." : totalProfessionals}</p>
                    </div>
                     <div className="icon-total icon-professionals">
                        <FaUsers color="#287646"/>
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
            <section className="copyright">
                <p>AgendIn ©2026. Todos os direitos reservados.</p>
            </section>
        </>
    )
}

export default Dashboard;