const IsAuth = window.addEventListener("load", () => {
    if (localStorage.getItem("token")) {
        console.log("Usuário autenticado")
    } else {
        console.log("Usuário não autenticado")
    } 
});

export default IsAuth