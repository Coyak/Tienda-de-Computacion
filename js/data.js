// Datos semilla y catálogos
// Categorías
const CATEGORIAS = ["Accesorios", "Electrónica", "Hogar", "Ropa"];

// Productos (id único)
const PRODUCTOS_SEMILLA = [
  { id: "p1", codigo: "A100", nombre: "Audífonos", descripcion: "Inalámbricos", precio: 19990, stock: 15, stockCritico: 3, categoria: "Electrónica", imagen: "img/audifonos.jpg" },
  { id: "p2", codigo: "H200", nombre: "Hervidor", descripcion: "1.7L acero", precio: 24990, stock: 8, categoria: "Hogar", imagen: "img/hervidor.jpg" },
  { id: "p3", codigo: "R300", nombre: "Polera básica", descripcion: "Algodón", precio: 9990, stock: 30, categoria: "Ropa", imagen: "img/polera.jpg" },
  { id: "p4", codigo: "AC10", nombre: "Cable USB-C", descripcion: "1m", precio: 3990, stock: 50, categoria: "Accesorios", imagen: "img/cable.jpg" }
];

// Usuarios (admin simulado)
const USUARIOS_SEMILLA = [
  { id: "u1", run: "19011022K", nombre: "Ana", apellidos: "Pérez Soto", correo: "ana@duoc.cl", tipoUsuario: "Administrador", region: "Los Lagos", comuna: "Puerto Montt", direccion: "Av. X 123" },
  { id: "u2", run: "18222333K", nombre: "Luis", apellidos: "García Mora", correo: "luis@gmail.com", tipoUsuario: "Vendedor", region: "RM", comuna: "Santiago", direccion: "Calle Y 456" }
];

// Regiones/Comunas
const REGIONES = [
  { nombre: "RM", comunas: ["Santiago", "Providencia", "Las Condes"] },
  { nombre: "Los Lagos", comunas: ["Puerto Montt", "Puerto Varas", "Osorno"] }
];

// Dominios permitidos
const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

