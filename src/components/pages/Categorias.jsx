import { useState, useEffect, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAllProductos, getCategorias, getProductosByCategoria } from '../../data/db.js'
import ProductCard from '../molecules/ProductCard.jsx'
import { CartContext } from '../../context/CartContext.jsx'

export default function Categorias() {
  const { addToCart } = useContext(CartContext)
  const [searchParams] = useSearchParams()
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [productosFiltrados, setProductosFiltrados] = useState([])

  useEffect(() => {
    loadData()
    
    // Verificar si hay un filtro en la URL
    const filterFromUrl = searchParams.get('filter')
    if (filterFromUrl) {
      setCategoriaSeleccionada(filterFromUrl)
    }
  }, [searchParams])

  useEffect(() => {
    if (categoriaSeleccionada) {
      const filtrados = getProductosByCategoria(categoriaSeleccionada)
      setProductosFiltrados(filtrados)
    } else {
      setProductosFiltrados(productos)
    }
  }, [categoriaSeleccionada, productos])

  const loadData = () => {
    const categoriasData = getCategorias()
    const productosData = getAllProductos()
    setCategorias(categoriasData)
    setProductos(productosData)
    setProductosFiltrados(productosData)
  }

  const handleCategoriaChange = (categoria) => {
    setCategoriaSeleccionada(categoria)
  }

  const limpiarFiltro = () => {
    setCategoriaSeleccionada('')
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {/* Header con estilo mejorado */}
          <div className="text-center mb-5">
            <div className="mb-4">
              <i className="bi bi-tags text-primary" style={{ fontSize: '4rem' }}></i>
            </div>
            <h1 className="text-primary mb-3">Categorías de Productos</h1>
            <p className="lead text-muted">
              Explora nuestros productos organizados por categorías
            </p>
          </div>
          
          {/* Filtros de Categoría */}
          <div className="card mb-4" style={{ backgroundColor: 'rgba(44, 44, 84, 0.8)', border: '1px solid rgba(77, 171, 247, 0.2)' }}>
            <div className="card-header" style={{ backgroundColor: 'rgba(64, 64, 122, 0.6)', borderBottom: '1px solid rgba(77, 171, 247, 0.2)' }}>
              <h5 className="mb-0" style={{ color: '#e9ecef' }}>
                <i className="bi bi-funnel me-2" style={{ color: '#4dabf7' }}></i>
                Filtrar por Categoría
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2">
                <button 
                  className={`btn ${categoriaSeleccionada === '' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={limpiarFiltro}
                >
                  Todas las categorías
                </button>
                {categorias.map(categoria => (
                  <button 
                    key={categoria}
                    className={`btn ${categoriaSeleccionada === categoria ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleCategoriaChange(categoria)}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Información del filtro activo */}
          {categoriaSeleccionada && (
            <div className="alert alert-info" style={{ backgroundColor: 'rgba(77, 171, 247, 0.1)', borderColor: 'rgba(77, 171, 247, 0.3)', color: '#e9ecef' }}>
              <h6 className="mb-1">
                <i className="bi bi-funnel me-2"></i>
                Mostrando productos de: <strong>{categoriaSeleccionada}</strong>
              </h6>
              <p className="mb-0">
                {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {/* Grid de Productos */}
          {productosFiltrados.length > 0 ? (
            <div className="row">
              {productosFiltrados.map(producto => (
                <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <ProductCard 
                    producto={producto}
                    onAdd={addToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="card" style={{ backgroundColor: 'rgba(44, 44, 84, 0.8)', border: '1px solid rgba(77, 171, 247, 0.2)' }}>
                <div className="card-body">
                  <i className="bi bi-search display-1 text-muted mb-3"></i>
                  <h5 style={{ color: '#e9ecef' }}>No se encontraron productos</h5>
                  <p className="text-muted">
                    {categoriaSeleccionada 
                      ? `No hay productos en la categoría "${categoriaSeleccionada}"`
                      : 'No hay productos disponibles'
                    }
                  </p>
                  {categoriaSeleccionada && (
                    <button 
                      className="btn btn-primary"
                      onClick={limpiarFiltro}
                    >
                      Ver todas las categorías
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
