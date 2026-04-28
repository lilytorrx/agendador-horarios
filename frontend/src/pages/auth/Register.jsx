import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpf, setCpf] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await registerRequest(name, email, password, cpf)
      navigate("/login")
    } catch (err){
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      
    </>
  );
};

export default Register;
