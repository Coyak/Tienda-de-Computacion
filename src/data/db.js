export const productos = [
  { id: 1, nombre: "Laptop Lenovo", precio: 599000, stock: 10, categoria: "Notebooks", imagen: "/img/laptop.jpg" },
  { id: 2, nombre: "Mouse Logitech", precio: 19990, stock: 30, categoria: "Periféricos", imagen: "/img/mouse.jpg" },
  { id: 3, nombre: "Monitor Samsung", precio: 139990, stock: 12, categoria: "Monitores", imagen: "/img/monitor.jpg" },
]

export const getAllProductos = () => productos
export const getProductoById = (id) => productos.find(p => p.id === parseInt(id))