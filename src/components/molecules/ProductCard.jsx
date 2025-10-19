import Button from '../atoms/Button.jsx'
import Card from '../atoms/Card.jsx'
import CardBody from '../atoms/CardBody.jsx'
import CardImg from '../atoms/CardImg.jsx'
import Badge from '../atoms/Badge.jsx'

export default function ProductCard({ producto, onAdd }) {
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

  return (
    <Card className="h-100 position-relative">
      {/* Badge de descuento */}
      {descuento > 0 && (
        <div className="position-absolute top-0 end-0 m-2">
          <Badge variant="danger" size="md">-{descuento}%</Badge>
        </div>
      )}
      
      {/* Imagen del producto */}
      <CardImg 
        src={imagen} 
        alt={nombre}
        className="h-100 w-100"
        style={{ objectFit: 'cover', height: '200px' }}
      />

      <CardBody className="d-flex flex-column">
        <h6 className="card-title">{nombre}</h6>
        
        {/* Categoría */}
        <p className="card-text mb-2">
          <Badge variant="info">{categoria}</Badge>
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
            <p className="h6 text-primary mb-2">${precio.toLocaleString()}</p>
          )}
        </div>

        {/* Botón */}
        <div className="d-grid">
          <Button 
            label={stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
            onClick={() => onAdd(producto)}
            disabled={stock === 0}
            variant={stock === 0 ? "secondary" : "primary"}
          />
        </div>
      </CardBody>
    </Card>
  )
}