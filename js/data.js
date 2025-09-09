// Datos semilla y catálogos
// Categorías
const CATEGORIAS = ["Componentes", "Periféricos", "Almacenamiento", "Computadores"];

// Productos (id único)
const PRODUCTOS_SEMILLA = [
  { id: "p1", codigo: "CPU01", nombre: "Procesador Ryzen 5", descripcion: "6 núcleos 3.9GHz", precio: 199990, stock: 10, categoria: "Componentes", imagen: "img/placeholder.png" },
  { id: "p2", codigo: "SSD02", nombre: "SSD 1TB", descripcion: "NVMe", precio: 109990, stock: 15, categoria: "Almacenamiento", imagen: "img/placeholder.png" },
  { id: "p3", codigo: "NB03", nombre: "Notebook Lenovo", descripcion: "14\" 8GB RAM", precio: 449990, stock: 7, categoria: "Computadores", imagen: "img/placeholder.png" },
  { id: "p4", codigo: "MS04", nombre: "Mouse Gamer", descripcion: "RGB 16000 DPI", precio: 29990, stock: 25, categoria: "Periféricos", imagen: "img/placeholder.png" }
];

// Usuarios (admin simulado)
const USUARIOS_SEMILLA = [
  {
    id: "u1",
    run: "19011022K",
    nombre: "Ana",
    apellidos: "Pérez Soto",
    correo: "admin@tienda.com",
    password: "admin123",
    tipoUsuario: "Administrador",
    region: "Los Lagos",
    comuna: "Puerto Montt",
    direccion: "Av. X 123"
  },
  {
    id: "u2",
    run: "18222333K",
    nombre: "Luis",
    apellidos: "García Mora",
    correo: "luis@gmail.com",
    password: "vend123",
    tipoUsuario: "Vendedor",
    region: "RM",
    comuna: "Santiago",
    direccion: "Calle Y 456"
  }
];

// Regiones/Comunas
const REGIONES = [
  { nombre: "RM", comunas: ["Santiago", "Providencia", "Las Condes"] },
  { nombre: "Los Lagos", comunas: ["Puerto Montt", "Puerto Varas", "Osorno"] }
];

// Dominios permitidos
const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

