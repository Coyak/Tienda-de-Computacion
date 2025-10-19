import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext.jsx'
import Button from '../atoms/Button.jsx'

export default function Carrito() {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
  const navigate = useNavigate()

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = () => {
    if (!cart || cart.length === 0) {
      alert('Tu carrito está vacío')
      return
    }
    navigate('/checkout')
  }

  const handleClearCart = () => {
    if (!cart || cart.length === 0) return
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart()
    }
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
                <h3>Tu carrito está vacío</h3>
                <p className="text-muted mb-4">
                  Agrega algunos productos para comenzar tu compra
                </p>
                <Link to="/productos" className="btn btn-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Ver Productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Carrito de Compras</h1>
            <div className="d-flex gap-2">
              <Button
                label="Vaciar Carrito"
                variant="outline-danger"
                onClick={handleClearCart}
                disabled={!cart || cart.length === 0}
              />
              <Link to="/productos" className="btn btn-outline-primary">
                <i className="bi bi-arrow-left me-2"></i>
                Seguir Comprando
              </Link>
            </div>
          </div>

          {/* Lista de productos en el carrito */}
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => {
                      const descuento = item.descuento || 0
                      const precioConDescuento = descuento > 0 
                        ? item.precio - (item.precio * descuento / 100) 
                        : item.precio
                      const subtotal = precioConDescuento * item.cantidad

                      return (
                        <tr key={item.id}>
                          <td>
                            <div style={{ width: '60px', height: '60px', overflow: 'hidden' }}>
                              {item.imagen ? (
                                <img
                                  src={item.imagen}
                                  alt={item.nombre}
                                  className="img-fluid"
                                  style={{ 
                                    objectFit: 'contain', 
                                    width: '100%', 
                                    height: '100%',
                                    backgroundColor: 'rgba(64, 64, 122, 0.3)',
                                    padding: '5px'
                                  }}
                                  onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.nextSibling.style.display = 'flex'
                                  }}
                                />
                              ) : null}
                              <div
                                className="bg-light d-flex align-items-center justify-content-center h-100"
                                style={{ display: item.imagen ? 'none' : 'flex' }}
                              >
                                <i className="bi bi-image text-muted"></i>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <h6 className="mb-1">{item.nombre}</h6>
                              <span className="badge bg-info">{item.categoria}</span>
                              {descuento > 0 && (
                                <span className="badge bg-danger ms-1">-{descuento}%</span>
                              )}
                            </div>
                          </td>
                          <td>
                            {descuento > 0 ? (
                              <div>
                                <div className="text-decoration-line-through text-muted small">
                                  ${item.precio.toLocaleString()}
                                </div>
                                <div className="text-danger fw-bold">
                                  ${precioConDescuento.toLocaleString()}
                                </div>
                              </div>
                            ) : (
                              <span className="fw-bold">${item.precio.toLocaleString()}</span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.cantidad - 1)}
                                disabled={item.cantidad <= 1}
                              >
                                <i className="bi bi-dash"></i>
                              </button>
                              <span className="fw-bold">{item.cantidad}</span>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.cantidad + 1)}
                                disabled={item.cantidad >= item.stock}
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                            {item.cantidad >= item.stock && (
                              <small className="text-warning d-block">
                                Stock máximo: {item.stock}
                              </small>
                            )}
                          </td>
                          <td>
                            <span className="fw-bold text-primary">
                              ${subtotal.toLocaleString()}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeFromCart(item.id)}
                              title="Eliminar del carrito"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Resumen del carrito */}
          <div className="row mt-4">
            <div className="col-md-6 offset-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Resumen del Pedido</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Productos ({cart?.length || 0}):</span>
                    <span>{(cart || []).reduce((acc, item) => acc + (item.cantidad || 0), 0)} unidades</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="fw-bold">Total:</span>
                    <span className="fw-bold text-primary fs-5">
                      ${getCartTotal().toLocaleString()}
                    </span>
                  </div>
                  <Button
                    label="Continuar al Pago"
                    variant="success"
                    className="w-100"
                    onClick={handleCheckout}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
