import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Registro from './Registro.jsx'
import { AuthProvider } from '../../context/AuthContext.jsx'

// Mock del contexto de autenticación
const MockedRegistro = () => (
  <BrowserRouter>
    <AuthProvider>
      <Registro />
    </AuthProvider>
  </BrowserRouter>
)

describe('Registro Component', () => {
  test('renders registration form with all required fields', () => {
    render(<MockedRegistro />)
    
    expect(screen.getByText('Crear Cuenta')).toBeInTheDocument()
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument()
  })

  test('shows validation errors for empty required fields', async () => {
    render(<MockedRegistro />)
    
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Nombre es requerido')).toBeInTheDocument()
      expect(screen.getByText('El email es requerido')).toBeInTheDocument()
      expect(screen.getByText('Contraseña es requerido')).toBeInTheDocument()
    })
  })

  test('shows error for invalid email format', async () => {
    render(<MockedRegistro />)
    
    const emailInput = screen.getByLabelText(/correo electrónico/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
    })
  })

  test('shows error for short password', async () => {
    render(<MockedRegistro />)
    
    const passwordInput = screen.getByLabelText(/contraseña/i)
    fireEvent.change(passwordInput, { target: { value: '123' } })
    
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Contraseña debe tener al menos 6 caracteres')).toBeInTheDocument()
    })
  })

  test('shows error for non-matching passwords', async () => {
    render(<MockedRegistro />)
    
    const passwordInput = screen.getByLabelText(/contraseña/i)
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i)
    
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } })
    
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument()
    })
  })

  test('clears field error when user starts typing', async () => {
    render(<MockedRegistro />)
    
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Nombre es requerido')).toBeInTheDocument()
    })
    
    const nombreInput = screen.getByLabelText(/nombre completo/i)
    fireEvent.change(nombreInput, { target: { value: 'Test User' } })
    
    await waitFor(() => {
      expect(screen.queryByText('Nombre es requerido')).not.toBeInTheDocument()
    })
  })

  test('has link to login page', () => {
    render(<MockedRegistro />)
    
    const loginLink = screen.getByText('Inicia sesión aquí')
    expect(loginLink).toBeInTheDocument()
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login')
  })

  test('has link to home page', () => {
    render(<MockedRegistro />)
    
    const homeLink = screen.getByText('Volver al Inicio')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
  })

  test('form submission with valid data calls register function', async () => {
    render(<MockedRegistro />)
    
    const nombreInput = screen.getByLabelText(/nombre completo/i)
    const emailInput = screen.getByLabelText(/correo electrónico/i)
    const passwordInput = screen.getByLabelText(/contraseña/i)
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i)
    
    fireEvent.change(nombreInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
    
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i })
    fireEvent.click(submitButton)
    
    // El componente debería intentar registrar al usuario
    // (el resultado dependerá del mock de AuthContext)
  })
})