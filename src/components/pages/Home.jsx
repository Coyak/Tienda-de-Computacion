import { getAllProductos, getCategorias } from '../../data/db.js'
import ProductGrid from '../organisms/ProductGrid.jsx'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext.jsx'
import { Link } from 'react-router-dom'

export default function Home() {
  const { addToCart } = useContext(CartContext)
  const productos = getAllProductos()
  const categorias = getCategorias()

  return (
    <div className="container-fluid px-0">
      {/* Hero Section */}
      <div 
        className="hero-section text-center py-5"
        style={{
          background: 'linear-gradient(135deg, rgba(44, 44, 84, 0.9) 0%, rgba(77, 171, 247, 0.1) 100%)',
          borderBottom: '1px solid rgba(77, 171, 247, 0.3)'
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="mb-4">
                <i className="bi bi-laptop text-primary" style={{ fontSize: '5rem' }}></i>
              </div>
              <h1 className="display-4 text-primary mb-4 fw-bold">
                Tienda de Computación
              </h1>
              <p className="lead text-muted mb-4">
                Descubre la mejor tecnología para tu hogar y oficina. 
                Laptops, monitores, periféricos y más al mejor precio.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link 
                  to="/productos" 
                  className="btn btn-primary btn-lg px-4"
                  style={{ borderRadius: '25px' }}
                >
                  <i className="bi bi-box-seam me-2"></i>
                  Ver Productos
                </Link>
                <Link 
                  to="/categorias" 
                  className="btn btn-outline-primary btn-lg px-4"
                  style={{ borderRadius: '25px' }}
                >
                  <i className="bi bi-tags me-2"></i>
                  Explorar Categorías
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categorías Section */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center mb-5">
              <h2 className="text-primary mb-3">
                <i className="bi bi-grid-3x3-gap me-2"></i>
                Nuestras Categorías
              </h2>
              <p className="lead text-muted">
                Explora nuestros productos organizados por categorías
              </p>
            </div>

            <div className="row">
              {categorias.map((categoria, index) => (
                <div key={categoria} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <Link 
                    to={`/categorias?filter=${encodeURIComponent(categoria)}`}
                    className="text-decoration-none"
                  >
                    <div 
                      className="card h-100 text-center category-card"
                      style={{
                        backgroundColor: 'rgba(44, 44, 84, 0.8)',
                        border: '1px solid rgba(77, 171, 247, 0.2)',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)'
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(77, 171, 247, 0.2)'
                        e.currentTarget.style.borderColor = 'rgba(77, 171, 247, 0.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(77, 171, 247, 0.2)'
                      }}
                    >
                      <div className="card-body d-flex flex-column justify-content-center">
                        <div className="mb-3">
                          <i 
                            className={`bi ${
                              categoria === 'Notebooks' ? 'bi-laptop' :
                              categoria === 'Monitores' ? 'bi-display' :
                              categoria === 'Periféricos' ? 'bi-keyboard' :
                              categoria === 'Audio' ? 'bi-headphones' :
                              'bi-box'
                            } text-primary`} 
                            style={{ fontSize: '3rem' }}
                          ></i>
                        </div>
                        <h5 className="card-title text-primary mb-2">{categoria}</h5>
                        <p className="text-muted small mb-0">
                          {productos.filter(p => p.categoria === categoria).length} productos
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Productos Destacados Section */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center mb-5">
              <h2 className="text-primary mb-3">
                <i className="bi bi-star-fill text-warning me-2"></i>
                Productos Destacados
              </h2>
              <p className="lead text-muted">
                Los productos más populares de nuestra tienda
              </p>
            </div>

            <ProductGrid productos={productos.slice(0, 4)} onAdd={addToCart} />
            
            <div className="text-center mt-4">
              <Link 
                to="/productos" 
                className="btn btn-outline-primary"
                style={{ borderRadius: '25px' }}
              >
                <i className="bi bi-arrow-right me-2"></i>
                Ver Todos los Productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}