import { Route, Routes, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPublicServices } from "../services/serviceService"
import { getPublicProfessionals } from "../services/professionalService"

import Button from "../components/Button"
import Logo from "../assets/img/imagotipo.png"

import "../assets/css/LandingPage.css"

const LandingPage = () => {
    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [professionals, setProfessionals] = useState([])
    const [itemsPerSection, setItemsPerSection] = useState(window.innerWidth >= 1024 ? 4 : 2)
    const isDesktop = itemsPerSection === 4
    const [servicePage, setServicePage] = useState(0)
    const [professionalPage, setProfessionalPage] = useState(0)

    const getPageItems = (items, page) => {
        const start = page * itemsPerSection
        const end = start + itemsPerSection
        return items.slice(start, end)
    }

    const getTotalPages = (items) => {
        if(!items.length) return 1
        return Math.ceil(items.length / itemsPerSection)
    }

    const renderDots = (totalPages, activePage, onClick) => {
        <div className="carousel-dots">
            {Array.from({length : totalPages }).map((_, index) => (
                <button 
                    key={index}
                    type="button"
                    aria-label={`Ir para a seção ${index + 1}`}
                    className={`carousel-dot $activePage === index ? "active" : ""`}
                    onClick={() => onClick(index)}
                ></button>
            ))}
        </div>
    }

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getPublicServices() 
            
                const shuffle = [...data].sort(() => Math.random() - 0.5)
                setServices(shuffle)
            } catch(err) {
                console.error("Erro ao buscar serviços.", err)
            } 
        }

        fetchServices()
    }, [])

    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                const data = await getPublicProfessionals()

                const shuffle = [...data].sort(() => Math.random() - 0.5)
                setProfessionals(shuffle)
            } catch(err) {
                console.error("Erro ao buscar profissionais.", err)
            }
        }

        fetchProfessionals()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setItemsPerSection(window.innerWidth == 1024 ? 4 : 2)
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const maxProfessionalPage = getTotalPages(professionals) - 1
        if(professionalPage > maxProfessionalPage) setProfessionalPage(maxProfessionalPage)
    }, [itemsPerSection, professionals, professionalPage])

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
                <div className="carousel-controls">
                    {isDesktop && (
                        <button
                            type="button"
                            className="carousel-arrow"
                            onClick={() => setServicePage((prev) => Math.max(prev - 1, 0))}
                        >&#10094</button>
                    )
                }
                {renderDots(getTotalPages(services), servicePage, setServicePage)}
                {isDesktop && (
                    <button
                        type="button"
                        className="carousel-arrow"
                        onClick={() => setServicePage((prev) => Math.max(prev + 1, getTotalPages(services) - 1))}
                    >&#10095;</button>
                )}
                </div>
                <section className="services">
                    {getPageItems(services, servicePage).map((service) => (
                        <section key={service.id} className="service">
                            <img className="serviceImage" src={service.imageUrl ?? null} alt={service.serviceName} />
                            <h2 className="serviceName">{service.serviceName}</h2>
                            <p className={`subtitle categoria ${service.category?.toLowerCase()}`}>{service.category}</p>
                        </section>
                    ))}
                </section>
            </section>
            <section className="section-cta">
                <div>
                    <h1 className="title">Agendar nunca foi <mark>tão simples.</mark></h1>
                    <p>Cansado de esperar em filas e mais filas para conseguir um angedamento? Com a AgendIn, você se cadastra na plataforma e já tem os horários disponíveis na palma da sua mão. Chega de <mark>filas, estresse e frustração</mark> para seu serviço!</p>
                </div>
                <div className="cta-image">
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
                <div className="carousel-controls">
                    {isDesktop && (
                        <button
                            type="button"
                            className="carousel-arrow"
                            onClick={() => setProfessionalPage((prev) => Math.max(prev - 1, 0))}
                        >
                            &#10094;
                        </button>
                    )}
                    {renderDots(getTotalPages(professionals), professionalPage, setProfessionalPage)}
                    {isDesktop && (
                        <button
                            type="button"
                            className="carousel-arrow"
                            onClick={() => setProfessionalPage((prev) => Math.min(prev + 1, getTotalPages(professionals) - 1))}
                        >
                            &#10095;
                        </button>
                    )}
                </div>
                <section className="professionals">
                    {getPageItems(professionals, professionalPage).map((professional) => (
                        <section key={professional.id} className="professional">
                            <img src={ professional.imageUrl ?? null } className="professionalImage" alt="" />
                            <p className="professionalName">{professional.name}</p>
                            <p className="profession">{professional.profession}</p>
                            <p className="professional-services"><strong>Serviços disponíveis:</strong></p>
                            <p className="service">
                                {professional.services?.length
                                    ? professional.services.join(", ")
                                    : "Nenhum serviço disponível"}
                            </p>
                            <Button
                                onClick={() => navigate("/Register")}
                                children="Agendar agora"
                                className="btn mobile"
                            />
                        </section>
                    ))}
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