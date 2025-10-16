import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx'

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext)

  // Si no hay usuario o no es admin → redirigir a login
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return children
}