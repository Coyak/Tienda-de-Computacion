import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext.jsx'
import { AuthContext } from '../../context/AuthContext.jsx'
import Input from '../atoms/Input.jsx'
import Button from '../atoms/Button.jsx'
import { 
  validateRequired, 
  validateEmail, 
  validatePhone, 
  validatePostalCode 
} from '../../utils/validations.js'

export default function Checkout() {
  const { cart, clearCart, getCartTotal } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    metodoPago: 'tarjeta',
    numeroTarjeta: '',
    fechaVencimiento: '',
    cvv: ''
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/productos')
    }
  }, [cart, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validaciones básicas usando funciones centralizadas
    const nombreValidation = validateRequired(formData.nombre, 'Nombre')
    if (!nombreValidation.valid) newErrors.nombre = nombreValidation.error

    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.valid) newErrors.email = emailValidation.error

    const telefonoValidation = validatePhone(formData.telefono)
    if (!telefonoValidation.valid) newErrors.telefono = telefonoValidation.error

    const direccionValidation = validateRequired(formData.direccion, 'Dirección')
    if (!direccionValidation.valid) newErrors.direccion = direccionValidation.error

    const ciudadValidation = validateRequired(formData.ciudad, 'Ciudad')
    if (!ciudadValidation.valid) newErrors.ciudad = ciudadValidation.error

    const codigoPostalValidation = validatePostalCode(formData.codigoPostal)
    if (!codigoPostalValidation.valid) newErrors.codigoPostal = codigoPostalValidation.error

    // Validaciones de pago
    if (formData.metodoPago === 'tarjeta') {
      if (!formData.numeroTarjeta.trim()) newErrors.numeroTarjeta = 'El número de tarjeta es requerido'
      else if (!/^\d{16}$/.test(formData.numeroTarjeta.replace(/\s/g, ''))) {
        newErrors.numeroTarjeta = 'Número de tarjeta inválido (16 dígitos)'
      }
      if (!formData.fechaVencimiento.trim()) newErrors.fechaVencimiento = 'La fecha de vencimiento es requerida'
      else if (!/^\d{2}\/\d{2}$/.test(formData.fechaVencimiento)) {
        newErrors.fechaVencimiento = 'Formato inválido (MM/AA)'
      }
      if (!formData.cvv.trim()) newErrors.cvv = 'El CVV es requerido'
      else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV inválido (3-4 dígitos)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calcularSubtotal = () => {
    return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0)
  }

  const calcularDescuento = () => {
    return cart.reduce((total, item) => {
      const descuento = item.descuento || 0
      return total + (item.precio * item.cantidad * descuento / 100)
    }, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    setIsProcessing(true)

    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simular éxito/fallo aleatorio (90% éxito)
      const exito = Math.random() > 0.1
      
      if (exito) {
        // Crear datos de la orden antes de limpiar el carrito
        const ordenData = {
          id: Date.now(),
          fecha: new Date().toISOString(),
          productos: [...cart], // Copia del carrito
          total: getCartTotal(),
          descuento: calcularDescuento(),
          datosCliente: formData
        }
        
        // Navegar primero, limpiar después
        navigate('/compra-exitosa', { 
          state: { 
            orden: ordenData
          }
        })
        
        // Limpiar carrito después de un pequeño delay
        setTimeout(() => {
          clearCart()
        }, 100)
      } else {
        // Redirigir a fallo
        navigate('/compra-fallida', { 
          state: { 
            error: 'Error en el procesamiento del pago. Por favor, inténtalo nuevamente.',
            datosCliente: formData
          }
        })
      }
    } catch (error) {
      navigate('/compra-fallida', { 
        state: { 
          error: 'Error inesperado. Por favor, contacta con soporte.',
          datosCliente: formData
        }
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (cart.length === 0) {
    return null
  }

  const subtotal = calcularSubtotal()
  const descuento = calcularDescuento()
  const total = getCartTotal()

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Finalizar Compra</h1>
        </div>
      </div>

      <div className="row">
        {/* Formulario de Checkout */}
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            {/* Información Personal */}
            <div className="card mb-4">
              <div className="card-header">
                <h5><i className="bi bi-person me-2"></i>Información Personal</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Input
                      label="Nombre Completo"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      error={errors.nombre}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Input
                      label="Teléfono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      error={errors.telefono}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dirección de Envío */}
            <div className="card mb-4">
              <div className="card-header">
                <h5><i className="bi bi-geo-alt me-2"></i>Dirección de Envío</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 mb-3">
                    <Input
                      label="Dirección"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      error={errors.direccion}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Input
                      label="Ciudad"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      error={errors.ciudad}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Input
                      label="Código Postal"
                      name="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={handleInputChange}
                      error={errors.codigoPostal}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Información de Pago */}
            <div className="card mb-4">
              <div className="card-header">
                <h5><i className="bi bi-credit-card me-2"></i>Información de Pago</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Método de Pago</label>
                  <select 
                    className="form-select"
                    name="metodoPago"
                    value={formData.metodoPago}
                    onChange={handleInputChange}
                  >
                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                    <option value="transferencia">Transferencia Bancaria</option>
                  </select>
                </div>

                {formData.metodoPago === 'tarjeta' && (
                  <>
                    <div className="mb-3">
                      <Input
                        label="Número de Tarjeta"
                        name="numeroTarjeta"
                        value={formData.numeroTarjeta}
                        onChange={handleInputChange}
                        error={errors.numeroTarjeta}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <Input
                          label="Fecha de Vencimiento"
                          name="fechaVencimiento"
                          value={formData.fechaVencimiento}
                          onChange={handleInputChange}
                          error={errors.fechaVencimiento}
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <Input
                          label="CVV"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          error={errors.cvv}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {formData.metodoPago === 'transferencia' && (
                  <div className="alert alert-info">
                    <h6><i className="bi bi-info-circle me-2"></i>Instrucciones para Transferencia Bancaria</h6>
                    <p className="mb-2">Para completar tu compra, realiza una transferencia bancaria a:</p>
                    <ul className="mb-2">
                      <li><strong>Banco:</strong> Banco Nacional</li>
                      <li><strong>Cuenta:</strong> 1234567890</li>
                      <li><strong>RUT:</strong> 12.345.678-9</li>
                      <li><strong>Monto:</strong> ${total.toLocaleString()}</li>
                    </ul>
                    <p className="mb-0"><small>Una vez realizada la transferencia, recibirás un email de confirmación.</small></p>
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex gap-2">
              <Button
                label={isProcessing ? "Procesando..." : "Confirmar Compra"}
                type="submit"
                variant="success"
                disabled={isProcessing}
              />
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/productos')}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* Resumen del Pedido */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5><i className="bi bi-cart me-2"></i>Resumen del Pedido</h5>
            </div>
            <div className="card-body">
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h6 className="mb-0">{item.nombre}</h6>
                    <small className="text-muted">Cantidad: {item.cantidad}</small>
                    {item.descuento > 0 && (
                      <div>
                        <small className="text-success">-{item.descuento}% descuento</small>
                      </div>
                    )}
                  </div>
                  <div className="text-end">
                    <div>${(item.precio * item.cantidad).toLocaleString()}</div>
                    {item.descuento > 0 && (
                      <small className="text-success">
                        -${(item.precio * item.cantidad * item.descuento / 100).toLocaleString()}
                      </small>
                    )}
                  </div>
                </div>
              ))}
              
              <hr />
              
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              
              {descuento > 0 && (
                <div className="d-flex justify-content-between text-success">
                  <span>Descuento:</span>
                  <span>-${descuento.toLocaleString()}</span>
                </div>
              )}
              
              <div className="d-flex justify-content-between">
                <span>Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between h5">
                <span>Total:</span>
                <span className="text-primary">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
