import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginRequest } from "../../services/authService";

import Logo from "../../assets/img/imagotipo.png";
import Button from "../../components/Button";

const Login = () => {
  const { saveToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let passwordType;

  if (showPassword) {
    passwordType = "text";
  } else {
    passwordType = "password";
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const data = await loginRequest(email, password);
      saveToken(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="background">
        <form className="loginForm" onSubmit={handleLogin}>
          <div className="top">
            <img src={Logo} alt="Logo AgendIn" />
            <p>Seja bem-vindo ao sistema!</p>
            <p>
              <mark>Entre para continuar.</mark>
            </p>
            <p className="errorMessage">{error}</p>
          </div>
          <div className="inputs">
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
                type={passwordType}
                name="password"
                placeholder="Ex: 123456"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
          </div>
          <span>
            <Link to="/ForgotPassword">Esqueceu a senha?</Link>
            <Link to="/Register">Não possui cadastro?</Link>
          </span>
          <Button type="submit" children="Entrar" />
          <div className="or-other-options">
            <hr />
            <p>ou</p>
            <hr />
          </div>
          <div className="other-options">
            <div className="options">
              <Button
                type="button"
                onClick={() => setError("Login com o Google em breve!")}
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
  );
};

export default Login;