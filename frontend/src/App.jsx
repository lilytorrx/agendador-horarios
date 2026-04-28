import { Route, Routes, Link } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Dashboard from "./pages/Dashboard"
import LandingPage from "./pages/LandingPage"

import Logo from "./assets/img/imagotipo.png"
import GuestRoute from "./components/GuestRoute"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  localStorage.setItem("token", "1234567890")
  
  return (
    <div className="App">
        <main>
          <Routes>
            // Rotas bloqueadas se já autenticado
            <Route element={<GuestRoute/>}>
              <Route path="/Login" element={ <Login/> }></Route>
              <Route path="/Register" element={ <Register/> }></Route>
            </Route>

            <Route path="/" element={ <LandingPage/> }></Route>

            //Rotas protegidas
            <Route element={<ProtectedRoute/>}>
              <Route path="/Dashboard" element={ <Dashboard/> }></Route>
            </Route>
          </Routes>
        </main>
    </div>
  )
}

export default App
