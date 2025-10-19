// Funciones de validación reutilizables para la aplicación

export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { valid: false, error: 'El email es requerido' }
  }
  
  const regex = /\S+@\S+\.\S+/
  if (!regex.test(email)) {
    return { valid: false, error: 'Email inválido' }
  }
  
  return { valid: true }
}

export const validateRequired = (value, fieldName = 'Campo') => {
  if (!value || value.toString().trim() === '') {
    return { valid: false, error: `${fieldName} es requerido` }
  }
  return { valid: true }
}

export const validateMinLength = (value, min, fieldName = 'Campo') => {
  if (!value || value.toString().trim().length < min) {
    return { valid: false, error: `${fieldName} debe tener al menos ${min} caracteres` }
  }
  return { valid: true }
}

export const validateNumber = (value, fieldName = 'Campo') => {
  if (value === '' || value === null || value === undefined) {
    return { valid: false, error: `${fieldName} es requerido` }
  }
  
  const num = parseFloat(value)
  if (isNaN(num)) {
    return { valid: false, error: `${fieldName} debe ser un número válido` }
  }
  
  return { valid: true }
}

export const validatePrice = (price) => {
  const numberValidation = validateNumber(price, 'Precio')
  if (!numberValidation.valid) {
    return numberValidation
  }
  
  const num = parseFloat(price)
  if (num <= 0) {
    return { valid: false, error: 'El precio debe ser mayor a 0' }
  }
  
  return { valid: true }
}

export const validateStock = (stock) => {
  const numberValidation = validateNumber(stock, 'Stock')
  if (!numberValidation.valid) {
    return numberValidation
  }
  
  const num = parseInt(stock)
  if (num < 0) {
    return { valid: false, error: 'El stock no puede ser negativo' }
  }
  
  return { valid: true }
}

export const validatePassword = (password) => {
  const requiredValidation = validateRequired(password, 'Contraseña')
  if (!requiredValidation.valid) {
    return requiredValidation
  }
  
  const minLengthValidation = validateMinLength(password, 6, 'Contraseña')
  if (!minLengthValidation.valid) {
    return minLengthValidation
  }
  
  return { valid: true }
}

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { valid: false, error: 'Las contraseñas no coinciden' }
  }
  return { valid: true }
}

export const validatePhone = (phone) => {
  const requiredValidation = validateRequired(phone, 'Teléfono')
  if (!requiredValidation.valid) {
    return requiredValidation
  }
  
  // Validar que contenga solo números y tenga al menos 8 dígitos
  const phoneRegex = /^\d{8,}$/
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return { valid: false, error: 'Teléfono inválido (mínimo 8 dígitos)' }
  }
  
  return { valid: true }
}

export const validatePostalCode = (postalCode) => {
  const requiredValidation = validateRequired(postalCode, 'Código postal')
  if (!requiredValidation.valid) {
    return requiredValidation
  }
  
  // Validar que contenga solo números y tenga entre 4-6 dígitos
  const postalRegex = /^\d{4,6}$/
  if (!postalRegex.test(postalCode.replace(/\s/g, ''))) {
    return { valid: false, error: 'Código postal inválido (4-6 dígitos)' }
  }
  
  return { valid: true }
}

// Función helper para validar múltiples campos
export const validateForm = (fields, validators) => {
  const errors = {}
  let isValid = true
  
  for (const [fieldName, value] of Object.entries(fields)) {
    if (validators[fieldName]) {
      const validation = validators[fieldName](value)
      if (!validation.valid) {
        errors[fieldName] = validation.error
        isValid = false
      }
    }
  }
  
  return { valid: isValid, errors }
}