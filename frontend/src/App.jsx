import { Route, Routes, Link } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Dashboard from "./pages/Dashboard"
import LandingPage from "./pages/LandingPage"

import Logo from "./assets/img/imagotipo.png"

function App() {
  localStorage.setItem("token", "1234567890")
  
  return (
    <div className="App">
        <main>
          <Routes>
            <Route path="/" element={ <LandingPage/> }></Route>
            <Route path="/Login" element={ <Login/> }></Route>
            <Route path="/Register" element={ <Register/> }></Route>
          </Routes>
        </main>
    </div>
  )
}

export default App
