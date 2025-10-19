import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext.jsx'
import { AuthContext } from '../../context/AuthContext.jsx'

export default function Navbar() {
  const { getCartCount } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">TiendaPC</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/categorias">Categorías</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          {user?.role === 'admin' && (
            <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
          )}
        </ul>
      </div>

      <div className="d-flex align-items-center gap-3">
        <Link to="/carrito" className="badge bg-primary text-decoration-none" style={{ fontSize: '1rem', padding: '0.5rem 0.75rem' }}>
          🛒 {getCartCount()}
        </Link>
        {user ? (
          <>
            <span className="text-light small">Hola, {user.nombre || user.role}</span>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/registro" className="btn btn-outline-light btn-sm me-2">Registrarse</Link>
            <Link to="/login" className="btn btn-light btn-sm">Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}