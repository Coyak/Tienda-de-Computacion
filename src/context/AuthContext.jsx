import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsuarioByEmail, addUsuario } from '../data/db.js'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const login = (email, password) => {
    const usuario = getUsuarioByEmail(email)
    
    if (usuario && usuario.password === password) {
      // No guardar la contraseña en el estado del usuario
      const { password: _, ...userData } = usuario
      setUser(userData)
      if (userData.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
      return true
    } else {
      alert('Credenciales inválidas')
      return false
    }
  }

  const register = (userData) => {
    const result = addUsuario(userData)
    
    if (result.success) {
      // No guardar la contraseña en el estado del usuario
      const { password: _, ...userWithoutPassword } = result.usuario
      setUser(userWithoutPassword)
      navigate('/login')
      return { success: true, user: userWithoutPassword }
    }
    
    return { success: false, error: result.error }
  }

  const logout = () => {
    setUser(null)
    navigate('/login')
  }

  const isAuthenticated = () => !!user

  const isAdmin = () => user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register,
      logout, 
      isAuthenticated,
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  )
}