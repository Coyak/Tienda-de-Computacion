<!-- a646e05c-3ab8-473d-9464-148208a1733d e884c8b9-6765-4ea4-8b01-0f3dfcdcd51b -->
# Plan: Corregir Carrito, Login y Navegación

## Problemas a resolver

Basado en las imágenes de diseño proporcionadas (Figuras 1-9) y los requerimientos del usuario:

1. Carrito no funciona - falta página/vista de carrito
2. Agregar al carrito no funciona desde Categorías
3. Login redirige incorrectamente
4. Categorías muestra estadísticas innecesarias
5. Página de Ofertas debe eliminarse pero mantener descuentos

## Cambios a implementar

### 1. Crear página de Carrito (`src/components/pages/Carrito.jsx`)

Nueva página que muestre:

- Lista de productos en el carrito con imagen, nombre, precio, cantidad
- Controles para aumentar/disminuir cantidad
- Botón para eliminar productos
- Total del carrito
- Botón "Continuar al pago" que redirija a `/checkout`

Referencia: Figura 5 y 6 del diseño

### 2. Actualizar Navbar para que el carrito sea clickeable

`src/components/organisms/Navbar.jsx`:

- Cambiar el badge del carrito de `<span>` a `<Link to="/carrito">`
- Hacer que sea clickeable para ir a la página del carrito
- Mantener el contador visible

### 3. Corregir conexión del carrito en Categorías

`src/components/pages/Categorias.jsx` líneas 90-95:

```jsx
// ANTES (línea 91-94)
onAddToCart={() => {
  console.log('Agregar al carrito:', producto)
}}

// DESPUÉS
onAdd={addToCart}
```

Agregar import y useContext:

```jsx
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext.jsx'

// Dentro del componente
const { addToCart } = useContext(CartContext)
```

### 4. Eliminar estadísticas de Categorías

`src/components/pages/Categorias.jsx` líneas 124-164:

- Eliminar completamente el bloque `{/* Estadísticas de Categorías */}`
- Mantener solo la lista de productos filtrados

### 5. Corregir redirección del login

`src/context/AuthContext.jsx` línea 28:

```jsx
// ANTES
navigate('/admin')

// DESPUÉS
if (userData.role === 'admin') {
  navigate('/admin')
} else {
  navigate('/')
}
```

### 6. Eliminar página de Ofertas pero mantener descuentos

- `src/App.jsx`: Eliminar import y ruta de Ofertas (líneas 10, 28)
- `src/components/organisms/Navbar.jsx`: Eliminar link "Ofertas" del menú (línea 17)
- `src/components/pages/Ofertas.jsx`: CONSERVAR el archivo (no eliminarlo) por si se necesita en el futuro
- Los descuentos seguirán mostrándose en ProductCard en todas las vistas

### 7. Agregar ruta del carrito

`src/App.jsx`:

```jsx
import Carrito from './components/pages/Carrito.jsx'

// En Routes
<Route path="/carrito" element={<Carrito />} />
```

### 8. Actualizar Checkout para redirección correcta

`src/components/pages/Checkout.jsx`:

- Verificar que al hacer click en "Pagar" redirija a `/compra-exitosa` (90% probabilidad) o `/compra-fallida` (10% probabilidad)
- Asegurar que se use `clearCart()` tras compra exitosa

## Archivos a modificar

1. **CREAR**: `src/components/pages/Carrito.jsx`
2. **MODIFICAR**: `src/components/organisms/Navbar.jsx`
3. **MODIFICAR**: `src/components/pages/Categorias.jsx`
4. **MODIFICAR**: `src/context/AuthContext.jsx`
5. **MODIFICAR**: `src/App.jsx`
6. **CONSERVAR** (no eliminar): `src/components/pages/Ofertas.jsx`

## Resultado esperado

- Usuario puede ver y gestionar su carrito en `/carrito`
- Hacer click en el badge del carrito navega a la página del carrito
- Agregar productos funciona desde todas las vistas (Home, Productos, Categorías)
- Login redirige a `/admin` si es admin, o a `/` si es usuario normal
- Categorías muestra solo productos filtrados sin estadísticas
- No hay link de "Ofertas" en el navbar pero los descuentos siguen funcionando
- Checkout redirige a `/checkout` y luego a compra exitosa/fallida

### To-dos

- [ ] Crear utils/validations.js con funciones de validación reutilizables
- [ ] Refactorizar CartContext agregando clearCart, getCartTotal, updateQuantity
- [ ] Extender db.js con CRUD de usuarios
- [ ] Actualizar AuthContext con registro y validación contra db.js
- [ ] Mejorar ProductCard mostrando categoría, stock y descuentos
- [ ] Crear página Registro.jsx con formulario y validaciones
- [ ] Actualizar App.jsx y Navbar con ruta /registro
- [ ] Refactorizar Checkout usando validations.js
- [ ] Refactorizar ProductosAdmin usando validations.js
- [ ] Crear pruebas para validations.js y Registro.jsx
- [ ] Crear documento ERS V2 completo
- [ ] Actualizar README.md y COBERTURA_TESTING.md