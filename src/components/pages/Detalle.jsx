import { useParams } from 'react-router-dom'
import { getProductoById } from '../../data/db.js'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext.jsx'
import Button from '../atoms/Button.jsx'

export default function Detalle() {
  const { id } = useParams()
  const producto = getProductoById(id)
  const { addToCart } = useContext(CartContext)

  if (!producto) return <div>Producto no encontrado</div>

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h1>{producto.nombre}</h1>
          <p className="lead">${producto.precio.toLocaleString()}</p>
          <p>Stock disponible: {producto.stock}</p>
          <Button label="Agregar al carrito" onClick={() => addToCart(producto)} variant="success" />
        </div>
      </div>
    </div>
  )
}