import { Route, Routes } from 'react-router-dom'
import Challenges from './pages/Challenges/Challenges.jsx'
import Home from './pages/Home/Home.jsx'
import Contribution from './pages/Contribution/Contribution.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/contribution" element={<Contribution />} />
      </Routes>
    </>
  )
}

export default App
