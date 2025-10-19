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
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          {/* Header con estilo mejorado */}
          <div className="text-center mb-5">
            <div className="mb-4">
              <i className="bi bi-box-arrow-in-right text-primary" style={{ fontSize: '4rem' }}></i>
            </div>
            <h1 className="text-primary mb-3">Iniciar Sesión</h1>
            <p className="lead text-muted">
              Accede a tu cuenta para disfrutar de todas las funcionalidades
            </p>
          </div>

          {/* Formulario de login */}
          <div className="card shadow-lg" style={{ backgroundColor: 'rgba(44, 44, 84, 0.9)', border: '1px solid rgba(77, 171, 247, 0.3)', borderRadius: '15px' }}>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Input 
                    label="Correo Electrónico" 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <Input 
                    label="Contraseña" 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <Button 
                    label="Iniciar Sesión" 
                    type="submit" 
                    variant="primary"
                    style={{ borderRadius: '25px', padding: '0.75rem 2rem' }}
                  />
                </div>
              </form>
              
              {/* Información de credenciales */}
              <div className="mt-4 p-3" style={{ backgroundColor: 'rgba(77, 171, 247, 0.1)', borderRadius: '8px', border: '1px solid rgba(77, 171, 247, 0.2)' }}>
                <p className="text-muted mb-2 small text-center">
                  <i className="bi bi-info-circle me-2"></i>
                  Credenciales de prueba:
                </p>
                <p className="text-muted mb-0 small text-center">
                  <strong>Admin:</strong> admin@tienda.com / admin123<br/>
                  <strong>Usuario:</strong> usuario@demo.com / demo123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}