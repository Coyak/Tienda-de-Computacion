import { Routes, Route } from 'react-router-dom'
import Layout from './components/templates/Layout.jsx'
import Home from './components/pages/Home.jsx'
import Productos from './components/pages/Productos.jsx'
import Detalle from './components/pages/Detalle.jsx'
import Contacto from './components/pages/Contacto.jsx'
import Login from './components/pages/Login.jsx'
import Registro from './components/pages/Registro.jsx'
import Categorias from './components/pages/Categorias.jsx'
import Carrito from './components/pages/Carrito.jsx'
import Checkout from './components/pages/Checkout.jsx'
import CompraExitosa from './components/pages/CompraExitosa.jsx'
import CompraFallida from './components/pages/CompraFallida.jsx'
import AdminDashboard from './components/pages/Admin/Dashboard.jsx'
import PrivateRoute from './components/templates/PrivateRoute.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-fallida" element={<CompraFallida />} />
        
        {/* Ruta protegida */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Layout>
  )
}
