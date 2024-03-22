import { Route, Routes } from 'react-router-dom'
import Challenges from './pages/Challenges/Challenges.jsx'
import Contribution from './pages/Contribution/Contribution.jsx'
import CorrectChallenges from './pages/Correct-challenges/CorrectChallenges.jsx'
import CreateChallenge from './pages/Create-challenge/CreateChallenge.jsx'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Profil from './pages/Profil/Profil.jsx'
import Register from './pages/Register/Register.jsx'
// import { useAuthContext } from "./context/AuthContext.jsx";

import NotFound from './components/NotFound/NotFound.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import Message from './components/message.jsx'

function App() {
  // const { currentUser } = useAuthContext();
  return (
    <>
      <Message />
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/challenges"
          element={
            <PrivateRoute>
              <Challenges />
            </PrivateRoute>
          }
        />
        <Route
          path="/contribution"
          element={
            <PrivateRoute>
              <Contribution />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-challenge"
          element={
            <PrivateRoute>
              <CreateChallenge />
            </PrivateRoute>
          }
        />
        <Route
          path="/correct-challenges"
          element={
            <PrivateRoute>
              <CorrectChallenges />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
