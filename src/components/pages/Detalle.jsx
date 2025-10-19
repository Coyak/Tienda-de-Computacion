import { useParams, useNavigate } from 'react-router-dom'
import { getProductoById } from '../../data/db.js'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext.jsx'
import { AuthContext } from '../../context/AuthContext.jsx'
import Button from '../atoms/Button.jsx'

export default function Detalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const producto = getProductoById(id)
  const { addToCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  if (!producto) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card" style={{ backgroundColor: 'rgba(44, 44, 84, 0.8)', border: '1px solid rgba(77, 171, 247, 0.2)' }}>
              <div className="card-body text-center">
                <h2 style={{ color: '#e9ecef' }}>Producto no encontrado</h2>
                <p style={{ color: '#adb5bd' }}>El producto que buscas no existe o ha sido eliminado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const precioConDescuento = producto.descuento > 0 ? producto.precio - (producto.precio * producto.descuento / 100) : producto.precio

  const handleAddToCart = () => {
    if (!user) {
      alert('Debes iniciar sesión para agregar productos al carrito')
      return
    }
    addToCart(producto)
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header con estilo mejorado */}
          <div className="text-center mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button 
                className="btn btn-outline-primary d-flex align-items-center gap-2"
                onClick={() => navigate(-1)}
                style={{ borderRadius: '25px' }}
              >
                <i className="bi bi-arrow-left"></i>
                Volver
              </button>
              <h1 className="text-primary mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Detalle del Producto
              </h1>
              <div></div>
            </div>
          </div>

          <div className="card shadow-lg" style={{ backgroundColor: 'rgba(44, 44, 84, 0.9)', border: '1px solid rgba(77, 171, 247, 0.3)', borderRadius: '15px' }}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="text-center">
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre} 
                      className="img-fluid rounded" 
                      style={{ 
                        maxHeight: '400px', 
                        objectFit: 'contain',
                        backgroundColor: 'rgba(64, 64, 122, 0.3)',
                        padding: '10px'
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <h2 style={{ color: '#e9ecef' }}>{producto.nombre}</h2>
                  
                  <div className="mb-3">
                    <span className="badge bg-info me-2" style={{ backgroundColor: '#4dabf7' }}>{producto.categoria}</span>
                    {producto.descuento > 0 && (
                      <span className="badge bg-danger">-{producto.descuento}% Descuento</span>
                    )}
                  </div>

                  <div className="mb-3">
                    {producto.descuento > 0 ? (
                      <div>
                        <p className="h4 mb-1" style={{ color: '#4dabf7' }}>
                          ${precioConDescuento.toLocaleString()}
                        </p>
                        <p className="text-decoration-line-through text-muted mb-0">
                          ${producto.precio.toLocaleString()}
                        </p>
                        <small className="text-success">
                          Ahorras ${(producto.precio - precioConDescuento).toLocaleString()}
                        </small>
                      </div>
                    ) : (
                      <p className="h4" style={{ color: '#4dabf7' }}>
                        ${producto.precio.toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <p style={{ color: '#e9ecef' }}>
                      <strong>Stock disponible:</strong> 
                      <span className={`ms-2 badge ${producto.stock > 5 ? 'bg-success' : producto.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
                        {producto.stock > 0 ? `${producto.stock} unidades` : 'Sin stock'}
                      </span>
                    </p>
                  </div>

                  <div className="d-grid">
                    <Button 
                      label={producto.stock > 0 ? (user ? "Agregar al carrito" : "Inicia sesión para comprar") : "Sin stock"} 
                      onClick={handleAddToCart} 
                      variant={producto.stock > 0 ? (user ? "success" : "warning") : "secondary"}
                      disabled={producto.stock === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}