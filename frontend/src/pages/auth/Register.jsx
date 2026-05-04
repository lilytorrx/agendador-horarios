import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Logo from "../../assets/img/imagotipo.png"
import { registerRequest } from "../../services/authService"
import { cpfDigits, formatCpfMasked, isValidCpf } from "../../utils/cpf";
import { EyeClosedIcon, EyeIcon } from "lucide-react"
import Button from "../../components/Button"

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [cpf, setCpf] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const handleCpfChange = (e) => {
    setCpf(formatCpfMasked(e.target.value))
  };

  let passwordType, confirmPasswordType

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

    if (password != confirmPassword) {
      setError("As senhas devem ser iguais.")
      return
    }

    // REGEX -> ao menos uma letra maiúscula, símbolo e número
    let passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/

    if (!passwordRegex.test(password)) {
      setError("As senhas devem conter 8 ou mais caracteres, com letra maíusculas e números.")
      return
    } 

    if (password !== confirmPassword) {
      setError("As senhas devem ser iguais.")
      return
    }
    
  
 
   // Tipo de input para senha e confirmação de senha (mesma coisa para o login)
   if(showPassword) {
     passwordType="text"
   } else {
     passwordType="password"
   }
 
   if(showConfirmPassword) {
     confirmPasswordType="text"
   } else {
     confirmPasswordType="password"
   }

  setLoading(true)

  try {
    await registerRequest(name, email, password, cpf)
    navigate("/login")
  } catch (err){
    setError("Ocorreu um erro. Tente novamente.")
  } finally {
    setLoading(false)
  }
};

  return (
    <>
      <section className="background">
        <form className="registerForm" onSubmit={handleRegister}>
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
                  type={passwordType}
                  placeholder="Ex: 123456789"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                 <span className="showPassword">
                  {showPassword ? <EyeIcon size={20}color="#717171" onClick={() => setShowPassword(!showPassword)}/> : <EyeClosedIcon size={20} color="#717171" onClick={() => setShowPassword(!showPassword)}/>}
                </span>
              </div>
              <div className="input">
                <label htmlFor="confirmPassword">Confirme a senha</label>
                <input
                  id="confirmPassword"
                  type={confirmPasswordType}
                  placeholder="Ex: 123456789"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="showPassword">
                  {showConfirmPassword ? <EyeIcon size={20}color="#717171" onClick={() => setShowConfirmPassword(!showConfirmPassword)}/> : <EyeClosedIcon size={20} color="#717171" onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>}
                </span>
              </div>
            </div>
            <Button
              onClick={handleRegister}
              children="Criar conta"
            />
        </form>
      </section>
    </>
  );
};

export default Register;
