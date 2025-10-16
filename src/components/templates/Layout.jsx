import Navbar from '../organisms/Navbar.jsx'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        {children}
      </main>
      <footer className="text-center p-4 bg-light mt-4">
        <small>© 2025 Tienda de Computación</small>
      </footer>
    </>
  )
}