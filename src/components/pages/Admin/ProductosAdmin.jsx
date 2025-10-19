import { useState, useEffect } from 'react'
import { 
  getAllProductos, 
  addProducto, 
  updateProducto, 
  deleteProducto,
  getCategorias 
} from '../../../data/db.js'
import { 
  validateRequired, 
  validatePrice, 
  validateStock 
} from '../../../utils/validations.js'

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    imagen: '',
    descuento: 0
  })

  // Cargar datos al montar el componente
  useEffect(() => {
    loadProductos()
    loadCategorias()
  }, [])

  const loadProductos = () => {
    setProductos(getAllProductos())
  }

  const loadCategorias = () => {
    setCategorias(getCategorias())
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' || name === 'descuento' 
        ? parseFloat(value) || 0 
        : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validar formulario usando funciones centralizadas
    const errors = {}
    
    const nombreValidation = validateRequired(formData.nombre, 'Nombre')
    if (!nombreValidation.valid) errors.nombre = nombreValidation.error
    
    const precioValidation = validatePrice(formData.precio)
    if (!precioValidation.valid) errors.precio = precioValidation.error
    
    const stockValidation = validateStock(formData.stock)
    if (!stockValidation.valid) errors.stock = stockValidation.error
    
    const categoriaValidation = validateRequired(formData.categoria, 'Categoría')
    if (!categoriaValidation.valid) errors.categoria = categoriaValidation.error
    
    if (Object.keys(errors).length > 0) {
      alert('Por favor, corrige los errores en el formulario')
      return
    }
    
    if (editingProduct) {
      // Actualizar producto existente
      const updated = updateProducto(editingProduct.id, formData)
      if (updated) {
        loadProductos()
        loadCategorias()
        resetForm()
        alert('Producto actualizado correctamente')
      }
    } else {
      // Crear nuevo producto
      const nuevo = addProducto(formData)
      if (nuevo) {
        loadProductos()
        loadCategorias()
        resetForm()
        alert('Producto creado correctamente')
      }
    }
  }

  const handleEdit = (producto) => {
    setEditingProduct(producto)
    setFormData({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
      imagen: producto.imagen,
      descuento: producto.descuento
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const deleted = deleteProducto(id)
      if (deleted) {
        loadProductos()
        alert('Producto eliminado correctamente')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: '',
      precio: '',
      stock: '',
      categoria: '',
      imagen: '',
      descuento: 0
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleCancel = () => {
    resetForm()
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Gestión de Productos</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Nuevo Producto
            </button>
          </div>

          {/* Formulario de Producto */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header">
                <h5>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Precio</label>
                      <input
                        type="number"
                        className="form-control"
                        name="precio"
                        value={formData.precio}
                        onChange={handleInputChange}
                        min="0"
                        step="1"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        min="0"
                        step="1"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Categoría</label>
                      <select
                        className="form-select"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar categoría</option>
                        {categorias.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="Nueva">+ Nueva categoría</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">URL de Imagen</label>
                      <input
                        type="url"
                        className="form-control"
                        name="imagen"
                        value={formData.imagen}
                        onChange={handleInputChange}
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Descuento (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="descuento"
                        value={formData.descuento}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        step="1"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success">
                      {editingProduct ? 'Actualizar' : 'Crear'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Tabla de Productos */}
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Categoría</th>
                      <th>Descuento</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map(producto => (
                      <tr key={producto.id}>
                        <td>{producto.id}</td>
                        <td>
                          <div className="position-relative" style={{ width: '50px', height: '50px' }}>
                            {producto.imagen ? (
                              <img 
                                src={producto.imagen} 
                                alt={producto.nombre}
                                className="img-thumbnail position-absolute top-0 start-0"
                                style={{ 
                                  width: '100%', 
                                  height: '100%', 
                                  objectFit: 'cover',
                                  borderRadius: '4px',
                                  zIndex: 1
                                }}
                                onError={(e) => {
                                  // Si la imagen falla, ocultarla y mostrar placeholder
                                  e.target.style.display = 'none'
                                  const container = e.target.parentElement
                                  const placeholder = container.querySelector('.placeholder-fallback')
                                  if (placeholder) {
                                    placeholder.style.display = 'flex'
                                  }
                                }}
                              />
                            ) : null}
                            {!producto.imagen && (
                              <div 
                                className="d-flex align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100 placeholder-fallback"
                                style={{ 
                                  backgroundColor: 'rgba(64, 64, 122, 0.5)',
                                  color: '#e9ecef',
                                  fontSize: '10px',
                                  borderRadius: '4px',
                                  textAlign: 'center',
                                  zIndex: 0
                                }}
                              >
                                Sin imagen
                              </div>
                            )}
                          </div>
                        </td>
                        <td>{producto.nombre}</td>
                        <td>${producto.precio.toLocaleString()}</td>
                        <td>
                          <span className={`badge ${producto.stock > 10 ? 'bg-success' : producto.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
                            {producto.stock}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-info">{producto.categoria}</span>
                        </td>
                        <td>
                          {producto.descuento > 0 ? (
                            <span className="badge bg-danger">{producto.descuento}%</span>
                          ) : (
                            <span className="text-muted">Sin descuento</span>
                          )}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button 
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => handleEdit(producto)}
                              title="Editar"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(producto.id)}
                              title="Eliminar"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {productos.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">No hay productos registrados</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
