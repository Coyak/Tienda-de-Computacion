import { useState, useContext } from 'react'
import Input from '../atoms/Input.jsx'
import Button from '../atoms/Button.jsx'
import { AuthContext } from '../../context/AuthContext.jsx'

export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="border p-4 shadow rounded" style={{ width: 320 }} onSubmit={handleSubmit}>
        <h3 className="mb-3 text-center">Iniciar sesión</h3>
        <Input label="Correo" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button label="Entrar" type="submit" variant="primary" />
        <p className="text-muted mt-3 small text-center">admin@tienda.com / admin123</p>
      </form>
    </div>
  )
}