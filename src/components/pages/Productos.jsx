import { getAllProductos } from '../../data/db.js'
import ProductGrid from '../organisms/ProductGrid.jsx'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext.jsx'

export default function Productos() {
  const productos = getAllProductos()
  const { addToCart } = useContext(CartContext)

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {/* Header con estilo mejorado */}
          <div className="text-center mb-5">
            <div className="mb-4">
              <i className="bi bi-box-seam text-primary" style={{ fontSize: '4rem' }}></i>
            </div>
            <h1 className="text-primary mb-3">Todos los Productos</h1>
            <p className="lead text-muted">
              Descubre nuestra amplia gama de productos de tecnología
            </p>
          </div>

          {/* Grid de productos */}
          <ProductGrid productos={productos} onAdd={addToCart} />
        </div>
      </div>
    </div>
  )
}