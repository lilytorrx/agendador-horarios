export default function isAuth() {
    const token = localStorage.getItem("token");
    return !!token && token !== "";
}