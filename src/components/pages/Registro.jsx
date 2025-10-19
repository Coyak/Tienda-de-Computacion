import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.jsx'
import Input from '../atoms/Input.jsx'
import Button from '../atoms/Button.jsx'
import { 
  validateRequired, 
  validateEmail, 
  validateMinLength, 
  validatePassword,
  validatePasswordMatch 
} from '../../utils/validations.js'

export default function Registro() {
  const { register } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    // Validar nombre
    const nombreValidation = validateRequired(formData.nombre, 'Nombre')
    if (!nombreValidation.valid) {
      newErrors.nombre = nombreValidation.error
    } else {
      const minLengthValidation = validateMinLength(formData.nombre, 3, 'Nombre')
      if (!minLengthValidation.valid) {
        newErrors.nombre = minLengthValidation.error
      }
    }

    // Validar email
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.error
    }

    // Validar contraseña
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.error
    }

    // Validar confirmación de contraseña
    const confirmPasswordValidation = validatePasswordMatch(formData.password, formData.confirmPassword)
    if (!confirmPasswordValidation.valid) {
      newErrors.confirmPassword = confirmPasswordValidation.error
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = register({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        role: 'user'
      })

      if (result.success) {
        alert('¡Registro exitoso! Ya puedes iniciar sesión.')
      } else {
        setErrors({ general: result.error })
      }
    } catch (error) {
      setErrors({ general: 'Error inesperado. Por favor, inténtalo nuevamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border p-4 shadow rounded" style={{ width: 400 }}>
        <h3 className="mb-3 text-center">Crear Cuenta</h3>
        
        {errors.general && (
          <div className="alert alert-danger" role="alert">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre Completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            error={errors.nombre}
            required
            placeholder="Ingresa tu nombre completo"
          />

          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            placeholder="tu@email.com"
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            placeholder="Mínimo 6 caracteres"
          />

          <Input
            label="Confirmar Contraseña"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
            placeholder="Repite tu contraseña"
          />

          <Button
            label={isSubmitting ? "Registrando..." : "Crear Cuenta"}
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          />
        </form>

        <div className="text-center mt-3">
          <p className="text-muted small">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-decoration-none">
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        <div className="text-center mt-2">
          <Link to="/" className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-arrow-left me-1"></i>
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}