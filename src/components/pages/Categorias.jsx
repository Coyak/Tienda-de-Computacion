import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { getAllProductos, getCategorias, getProductosByCategoria } from '../../data/db.js'
import ProductCard from '../molecules/ProductCard.jsx'
import { CartContext } from '../../context/CartContext.jsx'

export default function Categorias() {
  const { addToCart } = useContext(CartContext)
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [productosFiltrados, setProductosFiltrados] = useState([])

  useEffect(() => {
    loadData()
  }, [])

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
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Categorías de Productos</h1>
          
          {/* Filtros de Categoría */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Filtrar por Categoría</h5>
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
            <div className="alert alert-info">
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
              <div className="card">
                <div className="card-body">
                  <i className="bi bi-search display-1 text-muted mb-3"></i>
                  <h5>No se encontraron productos</h5>
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
