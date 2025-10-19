import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext.jsx'
import { AuthContext } from '../../context/AuthContext.jsx'

export default function Navbar() {
  const { getCartCount } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)

  return (
    <nav 
      className="navbar navbar-expand-lg px-4 py-3" 
      style={{ 
        backgroundColor: 'rgba(44, 44, 84, 0.95)', 
        borderBottom: '1px solid rgba(77, 171, 247, 0.3)',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Link 
        className="navbar-brand fw-bold" 
        to="/"
        style={{ 
          color: '#4dabf7', 
          fontSize: '1.8rem',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <i className="bi bi-laptop" style={{ fontSize: '2rem' }}></i>
        TiendaPC
      </Link>
      
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        style={{ borderColor: 'rgba(77, 171, 247, 0.5)' }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link 
              className="nav-link d-flex align-items-center gap-2" 
              to="/productos"
              style={{ color: '#e9ecef', fontWeight: '500' }}
            >
              <i className="bi bi-box-seam"></i>
              Productos
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className="nav-link d-flex align-items-center gap-2" 
              to="/categorias"
              style={{ color: '#e9ecef', fontWeight: '500' }}
            >
              <i className="bi bi-tags"></i>
              Categorías
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className="nav-link d-flex align-items-center gap-2" 
              to="/contacto"
              style={{ color: '#e9ecef', fontWeight: '500' }}
            >
              <i className="bi bi-envelope"></i>
              Contacto
            </Link>
          </li>
          {user?.role === 'admin' && (
            <li className="nav-item">
              <Link 
                className="nav-link d-flex align-items-center gap-2" 
                to="/admin"
                style={{ color: '#4dabf7', fontWeight: '600' }}
              >
                <i className="bi bi-gear-fill"></i>
                Admin
              </Link>
            </li>
          )}
        </ul>

        <div className="d-flex align-items-center gap-3">
          <Link 
            to="/carrito" 
            className="btn btn-outline-primary position-relative d-flex align-items-center gap-2"
            style={{ 
              borderRadius: '25px',
              padding: '0.5rem 1rem',
              borderColor: '#4dabf7',
              color: '#4dabf7',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4dabf7'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#4dabf7'
            }}
          >
            <i className="bi bi-cart3"></i>
            <span>Carrito</span>
            {getCartCount() > 0 && (
              <span 
                className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill"
                style={{ fontSize: '0.7rem' }}
              >
                {getCartCount()}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-person-circle" style={{ color: '#4dabf7', fontSize: '1.5rem' }}></i>
                <span style={{ color: '#e9ecef', fontWeight: '500' }}>
                  Hola, {user.nombre || user.role}
                </span>
              </div>
              <button 
                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
                onClick={logout}
                style={{ borderRadius: '20px' }}
              >
                <i className="bi bi-box-arrow-right"></i>
                Salir
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Link 
                to="/registro" 
                className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
                style={{ borderRadius: '20px' }}
              >
                <i className="bi bi-person-plus"></i>
                Registrarse
              </Link>
              <Link 
                to="/login" 
                className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                style={{ borderRadius: '20px', backgroundColor: '#4dabf7', borderColor: '#4dabf7' }}
              >
                <i className="bi bi-box-arrow-in-right"></i>
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}