import { Route, Routes, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPublicServices } from "../services/serviceService"

import Button from "../components/Button"
import Logo from "../assets/img/imagotipo.png"

import "../assets/css/LandingPage.css"

const LandingPage = () => {
    const navigate = useNavigate()
    const [services, setServices] = useState([])

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getPublicServices() 
            
                const shuffle = data.sort(() => Math.random() - 0.5)
                setServices(shuffle.slice(0, 2))
            } catch(err) {
                console.error("Erro ao buscar serviços.", err)
            } 
        }

        fetchServices()
    }, [])

    return (
        <section className="landing-page">
            <section className="top">
                <header>
                    <img src={Logo} alt="" className="logo"/>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/Login">Login</Link></li>
                            <li>Contato</li>
                        </ul>
                    </nav>
                </header>
                <div className="banner">
                    <h1 className="title">Agende seu horário com <mark>praticidade</mark> e <mark>sem complicação.</mark></h1>
                    <h3 className="subtitle">Entenda como funciona e garanta seu lugar</h3>
                    <Button
                        onClick={() => navigate("/Register")}
                        children="Agendar serviço"
                        className="btn mobile"
                    />
                </div>
            </section>
            <section className="section-services">
                <h1 className="title">Conheça nossos serviços e encontre <mark>o que você precisa.</mark></h1>
                <p>Explore os vários serviços que temos disponível.</p>
                {/* puxar dados da API */}
                <section className="services">
                    {services.map((service) => (
                        <section key={service.id} className="service">
                            <img src={service.imageUrl ?? null} alt="" />
                            <h2 className="subtitle">{service.service_name}</h2>
                            <p className={`categoria ${service.category?.toLowerCase()}`}>{service.category}</p>
                        </section>
                    ))}
                </section>
            </section>
            <section className="section-cta">
                <div>
                    <h1 className="title">Agendar nunca foi <mark>tão simples.</mark></h1>
                    <p>Cansado de esperar em filas e mais filas para conseguir um angedamento? Com a AgendIn, você se cadastra na plataforma e já tem os horários disponíveis na palma da sua mão. Chega de <mark>filas, estresse e frustração</mark> para seu serviço!</p>
                </div>
                <div>
                    <Button
                        onClick={() => navigate("/Register")}
                        children="Criar conta"
                        className="btn mobile"
                    />
                </div>
            </section>
            <section className="section-professionals">
                <h1 className="title">Os melhores profissionais trabalham <mark>aqui.</mark></h1>
                <p>Encontre <mark>profissionais certificados</mark> e renomados no ramo de forma simples e prática.</p>
                <section className="professionals">
                    { /* Lógica para puxar dados da API e exibir dois profissionais aleatórios em carrossel */ }
                    <section className="professional">
                        <img src={ null } alt="" />
                        <p className="name">Nathaniel Nogueira</p>
                        <p className="profession">Nail Designer</p>
                        <p className="professional-services"><strong>Serviços disponíveis:</strong></p>
                        <p className="service">
                            Manicure, Pedicure, Alongamento de unhas, Nail art
                        </p>
                        <Button
                            onClick={() => navigate("/Register")}
                            children="Agendar agora"
                            className="btn mobile"
                        />
                    </section>
                    <section className="professional">
                        <img src={ null } alt="" />
                        <p className="name">Jaqueline Silva</p>
                        <p className="profession">Esteticista</p>
                        <p className="professional-services"><strong>Serviços disponíveis:</strong></p>
                        <p className="service">
                            Limpeza de pele, Hidratação facial, Massagem, Depilação
                        </p>
                        <Button
                            onClick={() => navigate("/Register")}
                            children="Agendar agora"
                            className="btn mobile"
                        />
                    </section>
                </section>
            </section>
            <section className="FAQ">
                <h1>Perguntas Frequentes (FAQ)</h1>
                <p>Tire suas dúvidasa aqui, caso tenha outra pergunta, entre em contato com nossa <mark>equipe de atendimento.</mark></p>
            </section>
            <footer>
                <div className="footer-info">
                    <div>
                        <img src={Logo} alt="" className="logo" />
                        <p>Rua Teste 123, Bairro Legal - Brasil</p>
                    </div>
                    <div>
                        <p>agendin@email.com</p>
                        <p>Instagram</p>
                    </div>
                </div>
                <p>Agendin ₢2026. Todos os direitos reservados.</p>
            </footer>
        </section>
    )
}

export default LandingPage