import {Route, Routes} from "react-router-dom";
import Challenges from "./pages/Challenges/Challenges.jsx";
import Contribution from "./pages/Contribution/Contribution.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Register/Register.jsx";

function App() {
  return (

    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/contribution" element={<Contribution />} />
      </Routes>
    </>
  )
}

export default App
