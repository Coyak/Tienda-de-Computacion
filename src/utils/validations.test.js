import { 
  validateEmail, 
  validateRequired, 
  validateMinLength, 
  validateNumber,
  validatePrice,
  validateStock,
  validatePassword,
  validatePasswordMatch,
  validatePhone,
  validatePostalCode
} from './validations.js'

describe('Validation Functions', () => {
  describe('validateEmail', () => {
    test('returns valid for correct email format', () => {
      const result = validateEmail('test@example.com')
      expect(result.valid).toBe(true)
    })

    test('returns invalid for empty email', () => {
      const result = validateEmail('')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('El email es requerido')
    })

    test('returns invalid for incorrect email format', () => {
      const result = validateEmail('invalid-email')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Email inválido')
    })
  })

  describe('validateRequired', () => {
    test('returns valid for non-empty value', () => {
      const result = validateRequired('test value', 'Campo')
      expect(result.valid).toBe(true)
    })

    test('returns invalid for empty value', () => {
      const result = validateRequired('', 'Campo')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Campo es requerido')
    })

    test('returns invalid for whitespace only', () => {
      const result = validateRequired('   ', 'Campo')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Campo es requerido')
    })
  })

  describe('validateMinLength', () => {
    test('returns valid for value with sufficient length', () => {
      const result = validateMinLength('test', 3, 'Campo')
      expect(result.valid).toBe(true)
    })

    test('returns invalid for value with insufficient length', () => {
      const result = validateMinLength('ab', 3, 'Campo')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Campo debe tener al menos 3 caracteres')
    })
  })

  describe('validateNumber', () => {
    test('returns valid for valid number', () => {
      const result = validateNumber('123', 'Campo')
      expect(result.valid).toBe(true)
    })

    test('returns invalid for non-numeric value', () => {
      const result = validateNumber('abc', 'Campo')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Campo debe ser un número válido')
    })

    test('returns invalid for empty value', () => {
      const result = validateNumber('', 'Campo')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Campo es requerido')
    })
  })

  describe('validatePrice', () => {
    test('returns valid for positive price', () => {
      const result = validatePrice('100')
      expect(result.valid).toBe(true)
    })

    test('returns invalid for zero price', () => {
      const result = validatePrice('0')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('El precio debe ser mayor a 0')
    })

    test('returns invalid for negative price', () => {
      const result = validatePrice('-10')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('El precio debe ser mayor a 0')
    })
  })

  describe('validateStock', () => {
    test('returns valid for non-negative stock', () => {
      const result = validateStock('10')
      expect(result.valid).toBe(true)
    })

    test('returns valid for zero stock', () => {
      const result = validateStock('0')
      expect(result.valid).toBe(true)
    })

    test('returns invalid for negative stock', () => {
      const result = validateStock('-5')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('El stock no puede ser negativo')
    })
  })

  describe('validatePassword', () => {
    test('returns valid for password with sufficient length', () => {
      const result = validatePassword('password123')
      expect(result.valid).toBe(true)
    })

    test('returns invalid for short password', () => {
      const result = validatePassword('123')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Contraseña debe tener al menos 6 caracteres')
    })
  })

  describe('validatePasswordMatch', () => {
    test('returns valid for matching passwords', () => {
      const result = validatePasswordMatch('password123', 'password123')
      expect(result.valid).toBe(true)
    })

    test('returns invalid for non-matching passwords', () => {
      const result = validatePasswordMatch('password123', 'password456')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Las contraseñas no coinciden')
    })
  })

  describe('validatePhone', () => {
    test('returns valid for valid phone number', () => {
      const result = validatePhone('12345678')
      expect(result.valid).toBe(true)
    })

    test('returns invalid for short phone number', () => {
      const result = validatePhone('123')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Teléfono inválido (mínimo 8 dígitos)')
    })
  })

  describe('validatePostalCode', () => {
    test('returns valid for valid postal code', () => {
      const result = validatePostalCode('12345')
      expect(result.valid).toBe(true)
    })

    test('returns invalid for short postal code', () => {
      const result = validatePostalCode('123')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Código postal inválido (4-6 dígitos)')
    })
  })
})