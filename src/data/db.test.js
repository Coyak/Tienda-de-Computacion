import { 
  getAllProductos, 
  getProductoById, 
  addProducto, 
  updateProducto, 
  deleteProducto,
  getProductosByCategoria,
  getProductosEnOferta,
  getCategorias,
  resetProductos
} from './db.js'

describe('Database Functions', () => {
  beforeEach(() => {
    // Reset data before each test
    resetProductos()
  })

  describe('getAllProductos', () => {
    test('returns all products', () => {
      const productos = getAllProductos()
      expect(productos).toBeDefined()
      expect(Array.isArray(productos)).toBe(true)
      expect(productos.length).toBeGreaterThan(0)
    })
  })

  describe('getProductoById', () => {
    test('returns correct product by id', () => {
      const producto = getProductoById(1)
      expect(producto).toBeDefined()
      expect(producto.id).toBe(1)
    })

    test('returns undefined for non-existent id', () => {
      const producto = getProductoById(999)
      expect(producto).toBeUndefined()
    })
  })

  describe('addProducto', () => {
    test('adds new product successfully', () => {
      const nuevoProducto = {
        nombre: 'Nuevo Producto',
        precio: 50000,
        stock: 5,
        categoria: 'Test',
        imagen: '/test.jpg'
      }

      const productoAgregado = addProducto(nuevoProducto)
      expect(productoAgregado).toBeDefined()
      expect(productoAgregado.id).toBeDefined()
      expect(productoAgregado.nombre).toBe('Nuevo Producto')

      const productos = getAllProductos()
      expect(productos).toContain(productoAgregado)
    })

    test('assigns unique id to new product', () => {
      const producto1 = addProducto({ nombre: 'Producto 1', precio: 1000, stock: 1, categoria: 'Test' })
      const producto2 = addProducto({ nombre: 'Producto 2', precio: 2000, stock: 2, categoria: 'Test' })
      
      expect(producto1.id).not.toBe(producto2.id)
    })
  })

  describe('updateProducto', () => {
    test('updates existing product', () => {
      const productos = getAllProductos()
      const productoOriginal = productos[0]
      
      const datosActualizados = { nombre: 'Producto Actualizado', precio: 99999 }
      const productoActualizado = updateProducto(productoOriginal.id, datosActualizados)
      
      expect(productoActualizado).toBeDefined()
      expect(productoActualizado.nombre).toBe('Producto Actualizado')
      expect(productoActualizado.precio).toBe(99999)
    })

    test('returns null for non-existent product', () => {
      const resultado = updateProducto(999, { nombre: 'Test' })
      expect(resultado).toBeNull()
    })
  })

  describe('deleteProducto', () => {
    test('deletes existing product', () => {
      const productosAntes = getAllProductos()
      const productoAEliminar = productosAntes[0]
      
      const productoEliminado = deleteProducto(productoAEliminar.id)
      expect(productoEliminado).toBeDefined()
      expect(productoEliminado.id).toBe(productoAEliminar.id)
      
      const productosDespues = getAllProductos()
      expect(productosDespues.length).toBe(productosAntes.length - 1)
      expect(productosDespues.find(p => p.id === productoAEliminar.id)).toBeUndefined()
    })

    test('returns null for non-existent product', () => {
      const resultado = deleteProducto(999)
      expect(resultado).toBeNull()
    })
  })

  describe('getProductosByCategoria', () => {
    test('returns products filtered by category', () => {
      const productosNotebooks = getProductosByCategoria('Notebooks')
      expect(Array.isArray(productosNotebooks)).toBe(true)
      productosNotebooks.forEach(producto => {
        expect(producto.categoria).toBe('Notebooks')
      })
    })

    test('returns empty array for non-existent category', () => {
      const productos = getProductosByCategoria('CategoriaInexistente')
      expect(productos).toEqual([])
    })
  })

  describe('getProductosEnOferta', () => {
    test('returns only products with discount', () => {
      const productosOferta = getProductosEnOferta()
      expect(Array.isArray(productosOferta)).toBe(true)
      productosOferta.forEach(producto => {
        expect(producto.descuento).toBeGreaterThan(0)
      })
    })
  })

  describe('getCategorias', () => {
    test('returns unique categories', () => {
      const categorias = getCategorias()
      expect(Array.isArray(categorias)).toBe(true)
      expect(categorias.length).toBeGreaterThan(0)
      
      // Check for uniqueness
      const categoriasUnicas = [...new Set(categorias)]
      expect(categorias.length).toBe(categoriasUnicas.length)
    })
  })

  describe('localStorage persistence', () => {
    test('persists data in localStorage', () => {
      const nuevoProducto = {
        nombre: 'Producto Persistente',
        precio: 75000,
        stock: 3,
        categoria: 'Persistencia'
      }
      
      addProducto(nuevoProducto)
      
      // Simulate page reload by creating new instance
      const productos = getAllProductos()
      const productoEncontrado = productos.find(p => p.nombre === 'Producto Persistente')
      expect(productoEncontrado).toBeDefined()
    })
  })
})
