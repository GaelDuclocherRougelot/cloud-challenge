/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import { auth } from '../../utils/firebase_init'
import Navbar from '../Navbar/Navbar'

export const PrivateRoute = ({ children }) => {
  const user = auth.currentUser
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />
  }
  return (
    <>
      <Navbar />
      <main className="pl-[270px] p-8">{children}</main>
    </>
  )
}

export default PrivateRoute
