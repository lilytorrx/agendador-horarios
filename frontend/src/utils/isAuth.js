export default function isAuth() {
    const token = 'localStorage.getItem("token")';
    // Chamada para API
    return !!token && token !== "";
}