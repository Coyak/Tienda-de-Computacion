import { useState, useEffect } from 'react'
import { getProductosEnOferta, getAllProductos } from '../../data/db.js'
import ProductCard from '../molecules/ProductCard.jsx'

export default function Ofertas() {
  const [productosEnOferta, setProductosEnOferta] = useState([])
  const [filtroDescuento, setFiltroDescuento] = useState('')
  const [productosFiltrados, setProductosFiltrados] = useState([])

  useEffect(() => {
    loadOfertas()
  }, [])

  useEffect(() => {
    filtrarProductos()
  }, [productosEnOferta, filtroDescuento])

  const loadOfertas = () => {
    const ofertas = getProductosEnOferta()
    setProductosEnOferta(ofertas)
  }

  const filtrarProductos = () => {
    let filtrados = productosEnOferta

    if (filtroDescuento) {
      switch (filtroDescuento) {
        case 'bajo':
          filtrados = productosEnOferta.filter(p => p.descuento > 0 && p.descuento <= 10)
          break
        case 'medio':
          filtrados = productosEnOferta.filter(p => p.descuento > 10 && p.descuento <= 25)
          break
        case 'alto':
          filtrados = productosEnOferta.filter(p => p.descuento > 25)
          break
        default:
          filtrados = productosEnOferta
      }
    }

    setProductosFiltrados(filtrados)
  }

  const calcularPrecioConDescuento = (precio, descuento) => {
    return precio - (precio * descuento / 100)
  }

  const getDescuentoColor = (descuento) => {
    if (descuento <= 10) return 'success'
    if (descuento <= 25) return 'warning'
    return 'danger'
  }

  const estadisticas = {
    totalOfertas: productosEnOferta.length,
    descuentoPromedio: productosEnOferta.length > 0 
      ? productosEnOferta.reduce((sum, p) => sum + p.descuento, 0) / productosEnOferta.length 
      : 0,
    ahorroTotal: productosEnOferta.reduce((sum, p) => sum + (p.precio * p.descuento / 100), 0)
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-4">
            <h1 className="display-4 text-danger">
              <i className="bi bi-percent"></i> Ofertas Especiales
            </h1>
            <p className="lead">¡Aprovecha nuestros descuentos y ahorra en tus productos favoritos!</p>
          </div>

          {/* Estadísticas de Ofertas */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card bg-danger text-white">
                <div className="card-body text-center">
                  <h3>{estadisticas.totalOfertas}</h3>
                  <p className="mb-0">Productos en Oferta</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-warning text-white">
                <div className="card-body text-center">
                  <h3>{estadisticas.descuentoPromedio.toFixed(1)}%</h3>
                  <p className="mb-0">Descuento Promedio</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <h3>${estadisticas.ahorroTotal.toLocaleString()}</h3>
                  <p className="mb-0">Ahorro Total</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Filtrar por Descuento</h5>
              <div className="d-flex flex-wrap gap-2">
                <button 
                  className={`btn ${filtroDescuento === '' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFiltroDescuento('')}
                >
                  Todos los descuentos
                </button>
                <button 
                  className={`btn ${filtroDescuento === 'bajo' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFiltroDescuento('bajo')}
                >
                  Descuentos Bajos (1-10%)
                </button>
                <button 
                  className={`btn ${filtroDescuento === 'medio' ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => setFiltroDescuento('medio')}
                >
                  Descuentos Medios (11-25%)
                </button>
                <button 
                  className={`btn ${filtroDescuento === 'alto' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setFiltroDescuento('alto')}
                >
                  Descuentos Altos (25%+)
                </button>
              </div>
            </div>
          </div>

          {/* Información del filtro activo */}
          {filtroDescuento && (
            <div className="alert alert-info">
              <h6 className="mb-1">
                <i className="bi bi-funnel me-2"></i>
                Mostrando descuentos: <strong>
                  {filtroDescuento === 'bajo' && '1-10%'}
                  {filtroDescuento === 'medio' && '11-25%'}
                  {filtroDescuento === 'alto' && '25%+'}
                </strong>
              </h6>
              <p className="mb-0">
                {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {/* Grid de Productos en Oferta */}
          {productosFiltrados.length > 0 ? (
            <div className="row">
              {productosFiltrados.map(producto => {
                const precioConDescuento = calcularPrecioConDescuento(producto.precio, producto.descuento)
                const ahorro = producto.precio - precioConDescuento
                
                return (
                  <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div className="card h-100 position-relative">
                      {/* Badge de descuento */}
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className={`badge bg-${getDescuentoColor(producto.descuento)} fs-6`}>
                          -{producto.descuento}%
                        </span>
                      </div>
                      
                      {/* Imagen del producto */}
                      <div className="card-img-top-container" style={{ height: '200px', overflow: 'hidden' }}>
                        {producto.imagen ? (
                          <img 
                            src={producto.imagen} 
                            alt={producto.nombre}
                            className="card-img-top h-100 w-100"
                            style={{ objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div 
                          className="bg-light d-flex align-items-center justify-content-center h-100"
                          style={{ display: producto.imagen ? 'none' : 'flex' }}
                        >
                          <i className="bi bi-image text-muted" style={{ fontSize: '3rem' }}></i>
                        </div>
                      </div>

                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title">{producto.nombre}</h6>
                        <p className="card-text">
                          <span className="badge bg-info">{producto.categoria}</span>
                        </p>
                        
                        {/* Precios */}
                        <div className="mt-auto">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="text-decoration-line-through text-muted">
                              ${producto.precio.toLocaleString()}
                            </span>
                            <span className="h5 text-danger mb-0">
                              ${precioConDescuento.toLocaleString()}
                            </span>
                          </div>
                          <small className="text-success">
                            <i className="bi bi-arrow-down-circle"></i> Ahorras ${ahorro.toLocaleString()}
                          </small>
                        </div>

                        {/* Botones */}
                        <div className="d-grid gap-2 mt-3">
                          <button 
                            className="btn btn-danger"
                            onClick={() => {
                              console.log('Agregar al carrito:', producto)
                            }}
                          >
                            <i className="bi bi-cart-plus me-2"></i>
                            Agregar al Carrito
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="card">
                <div className="card-body">
                  <i className="bi bi-percent display-1 text-muted mb-3"></i>
                  <h5>No hay ofertas disponibles</h5>
                  <p className="text-muted">
                    {filtroDescuento 
                      ? `No hay productos con descuentos en el rango seleccionado`
                      : 'No hay productos en oferta en este momento'
                    }
                  </p>
                  {filtroDescuento && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => setFiltroDescuento('')}
                    >
                      Ver todas las ofertas
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Banner promocional */}
          <div className="card bg-gradient mt-4" style={{ background: 'linear-gradient(45deg, #ff6b6b, #feca57)' }}>
            <div className="card-body text-center text-white">
              <h4 className="mb-3">
                <i className="bi bi-lightning-charge me-2"></i>
                ¡Ofertas Relámpago!
              </h4>
              <p className="mb-3">
                Las ofertas más exclusivas con tiempo limitado. ¡No te las pierdas!
              </p>
              <button className="btn btn-light btn-lg">
                <i className="bi bi-clock me-2"></i>
                Ver Ofertas Relámpago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
