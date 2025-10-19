import { render, screen, fireEvent } from '@testing-library/react'
import { AuthProvider } from './AuthContext.jsx'

// Mock component to test AuthContext
const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useContext(AuthContext)
  
  return (
    <div>
      <div data-testid="user-info">
        {user ? `${user.email} (${user.role})` : 'No user'}
      </div>
      <div data-testid="auth-status">
        {isAuthenticated() ? 'Authenticated' : 'Not authenticated'}
      </div>
      <button onClick={() => login('admin@tienda.com', 'admin123')}>
        Login Admin
      </button>
      <button onClick={() => login('user@test.com', 'wrongpassword')}>
        Login Wrong Password
      </button>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  test('provides initial unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('user-info')).toHaveTextContent('No user')
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated')
  })

  test('successfully logs in with correct credentials', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    const loginButton = screen.getByText('Login Admin')
    fireEvent.click(loginButton)
    
    expect(screen.getByTestId('user-info')).toHaveTextContent('admin@tienda.com (admin)')
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated')
  })

  test('fails to login with incorrect credentials', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    const loginButton = screen.getByText('Login Wrong Password')
    fireEvent.click(loginButton)
    
    expect(screen.getByTestId('user-info')).toHaveTextContent('No user')
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated')
  })

  test('successfully logs out', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    // First login
    const loginButton = screen.getByText('Login Admin')
    fireEvent.click(loginButton)
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated')
    
    // Then logout
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)
    
    expect(screen.getByTestId('user-info')).toHaveTextContent('No user')
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated')
  })

  test('persists authentication state in localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    const loginButton = screen.getByText('Login Admin')
    fireEvent.click(loginButton)
    
    // Check that user data is in localStorage
    const userData = localStorage.getItem('tienda_user')
    expect(userData).toBeDefined()
    
    const parsedUser = JSON.parse(userData)
    expect(parsedUser.email).toBe('admin@tienda.com')
    expect(parsedUser.role).toBe('admin')
  })

  test('restores authentication state from localStorage on mount', () => {
    // Set up localStorage before rendering
    const userData = {
      email: 'admin@tienda.com',
      role: 'admin',
      nombre: 'Admin User'
    }
    localStorage.setItem('tienda_user', JSON.stringify(userData))
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('user-info')).toHaveTextContent('admin@tienda.com (admin)')
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated')
  })
})
