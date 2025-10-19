// Importar las imágenes
import laptopImg from '../assets/products/laptop-lenovo.jpg'
import mouseImg from '../assets/products/mouse-logitech.jpg'
import monitorImg from '../assets/products/monitor-samsung.jpg'
import tecladoImg from '../assets/products/teclado-mecanico.jpg'
import auricularesImg from '../assets/products/auriculares-gaming.jpg'

// Función para obtener la URL de la imagen
const getImageUrl = (imageImport) => {
  // Si es un string, devolverlo tal como está
  if (typeof imageImport === 'string') {
    return imageImport
  }
  // Si es un objeto de importación, extraer la URL
  if (imageImport && imageImport.default) {
    return imageImport.default
  }
  // Si es un objeto con src, usar src
  if (imageImport && imageImport.src) {
    return imageImport.src
  }
  // Fallback
  return imageImport
}

// Datos iniciales
const productosIniciales = [
  { id: 1, nombre: "Laptop Lenovo", precio: 599000, stock: 10, categoria: "Notebooks", imagen: getImageUrl(laptopImg), descuento: 0 },
  { id: 2, nombre: "Mouse Logitech", precio: 19990, stock: 30, categoria: "Periféricos", imagen: getImageUrl(mouseImg), descuento: 0 },
  { id: 3, nombre: "Monitor Samsung", precio: 139990, stock: 12, categoria: "Monitores", imagen: getImageUrl(monitorImg), descuento: 0 },
  { id: 4, nombre: "Teclado Mecánico", precio: 89990, stock: 15, categoria: "Periféricos", imagen: getImageUrl(tecladoImg), descuento: 10 },
  { id: 5, nombre: "Auriculares Gaming", precio: 129990, stock: 8, categoria: "Audio", imagen: getImageUrl(auricularesImg), descuento: 15 },
]

const usuariosIniciales = [
  { id: 1, nombre: "Admin User", email: "admin@tienda.com", password: "admin123", role: "admin" },
  { id: 2, nombre: "Usuario Demo", email: "usuario@demo.com", password: "demo123", role: "user" }
]

// Claves para localStorage
const STORAGE_KEY_PRODUCTOS = 'tienda_productos'
const STORAGE_KEY_USUARIOS = 'tienda_usuarios'

// Función para obtener productos desde localStorage o inicializar
const getProductosFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY_PRODUCTOS)
  if (stored) {
    return JSON.parse(stored)
  }
  // Si no hay datos, inicializar con datos por defecto
  localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(productosIniciales))
  return productosIniciales
}

// Función para guardar productos en localStorage
const saveProductosToStorage = (productos) => {
  localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(productos))
}

// Función para obtener usuarios desde localStorage o inicializar
const getUsuariosFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY_USUARIOS)
  if (stored) {
    return JSON.parse(stored)
  }
  // Si no hay datos, inicializar con datos por defecto
  localStorage.setItem(STORAGE_KEY_USUARIOS, JSON.stringify(usuariosIniciales))
  return usuariosIniciales
}

// Función para guardar usuarios en localStorage
const saveUsuariosToStorage = (usuarios) => {
  localStorage.setItem(STORAGE_KEY_USUARIOS, JSON.stringify(usuarios))
}

// Obtener siguiente ID disponible
const getNextId = (items) => {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1
}

// CRUD Operations
export const getAllProductos = () => {
  return getProductosFromStorage()
}

export const getProductoById = (id) => {
  const productos = getProductosFromStorage()
  return productos.find(p => p.id === parseInt(id))
}

export const getProductosByCategoria = (categoria) => {
  const productos = getProductosFromStorage()
  return productos.filter(p => p.categoria === categoria)
}

export const getProductosEnOferta = () => {
  const productos = getProductosFromStorage()
  return productos.filter(p => p.descuento > 0)
}

export const getCategorias = () => {
  const productos = getProductosFromStorage()
  return [...new Set(productos.map(p => p.categoria))]
}

export const addProducto = (nuevoProducto) => {
  const productos = getProductosFromStorage()
  const producto = {
    id: getNextId(productos),
    ...nuevoProducto,
    descuento: nuevoProducto.descuento || 0
  }
  productos.push(producto)
  saveProductosToStorage(productos)
  return producto
}

export const updateProducto = (id, datosActualizados) => {
  const productos = getProductosFromStorage()
  const index = productos.findIndex(p => p.id === parseInt(id))
  if (index !== -1) {
    productos[index] = { ...productos[index], ...datosActualizados }
    saveProductosToStorage(productos)
    return productos[index]
  }
  return null
}

export const deleteProducto = (id) => {
  const productos = getProductosFromStorage()
  const index = productos.findIndex(p => p.id === parseInt(id))
  if (index !== -1) {
    const productoEliminado = productos.splice(index, 1)[0]
    saveProductosToStorage(productos)
    return productoEliminado
  }
  return null
}

// Función para resetear datos (útil para testing)
export const resetProductos = () => {
  localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(productosIniciales))
  return productosIniciales
}

// CRUD Operations - Usuarios
export const getAllUsuarios = () => {
  return getUsuariosFromStorage()
}

export const getUsuarioByEmail = (email) => {
  const usuarios = getUsuariosFromStorage()
  return usuarios.find(u => u.email === email)
}

export const getUsuarioById = (id) => {
  const usuarios = getUsuariosFromStorage()
  return usuarios.find(u => u.id === parseInt(id))
}

export const addUsuario = (nuevoUsuario) => {
  const usuarios = getUsuariosFromStorage()
  
  // Verificar que el email no exista
  if (getUsuarioByEmail(nuevoUsuario.email)) {
    return { success: false, error: 'El email ya está registrado' }
  }
  
  const usuario = {
    id: getNextId(usuarios),
    ...nuevoUsuario,
    role: nuevoUsuario.role || 'user'
  }
  
  usuarios.push(usuario)
  saveUsuariosToStorage(usuarios)
  return { success: true, usuario }
}

export const updateUsuario = (id, datosActualizados) => {
  const usuarios = getUsuariosFromStorage()
  const index = usuarios.findIndex(u => u.id === parseInt(id))
  
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...datosActualizados }
    saveUsuariosToStorage(usuarios)
    return { success: true, usuario: usuarios[index] }
  }
  
  return { success: false, error: 'Usuario no encontrado' }
}

export const deleteUsuario = (id) => {
  const usuarios = getUsuariosFromStorage()
  const index = usuarios.findIndex(u => u.id === parseInt(id))
  
  if (index !== -1) {
    const usuarioEliminado = usuarios.splice(index, 1)[0]
    saveUsuariosToStorage(usuarios)
    return { success: true, usuario: usuarioEliminado }
  }
  
  return { success: false, error: 'Usuario no encontrado' }
}

// Función para resetear usuarios (útil para testing)
export const resetUsuarios = () => {
  localStorage.setItem(STORAGE_KEY_USUARIOS, JSON.stringify(usuariosIniciales))
  return usuariosIniciales
}