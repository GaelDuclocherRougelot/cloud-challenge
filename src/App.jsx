import {Route, Routes, Router} from "react-router-dom";
import Challenges from "./pages/Challenges/Challenges.jsx";
import Contribution from "./pages/Contribution/Contribution.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Register/Register.jsx";
import Profil from "./pages/Profil/Profil.jsx";
import CreateChallenge from "./pages/Create-challenge/CreateChallenge.jsx";
import CorrectChallenges from "./pages/Correct-challenges/CorrectChallenges.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";
import NotFound from './components/NotFound/NotFound.jsx'
import Message from "./components/message.jsx";
function App() {
  const { currentUser } = useAuthContext();
  return (
    <>
    <Message />
      <Routes>
        {currentUser ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/contribution" element={<Contribution />} />
            <Route path="/my-profil" element={<Profil />} />
            <Route path="/create-challenge" element={<CreateChallenge />} />
            <Route path="/correct-challenges" element={<CorrectChallenges />} />
            <Route path="*" element={<NotFound/>} /> 
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="*" element={<NotFound/>} /> 
          </>
        )}
      </Routes>
    </>
  );

}


export default App
