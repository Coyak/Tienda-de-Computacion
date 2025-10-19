import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function CompraExitosa() {
  const location = useLocation()
  const navigate = useNavigate()
  const orden = location.state?.orden
  

  useEffect(() => {
    // Si no hay datos de la orden, redirigir a productos después de un breve delay
    if (!orden) {
      const timer = setTimeout(() => {
        navigate('/productos')
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [orden, navigate])

  if (!orden) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center">
              <div className="mb-4">
                <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '5rem' }}></i>
              </div>
              <h1 className="text-warning mb-3">No se encontraron datos de la orden</h1>
              <p className="lead text-muted">
                Redirigiendo a la página de productos en unos segundos...
              </p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const fechaOrden = new Date(orden.fecha).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Mensaje de Éxito */}
          <div className="text-center mb-5">
            <div className="mb-4">
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
            </div>
            <h1 className="text-success mb-3">¡Compra Realizada con Éxito!</h1>
            <p className="lead text-muted">
              Gracias por tu compra. Hemos recibido tu pedido y te enviaremos un email de confirmación.
            </p>
          </div>

          {/* Detalles de la Orden */}
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-receipt me-2"></i>
                Detalles de la Orden #{orden.id}
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>Información de la Orden</h6>
                  <p><strong>Número de Orden:</strong> #{orden.id}</p>
                  <p><strong>Fecha:</strong> {fechaOrden}</p>
                  <p><strong>Estado:</strong> <span className="badge bg-success">Confirmada</span></p>
                </div>
                <div className="col-md-6">
                  <h6>Información de Envío</h6>
                  <p><strong>Cliente:</strong> {orden.datosCliente.nombre}</p>
                  <p><strong>Email:</strong> {orden.datosCliente.email}</p>
                  <p><strong>Dirección:</strong> {orden.datosCliente.direccion}</p>
                  <p><strong>Ciudad:</strong> {orden.datosCliente.ciudad}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Productos Comprados */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-box-seam me-2"></i>
                Productos Comprados
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                      <th>Descuento</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orden.productos.map(item => {
                      const subtotal = item.precio * item.cantidad
                      const descuento = item.descuento || 0
                      const descuentoMonto = subtotal * descuento / 100
                      const totalItem = subtotal - descuentoMonto
                      
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              {item.imagen && (
                                <img 
                                  src={item.imagen} 
                                  alt={item.nombre}
                                  className="me-3"
                                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                              )}
                              <div>
                                <h6 className="mb-0">{item.nombre}</h6>
                                <small className="text-muted">{item.categoria}</small>
                              </div>
                            </div>
                          </td>
                          <td>{item.cantidad}</td>
                          <td>${item.precio.toLocaleString()}</td>
                          <td>
                            {descuento > 0 ? (
                              <span className="text-success">-{descuento}%</span>
                            ) : (
                              <span className="text-muted">Sin descuento</span>
                            )}
                          </td>
                          <td>${totalItem.toLocaleString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="4">Total de la Orden:</th>
                      <th className="text-primary">${orden.total.toLocaleString()}</th>
                    </tr>
                    {orden.descuento > 0 && (
                      <tr>
                        <th colSpan="4">Descuento Aplicado:</th>
                        <th className="text-success">-${orden.descuento.toLocaleString()}</th>
                      </tr>
                    )}
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="card mb-4">
            <div className="card-body">
              <h6><i className="bi bi-info-circle me-2"></i>Próximos Pasos</h6>
              <ul className="mb-0">
                <li>Recibirás un email de confirmación en <strong>{orden.datosCliente.email}</strong></li>
                <li>Procesaremos tu pedido en las próximas 24 horas</li>
                <li>Te enviaremos un email con el número de seguimiento cuando sea despachado</li>
                <li>El tiempo de entrega estimado es de 3-5 días hábiles</li>
              </ul>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="text-center">
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/productos')}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Seguir Comprando
              </button>
              <button 
                className="btn btn-outline-secondary btn-lg"
                onClick={() => navigate('/')}
              >
                <i className="bi bi-house me-2"></i>
                Ir al Inicio
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
