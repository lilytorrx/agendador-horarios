import { Route, Routes, Link } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Dashboard from "./pages/Dashboard"
import LandingPage from "./pages/LandingPage"

import Logo from "./assets/img/imagotipo.png"
import GuestRoute from "./components/GuestRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"

function App() {
  
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


            // Rotas de ADMIN
            <Route element={<AdminRoute/>}>
              <Route path="/admin/professionals" element={<div>profissionais teste</div>}/>
              <Route path="/admin/services" element={<div>serviços teste</div>}/>
            </Route>
          </Routes>
        </main>
    </div>
  )
}

export default App
