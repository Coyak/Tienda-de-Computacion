import Navbar from '../organisms/Navbar.jsx'

export default function Layout({ children }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="container-fluid flex-grow-1 py-4">
        {children}
      </main>
      <footer 
        className="text-center p-4 mt-auto"
        style={{ 
          backgroundColor: 'rgba(44, 44, 84, 0.95)', 
          borderTop: '1px solid rgba(77, 171, 247, 0.3)',
          color: '#e9ecef'
        }}
      >
        <small style={{ color: '#adb5bd' }}>© 2025 Tienda de Computación</small>
      </footer>
    </div>
  )
}