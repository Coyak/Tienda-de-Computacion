import Navbar from '../organisms/Navbar.jsx'

export default function Layout({ children }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="container-fluid flex-grow-1 py-4">
        {children}
      </main>
      <footer className="text-center p-4 bg-light mt-auto">
        <small>© 2025 Tienda de Computación</small>
      </footer>
    </div>
  )
}