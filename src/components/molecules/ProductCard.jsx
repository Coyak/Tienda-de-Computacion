import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.jsx'
import Button from '../atoms/Button.jsx'
import Card from '../atoms/Card.jsx'
import CardBody from '../atoms/CardBody.jsx'
import CardImg from '../atoms/CardImg.jsx'
import Badge from '../atoms/Badge.jsx'

export default function ProductCard({ producto, onAdd }) {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const { nombre, precio, stock, categoria, imagen, descuento = 0 } = producto
  
  const precioConDescuento = descuento > 0 ? precio - (precio * descuento / 100) : precio
  const ahorro = descuento > 0 ? precio - precioConDescuento : 0
  
  const getStockVariant = () => {
    if (stock === 0) return 'danger'
    if (stock <= 5) return 'warning'
    return 'success'
  }

  const getStockText = () => {
    if (stock === 0) return 'Sin Stock'
    if (stock <= 5) return `Stock Bajo (${stock})`
    return `Stock: ${stock}`
  }

  const handleAddToCart = (e) => {
    e.stopPropagation() // Evitar que se active el click de la tarjeta
    if (!user) {
      alert('Debes iniciar sesión para agregar productos al carrito')
      return
    }
    onAdd(producto)
  }

  const handleCardClick = () => {
    navigate(`/detalle/${producto.id}`)
  }

  return (
    <div 
      className="card h-100 position-relative shadow-sm" 
      style={{ 
        backgroundColor: 'rgba(44, 44, 84, 0.9)', 
        border: '1px solid rgba(77, 171, 247, 0.3)',
        color: '#e9ecef',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer'
      }}
      onClick={handleCardClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(77, 171, 247, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Badge de descuento */}
      {descuento > 0 && (
        <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 10 }}>
          <Badge variant="danger" size="md">-{descuento}%</Badge>
        </div>
      )}
      
      {/* Imagen del producto */}
      <div 
        className="position-relative" 
        style={{ 
          height: '200px', 
          overflow: 'hidden',
          backgroundColor: 'rgba(64, 64, 122, 0.3)',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px'
        }}
      >
        {imagen ? (
          <img 
            src={imagen} 
            alt={nombre}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ 
              objectFit: 'cover', // Llena todo el espacio sin espacios sobrantes
              zIndex: 1
            }}
            onLoad={(e) => {
              // Ocultar placeholder cuando la imagen se carga
              const placeholder = e.target.nextSibling
              if (placeholder) {
                placeholder.style.display = 'none'
              }
            }}
            onError={(e) => {
              e.target.style.display = 'none'
              const placeholder = e.target.nextSibling
              if (placeholder) {
                placeholder.style.display = 'flex'
              }
            }}
          />
        ) : null}
        <div 
          className="d-flex align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100"
          style={{ 
            display: imagen ? 'none' : 'flex',
            backgroundColor: 'rgba(64, 64, 122, 0.5)',
            color: '#e9ecef',
            zIndex: 0
          }}
        >
          <i className="bi bi-image" style={{ fontSize: '2rem' }}></i>
        </div>
      </div>

      <div className="card-body d-flex flex-column" style={{ color: '#e9ecef' }}>
        <h6 className="card-title" style={{ color: '#e9ecef' }}>{nombre}</h6>
        
        {/* Categoría */}
        <p className="card-text mb-2">
          <Badge variant="info" style={{ backgroundColor: '#4dabf7' }}>{categoria}</Badge>
        </p>
        
        {/* Stock */}
        <p className="card-text mb-2">
          <Badge variant={getStockVariant()}>
            {getStockText()}
          </Badge>
        </p>
        
        {/* Precios */}
        <div className="mt-auto">
          {descuento > 0 ? (
            <div className="mb-2">
              <div className="d-flex align-items-center gap-2">
                <span className="text-decoration-line-through text-muted small">
                  ${precio.toLocaleString()}
                </span>
                <span className="h6 text-danger mb-0">
                  ${precioConDescuento.toLocaleString()}
                </span>
              </div>
              <small className="text-success">
                <i className="bi bi-arrow-down-circle"></i> Ahorras ${ahorro.toLocaleString()}
              </small>
            </div>
          ) : (
            <p className="h6 mb-2" style={{ color: '#4dabf7' }}>${precio.toLocaleString()}</p>
          )}
        </div>

        {/* Botón de agregar al carrito */}
        <div className="d-grid">
          <Button 
            label={stock === 0 ? "Sin Stock" : (user ? "Agregar al Carrito" : "Inicia sesión para comprar")}
            onClick={handleAddToCart}
            disabled={stock === 0}
            variant={stock === 0 ? "secondary" : (user ? "primary" : "warning")}
          />
        </div>
      </div>
    </div>
  )
}