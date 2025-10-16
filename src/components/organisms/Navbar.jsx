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
          <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          {user?.role === 'admin' && (
            <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
          )}
        </ul>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className="badge bg-primary">🛒 {getCartCount()}</span>
        {user ? (
          <>
            <span className="text-light small">Hola, {user.role}</span>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>Salir</button>
          </>
        ) : (
          <Link to="/login" className="btn btn-light btn-sm">Login</Link>
        )}
      </div>
    </nav>
  )
}