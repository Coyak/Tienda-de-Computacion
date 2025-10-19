import { useState } from 'react'
import { getAllProductos, getCategorias } from '../../../data/db.js'
import ProductosAdmin from './ProductosAdmin.jsx'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('productos')
  const productos = getAllProductos()
  const categorias = getCategorias()

  const stats = {
    totalProductos: productos.length,
    totalCategorias: categorias.length,
    productosEnOferta: productos.filter(p => p.descuento > 0).length,
    stockBajo: productos.filter(p => p.stock <= 5).length
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Panel de Administración</h1>
          
          {/* Estadísticas */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>{stats.totalProductos}</h4>
                      <p className="mb-0">Total Productos</p>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-box-seam fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>{stats.totalCategorias}</h4>
                      <p className="mb-0">Categorías</p>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-tags fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>{stats.productosEnOferta}</h4>
                      <p className="mb-0">En Oferta</p>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-percent fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-danger text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>{stats.stockBajo}</h4>
                      <p className="mb-0">Stock Bajo</p>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-exclamation-triangle fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navegación por pestañas */}
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === 'productos' ? 'active' : ''}`}
                onClick={() => setActiveTab('productos')}
                type="button"
              >
                <i className="bi bi-box-seam me-2"></i>
                Gestión de Productos
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === 'resumen' ? 'active' : ''}`}
                onClick={() => setActiveTab('resumen')}
                type="button"
              >
                <i className="bi bi-graph-up me-2"></i>
                Resumen
              </button>
            </li>
          </ul>

          {/* Contenido de las pestañas */}
          <div className="tab-content">
            {activeTab === 'productos' && (
              <div className="tab-pane fade show active">
                <ProductosAdmin />
              </div>
            )}
            {activeTab === 'resumen' && (
              <div className="tab-pane fade show active">
                <div className="card mt-3">
                  <div className="card-header">
                    <h5>Resumen del Sistema</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h6>Productos por Categoría:</h6>
                        <ul className="list-group">
                          {categorias.map(categoria => {
                            const count = productos.filter(p => p.categoria === categoria).length
                            return (
                              <li key={categoria} className="list-group-item d-flex justify-content-between">
                                <span>{categoria}</span>
                                <span className="badge bg-primary rounded-pill">{count}</span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h6>Productos con Stock Bajo (≤5):</h6>
                        <ul className="list-group">
                          {productos.filter(p => p.stock <= 5).map(producto => (
                            <li key={producto.id} className="list-group-item d-flex justify-content-between">
                              <span>{producto.nombre}</span>
                              <span className="badge bg-danger rounded-pill">{producto.stock}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}