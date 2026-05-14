import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerRequest } from "../../services/authService"
import { cpfDigits, formatCpfMasked, isValidCpf } from "../../utils/cpf";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Logo from "../../assets/img/imagotipo.png";
import { useAuth } from "../../context/AuthContext";
import { getUser } from "../../services/userService"

import "../../assets/css/Register.css"

const Register = () => {
  const { login } = useAuth()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCpfChange = (e) => {
    setCpf(formatCpfMasked(e.target.value));
  };

  let passwordType, confirmPasswordType;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    const cpfOnly = cpfDigits(cpf);

    if (!name || !email || !password || !cpfOnly) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (!isValidCpf(cpfOnly)) {
      setError("CPF inválido.");
      return;
    }

    // REGEX -> ao menos uma letra maiúscula, símbolo e número
    let passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "As senhas devem conter 8 ou mais caracteres, com letra maíusculas e números.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas devem ser iguais.");
      return;
    }

    setLoading(true);
    
    try {
      await registerRequest(name, email, password, cpf)
      const user = await getUser()
      login(user.role)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  };

  // Tipo de input para senha e confirmação de senha (mesma coisa para o login)
  if (showPassword) {
    passwordType = "text"
  } else {
    passwordType = "password"
  }

  if (showConfirmPassword) {
    confirmPasswordType = "text"
  } else {
    confirmPasswordType = "password"
  }

  return (
    <>
      <section className="background register">
        <form className="registerForm" onSubmit={handleRegister}>
          <div className="top-login">
            <img className="logo" src={Logo} alt="Logo AgendIn" />
            <p>Seja bem-vindo ao sistema!</p>
            <p className="signInText">
              <mark>Crie uma conta para continuar.</mark>
            </p>
            <p>
              {error ? <span className="errorMessage">{error}</span> : null}
            </p>
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
              <div className="labelShowPassword">
                <label htmlFor="password">Senha</label>
                <span className="showPassword">
                  {showPassword ? (
                    <FaEye
                      size={20}
                      color="#717171"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEyeSlash
                      size={20}
                      color="#717171"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </span>
              </div>
              <input
                id="password"
                type={passwordType}
                placeholder="Ex: 123456789"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <div className="labelShowPassword">
                <label htmlFor="confirmPassword">Confirme a senha</label>
                <span className="showPassword">
                  {showConfirmPassword ? (
                    <FaEye
                      size={20}
                      color="#717171"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  ) : (
                    <FaEyeSlash
                      size={20}
                      color="#717171"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  )}
                </span>
              </div>
              <input
                id="confirmPassword"
                type={confirmPasswordType}
                placeholder="Ex: 123456789"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              
            </div>
          </div>
          <span className="ja-login">
            <Link to="/Login">Já possui login?</Link>
          </span>
          <Button type="submit" children="Cadastrar" className="btn mobile" />
          <div className="or-other-options">
            <hr />
            <p>ou</p>
            <hr />
          </div>
          <div className="other-options">
            <div className="options">
              <Button
                className="option"
                type="button"
                onClick={() => setError("Cadastro com o Google em breve!")}
                children={
                  <>
                    <FcGoogle size={20} />
                  </>
                }
              />
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
