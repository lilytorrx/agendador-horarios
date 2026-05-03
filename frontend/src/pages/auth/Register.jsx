import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Logo from "../../assets/img/imagotipo.png"
import { registerRequest } from "../../services/authService"
import { cpfDigits, formatCpfMasked, isValidCpf } from "../../utils/cpf";

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpf, setCpf] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCpfChange = (e) => {
    setCpf(formatCpfMasked(e.target.value))
  };

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)

    const cpfOnly = cpfDigits(cpf)
    
    if (!name || !email || !password || !cpfOnly) {
      setError("Todos os campos são obrigatórios.")
      return
    }

    if (!isValidCpf(cpfOnly)) {
      setError("CPF inválido.")
      return
    }

    setLoading(true)

    try {
      await registerRequest(name, email, password, cpf)
      navigate("/login")
    } catch (err){
      setError(err.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <section className="background">
        <form className="registerForm" onSubmit={handleRegister}>
            <p className="errorMessage">{ error }</p>
            <div className="top">
              <img src={Logo} alt="Logo AgendIn" />
              <p>Seja bem-vindo ao sistema!</p>
              <p><mark>Crie uma conta para continuar.</mark></p>
              <p>{ error ? <span className="errorMessage">{ error }</span> : null }</p>
            </div>
            <div className="inputs">
              <div className="input">
                <label htmlFor="name">Nome</label>
                <input 
                  id="name"
                  type="text"  
                  placeholder="Ex: João da Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input">
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="Ex: 123.456.789-01"
                  maxLength={14}
                  value={cpf}
                  onChange={handleCpfChange}
                  required
                />
              </div>
              <div className="input">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Ex: joaosilva@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input">
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Ex: 123456789"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
        </form>
      </section>
    </>
  );
};

export default Register;
