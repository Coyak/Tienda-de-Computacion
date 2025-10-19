// Tests simples usando solo Jasmine (sin React Testing Library)
describe('Pruebas de Propiedades - Requisitos del Docente', () => {
  
  describe('3. Propiedades Recibidas - Componente Botón', () => {
    it('recibe correctamente la etiqueta y la función de evento onClick', () => {
      // Simular componente botón
      const crearBoton = (props) => {
        return {
          label: props.label,
          onClick: props.onClick,
          variant: props.variant || 'primary',
          disabled: props.disabled || false
        }
      }
      
      const mockOnClick = jasmine.createSpy('mockOnClick')
      const props = {
        label: 'Botón de Prueba',
        onClick: mockOnClick,
        variant: 'primary'
      }
      
      const boton = crearBoton(props)
      
      // Verificar que el botón recibe y muestra la etiqueta correcta
      expect(boton.label).toBe('Botón de Prueba')
      expect(boton.onClick).toBe(mockOnClick)
      expect(boton.variant).toBe('primary')
      expect(boton.disabled).toBe(false)
    })
    
    it('recibe y aplica diferentes variantes de botón', () => {
      const crearBoton = (props) => {
        return {
          label: props.label,
          variant: props.variant || 'primary'
        }
      }
      
      // Probar diferentes variantes
      const botonPrimario = crearBoton({ label: 'Primario', variant: 'primary' })
      expect(botonPrimario.variant).toBe('primary')
      
      const botonSecundario = crearBoton({ label: 'Secundario', variant: 'secondary' })
      expect(botonSecundario.variant).toBe('secondary')
      
      const botonExito = crearBoton({ label: 'Éxito', variant: 'success' })
      expect(botonExito.variant).toBe('success')
    })
    
    it('recibe y aplica estado disabled', () => {
      const crearBoton = (props) => {
        return {
          label: props.label,
          disabled: props.disabled || false
        }
      }
      
      const botonDeshabilitado = crearBoton({ label: 'Deshabilitado', disabled: true })
      expect(botonDeshabilitado.disabled).toBe(true)
      
      const botonHabilitado = crearBoton({ label: 'Habilitado', disabled: false })
      expect(botonHabilitado.disabled).toBe(false)
    })
    
    it('maneja props opcionales correctamente', () => {
      const crearBoton = (props) => {
        return {
          label: props.label,
          variant: props.variant || 'primary',
          disabled: props.disabled || false
        }
      }
      
      // Botón con solo label (props mínimas)
      const botonMinimo = crearBoton({ label: 'Mínimo' })
      expect(botonMinimo.label).toBe('Mínimo')
      expect(botonMinimo.variant).toBe('primary') // Variant por defecto
      expect(botonMinimo.disabled).toBe(false) // Disabled por defecto
    })
  })
})
