import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function CompraFallida() {
  const location = useLocation()
  const navigate = useNavigate()
  const error = location.state?.error || 'Error desconocido en el procesamiento del pago'
  const datosCliente = location.state?.datosCliente

  const [mostrarDetalles, setMostrarDetalles] = useState(false)

  const handleReintentar = () => {
    // Volver al checkout con los datos del cliente
    navigate('/checkout', { 
      state: { 
        datosCliente: datosCliente 
      } 
    })
  }

  const handleContactarSoporte = () => {
    // En una aplicación real, esto abriría un chat o formulario de contacto
    alert('Redirigiendo al soporte técnico...')
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Mensaje de Error */}
          <div className="text-center mb-5">
            <div className="mb-4">
              <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '5rem' }}></i>
            </div>
            <h1 className="text-danger mb-3">Error en el Procesamiento</h1>
            <p className="lead text-muted">
              Lo sentimos, hubo un problema al procesar tu pago. No se ha realizado ningún cargo.
            </p>
          </div>

          {/* Detalles del Error */}
          <div className="card mb-4">
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Información del Error
              </h5>
            </div>
            <div className="card-body">
              <div className="alert alert-danger">
                <h6><i className="bi bi-info-circle me-2"></i>Descripción del Error:</h6>
                <p className="mb-0">{error}</p>
              </div>

              <div className="mt-3">
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setMostrarDetalles(!mostrarDetalles)}
                >
                  <i className={`bi bi-chevron-${mostrarDetalles ? 'up' : 'down'} me-2`}></i>
                  {mostrarDetalles ? 'Ocultar' : 'Mostrar'} Detalles Técnicos
                </button>
                
                {mostrarDetalles && (
                  <div className="mt-3 p-3 bg-light rounded">
                    <h6>Detalles Técnicos:</h6>
                    <ul className="mb-0 small">
                      <li><strong>Código de Error:</strong> PAYMENT_PROCESSING_FAILED</li>
                      <li><strong>Timestamp:</strong> {new Date().toISOString()}</li>
                      <li><strong>ID de Sesión:</strong> {Date.now()}</li>
                      <li><strong>Método de Pago:</strong> {datosCliente?.metodoPago || 'No especificado'}</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Posibles Causas */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-question-circle me-2"></i>
                Posibles Causas
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>Problemas Comunes:</h6>
                  <ul>
                    <li>Datos de tarjeta incorrectos</li>
                    <li>Fondos insuficientes</li>
                    <li>Tarjeta bloqueada o vencida</li>
                    <li>Límite de transacción excedido</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6>Problemas Técnicos:</h6>
                  <ul>
                    <li>Conexión a internet inestable</li>
                    <li>Timeout del servidor de pagos</li>
                    <li>Mantenimiento del sistema</li>
                    <li>Error temporal del procesador</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Soluciones Sugeridas */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-lightbulb me-2"></i>
                Soluciones Sugeridas
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>Verifica tu Información:</h6>
                  <ul>
                    <li>Revisa el número de tarjeta</li>
                    <li>Confirma la fecha de vencimiento</li>
                    <li>Verifica el código CVV</li>
                    <li>Comprueba los datos de facturación</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6>Otras Opciones:</h6>
                  <ul>
                    <li>Intenta con otra tarjeta</li>
                    <li>Usa un método de pago diferente</li>
                    <li>Contacta a tu banco</li>
                    <li>Espera unos minutos y reintenta</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="text-center">
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleReintentar}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Reintentar Pago
              </button>
              <button 
                className="btn btn-outline-primary btn-lg"
                onClick={() => navigate('/productos')}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Volver a Productos
              </button>
              <button 
                className="btn btn-outline-secondary btn-lg"
                onClick={handleContactarSoporte}
              >
                <i className="bi bi-headset me-2"></i>
                Contactar Soporte
              </button>
            </div>
          </div>

          {/* Información de Seguridad */}
          <div className="card mt-4">
            <div className="card-body text-center">
              <h6><i className="bi bi-shield-check me-2"></i>Tu Seguridad es Importante</h6>
              <p className="mb-0 small text-muted">
                No se ha realizado ningún cargo a tu cuenta. Todos los datos de pago son procesados de forma segura 
                y encriptada. Si tienes dudas, contacta a tu banco o a nuestro equipo de soporte.
              </p>
            </div>
          </div>

          {/* Métodos de Pago Alternativos */}
          <div className="card mt-3">
            <div className="card-header">
              <h6 className="mb-0">
                <i className="bi bi-credit-card me-2"></i>
                Métodos de Pago Alternativos
              </h6>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3">
                  <i className="bi bi-credit-card-2-front fs-1 text-primary"></i>
                  <p className="small">Tarjeta de Crédito</p>
                </div>
                <div className="col-md-3">
                  <i className="bi bi-bank fs-1 text-success"></i>
                  <p className="small">Transferencia Bancaria</p>
                </div>
                <div className="col-md-3">
                  <i className="bi bi-paypal fs-1 text-info"></i>
                  <p className="small">PayPal</p>
                </div>
                <div className="col-md-3">
                  <i className="bi bi-phone fs-1 text-warning"></i>
                  <p className="small">Pago Móvil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
