import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IsAuth from "./IsAuth";

// Lógica para verificar se o usuário está autenticado (puxar do localStorage)
// Se estiver autenticado, redirecionar para a página de dashboard
// Se não estiver autenticado, permitir o acesso à página de registro

const Register = () => {
    if (IsAuth === true) {
        return <Navigate to="/dashboard"/>
    } else {
        return (
            <>
                <h1>Página de Register. Router configurado com sucesso.</h1>
            </>
        )
    }
}


export default Register;