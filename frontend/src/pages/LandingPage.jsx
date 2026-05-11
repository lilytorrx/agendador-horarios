import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPublicServices } from "../services/serviceService"
import { getPublicProfessionals } from "../services/professionalService"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

import Button from "../components/Button"
import Logo from "../assets/img/imagotipo.png"
import Accordion from "../components/Accordion"

import "../assets/css/LandingPage.css"

const SWIPE_THRESHOLD = 50

const LandingPage = () => {
    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [professionals, setProfessionals] = useState([])
    const [itemsPerSection, setItemsPerSection] = useState(window.innerWidth >= 1024 ? 4 : 2)
    const [servicePage, setServicePage] = useState(0)
    const [professionalPage, setProfessionalPage] = useState(0)
    const [dragStartX, setDragStartX] = useState(null)

    const faqItems = [
        {
            question: "Posso cancelar meu agendamento?",
            answer: "Sim. O sistema possui uma funcionalidade de cancelamento de agendamentos e reembolso automático."
        },
        {
            question: "Como recebo a confirmação do agendamento?",
            answer: "Após agendar, você receberá um e-mail de confirmação com os detalhes do seu agendamento. Também é possível acessar seus agendamentos através do seu perfil na plataforma."
        }
    ]

    const getPageItems = (items, page) => {
        const start = page * itemsPerSection
        const end = start + itemsPerSection
        return items.slice(start, end)
    }

    const getTotalPages = (items) => {
        if (!items.length) return 1
        return Math.ceil(items.length / itemsPerSection)
    }

    const renderDots = (totalPages, activePage, onClick) => (
        <div className="carousel-dots">
            {Array.from({ length: totalPages }).map((_, index) => (
                <button
                    key={index}
                    type="button"
                    aria-label={`Ir para a seção ${index + 1}`}
                    className={`carousel-dot ${activePage === index ? "active" : ""}`}
                    onClick={() => onClick(index)}
                ></button>
            ))}
        </div>
    )

    const startDrag = (x) => setDragStartX(x)

    const endDrag = (x, activePage, totalPages, setPage) => {
        if (dragStartX === null) return

        const deltaX = x - dragStartX

        if (deltaX > SWIPE_THRESHOLD && activePage > 0) {
            setPage((prev) => prev - 1)
        } else if (deltaX < -SWIPE_THRESHOLD && activePage < totalPages - 1) {
            setPage((prev) => prev + 1)
        }

        setDragStartX(null)
    }

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getPublicServices()

                const shuffle = [...data].sort(() => Math.random() - 0.5)
                setServices(shuffle)
            } catch (err) {
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
            } catch (err) {
                console.error("Erro ao buscar profissionais.", err)
            }
        }

        fetchProfessionals()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setItemsPerSection(window.innerWidth >= 1024 ? 4 : 2)
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const maxServicePage = getTotalPages(services) - 1
        if (servicePage > maxServicePage) setServicePage(maxServicePage)

        const maxProfessionalPage = getTotalPages(professionals) - 1
        if (professionalPage > maxProfessionalPage) setProfessionalPage(maxProfessionalPage)
    }, [itemsPerSection, services, professionals, servicePage, professionalPage])

    return (
        <section className="landing-page">
            <section className="top">
                <header>
                    <img src={Logo} alt="" className="logo" />
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
                    <Button onClick={() => navigate("/Register")} children="Agendar serviço" className="btn mobile" />
                </div>
            </section>
            <section className="section-services">
                <h1 className="title">Conheça nossos serviços e encontre <mark>o que você precisa.</mark></h1>
                <p>Explore os vários serviços que temos disponível.</p>
                <section className="carousel-track-wrapper">
                    <button type="button" className="carousel-arrow carousel-arrow-left" aria-label="Página anterior de serviços" disabled={servicePage === 0} onClick={() => setServicePage((prev) => Math.max(prev - 1, 0))}>
                        <FaChevronLeft />
                    </button>
                    <section
                        className="services carousel-animated"
                        key={servicePage}
                        onMouseDown={(event) => startDrag(event.clientX)}
                        onMouseUp={(event) => endDrag(event.clientX, servicePage, getTotalPages(services), setServicePage)}
                        onMouseLeave={() => setDragStartX(null)}
                        onTouchStart={(event) => startDrag(event.touches[0].clientX)}
                        onTouchEnd={(event) => endDrag(event.changedTouches[0].clientX, servicePage, getTotalPages(services), setServicePage)}
                    >
                        {getPageItems(services, servicePage).map((service) => (
                            <section key={service.id} className="service">
                                <img className="serviceImage" src={service.imageUrl ?? null} alt={service.serviceName} />
                                <h2 className="serviceName">{service.serviceName}</h2>
                                <p className={`subtitle categoria ${service.category?.toLowerCase()}`}>{service.category}</p>
                            </section>
                        ))}
                    </section>
                    <button type="button" className="carousel-arrow carousel-arrow-right" aria-label="Próxima página de serviços" disabled={servicePage >= getTotalPages(services) - 1} onClick={() => setServicePage((prev) => Math.min(prev + 1, getTotalPages(services) - 1))}>
                        <FaChevronRight />
                    </button>
                </section>
                <div className="carousel-controls">{renderDots(getTotalPages(services), servicePage, setServicePage)}</div>
            </section>
            <section className="section-cta">
                <div>
                    <h1 className="title">Agendar nunca foi <mark>tão simples.</mark></h1>
                    <p>Cansado de esperar em filas e mais filas para conseguir um angedamento? Com a AgendIn, você se cadastra na plataforma e já tem os horários disponíveis na palma da sua mão. Chega de <mark>filas, estresse e frustração</mark> para seu serviço!</p>
                </div>
                <div className="cta-image">
                    <Button onClick={() => navigate("/Register")} children="Criar conta" className="btn mobile" />
                </div>
            </section>
            <section className="section-professionals">
                <h1 className="title">Os melhores profissionais trabalham <mark>aqui.</mark></h1>
                <p>Encontre <mark>profissionais certificados</mark> e renomados no ramo de forma simples e prática.</p>
                <section className="carousel-track-wrapper">
                    <button type="button" className="carousel-arrow carousel-arrow-left" aria-label="Página anterior de profissionais" disabled={professionalPage === 0} onClick={() => setProfessionalPage((prev) => Math.max(prev - 1, 0))}>
                        <FaChevronLeft />
                    </button>
                    <section
                        className="professionals carousel-animated"
                        key={professionalPage}
                        onMouseDown={(event) => startDrag(event.clientX)}
                        onMouseUp={(event) => endDrag(event.clientX, professionalPage, getTotalPages(professionals), setProfessionalPage)}
                        onMouseLeave={() => setDragStartX(null)}
                        onTouchStart={(event) => startDrag(event.touches[0].clientX)}
                        onTouchEnd={(event) => endDrag(event.changedTouches[0].clientX, professionalPage, getTotalPages(professionals), setProfessionalPage)}
                    >
                        {getPageItems(professionals, professionalPage).map((professional) => (
                            <section key={professional.id} className="professional">
                                <img src={professional.imageUrl ?? null} className="professionalImage" alt="" />
                                <div>
                                    <p className="professionalName">{professional.name}</p>
                                    <p className="profession">{professional.profession}</p>
                                    <p className="professional-services"><strong>Serviços disponíveis:</strong></p>
                                    <p className="service">{professional.services.join(", ")}</p>
                                    <Button onClick={() => navigate("/Register")} children="Agendar agora" className="btn mobile" />
                                </div>
                            </section>
                        ))}
                    </section>
                    <button type="button" className="carousel-arrow carousel-arrow-right" aria-label="Próxima página de profissionais" disabled={professionalPage >= getTotalPages(professionals) - 1} onClick={() => setProfessionalPage((prev) => Math.min(prev + 1, getTotalPages(professionals) - 1))}>
                        <FaChevronRight />
                    </button>
                </section>
                <div className="carousel-controls">{renderDots(getTotalPages(professionals), professionalPage, setProfessionalPage)}</div>
            </section>
            <section className="faq">
                <h1>Perguntas Frequentes (FAQ)</h1>
                <p className="faq-description">Tire suas dúvidas aqui, caso tenha outra pergunta, entre em contato com nossa <mark>equipe de atendimento.</mark></p>
                <Accordion items={faqItems} />
            </section>
            <footer>
                <div className="footer-info">
                    <div>
                        <img src={Logo} alt="" className="logo" />
                        <p>Rua Teste 123, Bairro Legal - Brasil</p>
                    </div>
                    <div className="contact">
                        <p>agendin@email.com</p>
                        <p>Instagram</p>
                    </div>
                </div>
                <p className="copy">Agendin ₢2026. Todos os direitos reservados.</p>
            </footer>
        </section>
    )
}

export default LandingPage
