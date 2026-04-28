const IsAuth = window.addEventListener("load", () => {
    let token = 9090
    if (token) {
        if (token !== null && token !== undefined && token !== "") {
            // verificar se o token é valido via API 
            if(token === "1234567890") {
                console.log("Usuário autorizado.")
                return true
            } else {
                console.log("Usuário não autorizado.")
                return false
            }
        } else {
            console.log("Usuário não autenticado.")
            return false
        }
    } else {
        console.log("Usuário não autenticado.")
        return false
    }
});

export default IsAuth