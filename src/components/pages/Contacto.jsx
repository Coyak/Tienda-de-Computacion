import Input from '../atoms/Input.jsx'
import Button from '../atoms/Button.jsx'
import { useState } from 'react'

export default function Contacto() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Gracias ${nombre}, te contactaremos pronto.`)
    setNombre(''); setCorreo(''); setMensaje('')
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Header con estilo mejorado */}
          <div className="text-center mb-5">
            <div className="mb-4">
              <i className="bi bi-envelope text-primary" style={{ fontSize: '4rem' }}></i>
            </div>
            <h1 className="text-primary mb-3">Contacto</h1>
            <p className="lead text-muted">
              ¿Tienes alguna pregunta? ¡Nos encantaría escucharte!
            </p>
          </div>

          {/* Formulario de contacto */}
          <div className="card shadow-lg" style={{ backgroundColor: 'rgba(44, 44, 84, 0.9)', border: '1px solid rgba(77, 171, 247, 0.3)', borderRadius: '15px' }}>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Input 
                      label="Nombre Completo" 
                      value={nombre} 
                      onChange={e => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Input 
                      label="Correo Electrónico" 
                      type="email" 
                      value={correo} 
                      onChange={e => setCorreo(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label" style={{ color: '#e9ecef' }}>Mensaje</label>
                  <textarea
                    className="form-control"
                    value={mensaje}
                    onChange={e => setMensaje(e.target.value)}
                    rows="5"
                    required
                    style={{ 
                      backgroundColor: 'rgba(44, 44, 84, 0.8)', 
                      border: '1px solid rgba(77, 171, 247, 0.3)', 
                      color: '#e9ecef',
                      borderRadius: '8px'
                    }}
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>
                <div className="text-center">
                  <Button 
                    label="Enviar Mensaje" 
                    variant="primary" 
                    type="submit"
                    style={{ borderRadius: '25px', padding: '0.75rem 2rem' }}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Información de contacto adicional */}
          <div className="row mt-5">
            <div className="col-md-4 text-center mb-4">
              <div className="card h-100" style={{ backgroundColor: 'rgba(44, 44, 84, 0.8)', border: '1px solid rgba(77, 171, 247, 0.2)', borderRadius: '12px' }}>
                <div className="card-body">
                  <i className="bi bi-telephone text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                  <h5 style={{ color: '#e9ecef' }}>Teléfono</h5>
                  <p className="text-muted mb-0">+56 9 1234 5678</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="card h-100" style={{ backgroundColor: 'rgba(44, 44, 84, 0.8)', border: '1px solid rgba(77, 171, 247, 0.2)', borderRadius: '12px' }}>
                <div className="card-body">
                  <i className="bi bi-envelope text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                  <h5 style={{ color: '#e9ecef' }}>Email</h5>
                  <p className="text-muted mb-0">contacto@tiendapc.com</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="card h-100" style={{ backgroundColor: 'rgba(44, 44, 84, 0.8)', border: '1px solid rgba(77, 171, 247, 0.2)', borderRadius: '12px' }}>
                <div className="card-body">
                  <i className="bi bi-geo-alt text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                  <h5 style={{ color: '#e9ecef' }}>Dirección</h5>
                  <p className="text-muted mb-0">Puerto Montt, Chile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}