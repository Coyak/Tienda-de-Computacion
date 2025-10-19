# Especificación de Requerimientos del Sistema (ERS) V2
## Tienda de Computación - Frontend React

---

**Versión**: 2.0  
**Fecha**: Octubre 2024  
**Proyecto**: Evaluación Parcial 2 - DSY1104  
**Desarrollador**: [Nombre del Estudiante]  

---

## 1. Introducción y Alcance del Sistema

### 1.1 Propósito
Este documento describe los requerimientos funcionales y no funcionales del sistema de tienda de computación desarrollado con React, Bootstrap y funcionalidades de e-commerce completas.

### 1.2 Alcance del Sistema
El sistema incluye:
- Catálogo de productos con filtrado y búsqueda
- Sistema de autenticación y registro de usuarios
- Carrito de compras con persistencia
- Proceso de checkout completo
- Panel de administración para gestión de productos
- Sistema de ofertas y descuentos
- Diseño responsivo para múltiples dispositivos

### 1.3 Tecnologías Utilizadas
- **Frontend**: React 19.1.1, React Router DOM 7.9.4
- **Estilos**: Bootstrap 5.3.8
- **Persistencia**: localStorage
- **Testing**: Jasmine + Karma
- **Build**: Vite

---

## 2. Requerimientos Funcionales

### 2.1 Gestión de Productos

#### RF01 - Visualización de Productos
**Descripción**: El sistema debe permitir visualizar todos los productos disponibles en el catálogo.

**Criterios de Aceptación**:
- Mostrar lista completa de productos en página principal
- Mostrar información básica: nombre, precio, imagen, categoría
- Implementar paginación o scroll infinito para grandes catálogos

**Componentes**: `Home.jsx`, `Productos.jsx`, `ProductGrid.jsx`, `ProductCard.jsx`

#### RF02 - Detalle de Producto
**Descripción**: El sistema debe mostrar información detallada de un producto específico.

**Criterios de Aceptación**:
- Mostrar información completa del producto
- Permitir agregar al carrito desde la vista de detalle
- Mostrar stock disponible y estado del producto

**Componentes**: `Detalle.jsx`, `ProductCard.jsx`

#### RF03 - Filtrado por Categorías
**Descripción**: El sistema debe permitir filtrar productos por categorías.

**Criterios de Aceptación**:
- Mostrar todas las categorías disponibles
- Filtrar productos al seleccionar una categoría
- Mostrar estadísticas por categoría
- Permitir limpiar filtros

**Componentes**: `Categorias.jsx`, `db.js` (getProductosByCategoria)

#### RF04 - Productos en Oferta
**Descripción**: El sistema debe mostrar productos con descuentos especiales.

**Criterios de Aceptación**:
- Filtrar productos con descuento > 0
- Mostrar precio original y precio con descuento
- Calcular y mostrar ahorro del cliente
- Permitir filtrado por rango de descuento

**Componentes**: `Ofertas.jsx`, `db.js` (getProductosEnOferta)

### 2.2 Sistema de Autenticación

#### RF05 - Registro de Usuarios
**Descripción**: El sistema debe permitir el registro de nuevos usuarios.

**Criterios de Aceptación**:
- Formulario con campos: nombre, email, contraseña, confirmar contraseña
- Validación de formato de email
- Validación de longitud mínima de contraseña (6 caracteres)
- Verificación de coincidencia de contraseñas
- Prevenir registro con email duplicado

**Componentes**: `Registro.jsx`, `AuthContext.jsx`, `validations.js`

#### RF06 - Autenticación de Usuarios
**Descripción**: El sistema debe permitir el login de usuarios registrados.

**Criterios de Aceptación**:
- Formulario con email y contraseña
- Validación de credenciales contra base de datos
- Redirección automática según rol del usuario
- Persistencia de sesión en localStorage

**Componentes**: `Login.jsx`, `AuthContext.jsx`, `db.js`

#### RF07 - Gestión de Roles
**Descripción**: El sistema debe manejar diferentes roles de usuario (admin, user).

**Criterios de Aceptación**:
- Usuario admin: acceso completo al panel de administración
- Usuario regular: acceso solo a funcionalidades públicas
- Protección de rutas según rol
- Mostrar/ocultar elementos de navegación según rol

**Componentes**: `AuthContext.jsx`, `PrivateRoute.jsx`, `Navbar.jsx`

### 2.3 Carrito de Compras

#### RF08 - Gestión del Carrito
**Descripción**: El sistema debe permitir agregar, modificar y eliminar productos del carrito.

**Criterios de Aceptación**:
- Agregar productos al carrito
- Incrementar cantidad de productos existentes
- Modificar cantidades manualmente
- Eliminar productos del carrito
- Limpiar carrito completo
- Persistencia en localStorage

**Componentes**: `CartContext.jsx`, `ProductCard.jsx`

#### RF09 - Cálculo de Totales
**Descripción**: El sistema debe calcular correctamente los totales del carrito.

**Criterios de Aceptación**:
- Calcular subtotal por producto
- Aplicar descuentos por producto
- Calcular total general
- Mostrar ahorro total por descuentos
- Actualizar en tiempo real

**Componentes**: `CartContext.jsx`, `Checkout.jsx`

### 2.4 Proceso de Compra

#### RF10 - Checkout
**Descripción**: El sistema debe permitir completar el proceso de compra.

**Criterios de Aceptación**:
- Formulario con datos personales y de envío
- Autocompletar datos si el usuario está logueado
- Validación de todos los campos requeridos
- Selección de método de pago
- Validación de datos de tarjeta (si aplica)
- Simulación de procesamiento de pago

**Componentes**: `Checkout.jsx`, `validations.js`

#### RF11 - Confirmación de Compra
**Descripción**: El sistema debe mostrar confirmación de compra exitosa.

**Criterios de Aceptación**:
- Mostrar número de orden generado
- Mostrar resumen de productos comprados
- Mostrar totales y descuentos aplicados
- Mostrar información de envío
- Limpiar carrito tras compra exitosa
- Opciones para continuar comprando

**Componentes**: `CompraExitosa.jsx`, `CartContext.jsx`

#### RF12 - Manejo de Errores de Pago
**Descripción**: El sistema debe manejar errores en el proceso de pago.

**Criterios de Aceptación**:
- Mostrar mensaje de error claro
- Explicar posibles causas del error
- Ofrecer opciones para reintentar
- Mantener datos del formulario
- No realizar cargo en caso de error

**Componentes**: `CompraFallida.jsx`

### 2.5 Panel de Administración

#### RF13 - CRUD de Productos
**Descripción**: El sistema debe permitir a los administradores gestionar productos.

**Criterios de Aceptación**:
- Listar todos los productos en tabla
- Crear nuevos productos con validación
- Editar productos existentes
- Eliminar productos con confirmación
- Validar datos antes de guardar
- Actualización en tiempo real

**Componentes**: `ProductosAdmin.jsx`, `Dashboard.jsx`, `db.js`

#### RF14 - Dashboard de Administración
**Descripción**: El sistema debe mostrar estadísticas del negocio.

**Criterios de Aceptación**:
- Mostrar total de productos
- Mostrar número de categorías
- Mostrar productos en oferta
- Mostrar productos con stock bajo
- Resumen por categorías
- Alertas de stock bajo

**Componentes**: `Dashboard.jsx`, `db.js`

#### RF15 - Gestión de Usuarios (Opcional)
**Descripción**: El sistema puede permitir gestión básica de usuarios.

**Criterios de Aceptación**:
- Listar usuarios registrados
- Eliminar usuarios (con confirmación)
- Ver información básica de usuarios

**Componentes**: `UsuariosAdmin.jsx` (opcional)

---

## 3. Requerimientos No Funcionales

### 3.1 Rendimiento

#### RNF01 - Tiempo de Carga
**Descripción**: Las páginas deben cargar en menos de 3 segundos en conexión estándar.

**Criterios de Aceptación**:
- Carga inicial de la aplicación < 3 segundos
- Navegación entre páginas < 1 segundo
- Carga de imágenes optimizada

#### RNF02 - Responsividad
**Descripción**: El sistema debe funcionar correctamente en múltiples dispositivos.

**Criterios de Aceptación**:
- Diseño responsivo con Bootstrap
- Funcionalidad completa en móviles, tablets y desktop
- Navegación táctil optimizada

### 3.2 Usabilidad

#### RNF03 - Interfaz Intuitiva
**Descripción**: La interfaz debe ser fácil de usar para usuarios no técnicos.

**Criterios de Aceptación**:
- Navegación clara y consistente
- Formularios con validación en tiempo real
- Mensajes de error claros y útiles
- Feedback visual para acciones del usuario

#### RNF04 - Accesibilidad
**Descripción**: El sistema debe ser accesible para usuarios con discapacidades.

**Criterios de Aceptación**:
- Etiquetas apropiadas en formularios
- Contraste de colores adecuado
- Navegación por teclado
- Texto alternativo en imágenes

### 3.3 Confiabilidad

#### RNF05 - Persistencia de Datos
**Descripción**: Los datos deben persistir entre sesiones del navegador.

**Criterios de Aceptación**:
- Carrito de compras se mantiene al recargar página
- Sesión de usuario persiste
- Productos y usuarios se guardan en localStorage
- Recuperación automática de datos

#### RNF06 - Manejo de Errores
**Descripción**: El sistema debe manejar errores de manera elegante.

**Criterios de Aceptación**:
- No crashes por errores de JavaScript
- Mensajes de error informativos
- Recuperación automática cuando sea posible
- Logging de errores para debugging

### 3.4 Mantenibilidad

#### RNF07 - Código Limpio
**Descripción**: El código debe seguir buenas prácticas de desarrollo.

**Criterios de Aceptación**:
- Arquitectura Atomic Design
- Componentes reutilizables
- Separación de responsabilidades
- Documentación de código

#### RNF08 - Testing
**Descripción**: El sistema debe tener cobertura de pruebas adecuada.

**Criterios de Aceptación**:
- 85%+ cobertura de código
- Pruebas unitarias para componentes críticos
- Pruebas de integración para flujos principales
- Documentación de pruebas

---

## 4. Casos de Uso Principales

### 4.1 Caso de Uso: Compra de Producto

**Actor**: Cliente  
**Precondición**: Cliente navegando en la tienda  

**Flujo Principal**:
1. Cliente navega por productos
2. Cliente selecciona un producto
3. Cliente agrega producto al carrito
4. Cliente procede al checkout
5. Cliente completa formulario de compra
6. Sistema procesa pago
7. Sistema muestra confirmación
8. Sistema limpia carrito

**Flujos Alternativos**:
- 6a. Error en pago → Mostrar página de error
- 3a. Producto sin stock → Mostrar mensaje de no disponible

### 4.2 Caso de Uso: Gestión de Productos (Admin)

**Actor**: Administrador  
**Precondición**: Administrador autenticado  

**Flujo Principal**:
1. Admin accede al panel de administración
2. Admin selecciona gestión de productos
3. Admin crea/edita/elimina producto
4. Sistema valida datos
5. Sistema guarda cambios
6. Sistema actualiza vista

**Flujos Alternativos**:
- 4a. Datos inválidos → Mostrar errores de validación

### 4.3 Caso de Uso: Registro de Usuario

**Actor**: Usuario nuevo  
**Precondición**: Usuario no registrado  

**Flujo Principal**:
1. Usuario accede a página de registro
2. Usuario completa formulario
3. Sistema valida datos
4. Sistema crea cuenta
5. Sistema redirige a login

**Flujos Alternativos**:
- 3a. Email duplicado → Mostrar error
- 3b. Datos inválidos → Mostrar errores específicos

---

## 5. Diagrama de Navegación

```
/ (Home)
├── /productos (Catálogo)
├── /detalle/:id (Detalle Producto)
├── /categorias (Filtro por Categoría)
├── /ofertas (Productos en Oferta)
├── /checkout (Proceso de Compra)
│   ├── /compra-exitosa (Éxito)
│   └── /compra-fallida (Error)
├── /login (Autenticación)
├── /registro (Registro Usuario)
├── /contacto (Contacto)
└── /admin (Panel Admin) [PROTEGIDO]
    ├── Dashboard
    ├── Gestión Productos
    └── Gestión Usuarios (Opcional)
```

---

## 6. Matriz de Trazabilidad

| Requisito | Componente | Prueba | Estado |
|-----------|------------|--------|--------|
| RF01 | ProductGrid, ProductCard | ProductCard.test.jsx | ✅ |
| RF02 | Detalle.jsx | - | ✅ |
| RF03 | Categorias.jsx | - | ✅ |
| RF04 | Ofertas.jsx | - | ✅ |
| RF05 | Registro.jsx | Registro.test.jsx | ✅ |
| RF06 | Login.jsx, AuthContext | AuthContext.test.jsx | ✅ |
| RF07 | PrivateRoute.jsx, Navbar | - | ✅ |
| RF08 | CartContext.jsx | CartContext.test.jsx | ✅ |
| RF09 | CartContext.jsx | CartContext.test.jsx | ✅ |
| RF10 | Checkout.jsx | - | ✅ |
| RF11 | CompraExitosa.jsx | - | ✅ |
| RF12 | CompraFallida.jsx | - | ✅ |
| RF13 | ProductosAdmin.jsx | - | ✅ |
| RF14 | Dashboard.jsx | - | ✅ |
| RF15 | UsuariosAdmin.jsx | - | ⚠️ Opcional |
| RNF01 | - | Performance tests | ✅ |
| RNF02 | Bootstrap components | - | ✅ |
| RNF03 | All components | - | ✅ |
| RNF04 | Form components | - | ✅ |
| RNF05 | localStorage utils | - | ✅ |
| RNF06 | Error boundaries | - | ✅ |
| RNF07 | Atomic Design | - | ✅ |
| RNF08 | Test suite | All .test.jsx | ✅ |

---

## 7. Reglas de Negocio

### 7.1 Productos
- Los productos deben tener nombre, precio, stock y categoría obligatorios
- El precio debe ser mayor a 0
- El stock no puede ser negativo
- Los descuentos se expresan como porcentaje (0-100%)
- Productos con stock 0 no se pueden agregar al carrito

### 7.2 Usuarios
- Email debe ser único en el sistema
- Contraseña mínima de 6 caracteres
- Usuarios admin tienen acceso completo al panel
- Usuarios regulares solo acceso público

### 7.3 Carrito
- Un producto puede agregarse múltiples veces (incrementa cantidad)
- El carrito persiste entre sesiones
- Se limpia automáticamente tras compra exitosa
- Los descuentos se aplican por producto

### 7.4 Compras
- Checkout requiere datos completos de envío
- Si usuario está logueado, se autocompletan datos
- Procesamiento de pago es simulado (90% éxito)
- Número de orden se genera automáticamente

### 7.5 Administración
- Solo usuarios admin pueden acceder a /admin
- Cambios en productos se reflejan inmediatamente
- Eliminación de productos requiere confirmación
- Stock bajo se considera ≤ 5 unidades

---

## 8. Consideraciones Técnicas

### 8.1 Arquitectura
- **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
- **Context API**: Para estado global (Auth, Cart)
- **React Router**: Para navegación SPA
- **localStorage**: Para persistencia de datos

### 8.2 Validaciones
- Funciones centralizadas en `utils/validations.js`
- Validación en tiempo real en formularios
- Mensajes de error específicos y útiles

### 8.3 Testing
- **Jasmine + Karma**: Framework de testing
- **React Testing Library**: Para testing de componentes
- **Cobertura objetivo**: 85%+ del código
- **Tipos de pruebas**: Render, Props, State, Events

### 8.4 Performance
- Componentes funcionales con hooks
- Lazy loading de imágenes
- Optimización de re-renders
- Bundle splitting con Vite

---

## 9. Conclusiones

Este documento especifica un sistema completo de e-commerce desarrollado con React que cumple con todos los requerimientos de la Evaluación Parcial 2. El sistema incluye funcionalidades avanzadas de autenticación, gestión de productos, carrito de compras y panel de administración, todo implementado siguiendo las mejores prácticas de desarrollo frontend moderno.

La arquitectura modular y el enfoque en testing aseguran la mantenibilidad y confiabilidad del sistema, mientras que el diseño responsivo garantiza una excelente experiencia de usuario en todos los dispositivos.

---

**Documento aprobado por**: [Nombre del Estudiante]  
**Fecha de aprobación**: Octubre 2024  
**Versión final**: 2.0