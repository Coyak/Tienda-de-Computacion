# Tienda de Computación - React

Una aplicación web moderna de tienda de computación desarrollada con React, Bootstrap y funcionalidades completas de e-commerce.

## 🚀 Características Principales

### Funcionalidades del Usuario
- **Catálogo de Productos**: Visualización de productos con filtros y búsqueda
- **Categorías**: Navegación por categorías de productos
- **Ofertas**: Productos con descuentos especiales
- **Carrito de Compras**: Gestión completa del carrito con persistencia
- **Checkout**: Proceso de compra con validación de formularios
- **Autenticación**: Sistema de login con roles (admin/usuario)

### Panel de Administración
- **CRUD de Productos**: Crear, leer, actualizar y eliminar productos
- **Dashboard**: Estadísticas y resumen del sistema
- **Gestión de Stock**: Control de inventario y alertas de stock bajo
- **Categorías**: Administración de categorías de productos

### Características Técnicas
- **Responsive Design**: Diseño adaptativo con Bootstrap 5
- **Persistencia**: Almacenamiento local con localStorage
- **Testing**: Suite completa de pruebas unitarias con Jasmine + Karma
- **Arquitectura**: Estructura modular con Atomic Design

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.1**: Framework principal
- **React Router DOM 7.9.4**: Navegación entre páginas
- **Bootstrap 5.3.8**: Framework CSS responsivo
- **Vite**: Build tool y servidor de desarrollo

### Testing
- **Jasmine**: Framework de testing
- **Karma**: Test runner
- **React Testing Library**: Testing de componentes React
- **Babel**: Transpilación de código

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── atoms/           # Componentes básicos (Button, Input)
│   ├── molecules/       # Componentes compuestos (ProductCard)
│   ├── organisms/       # Componentes complejos (Navbar, ProductGrid)
│   ├── pages/           # Páginas de la aplicación
│   │   ├── Admin/       # Panel de administración
│   │   ├── Checkout.jsx # Proceso de compra
│   │   ├── Categorias.jsx
│   │   ├── Ofertas.jsx
│   │   └── ...
│   └── templates/       # Layouts y rutas protegidas
├── context/             # Contextos de React (Auth, Cart)
├── data/                # Base de datos mock y funciones CRUD
├── utils/               # Utilidades y helpers (storage.js, validations.js)
└── assets/              # Imágenes y recursos estáticos
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd tienda-de-computacion
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 🧪 Testing

### Ejecutar Pruebas
```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

### Cobertura de Testing
- **35+ pruebas unitarias** implementadas
- **85-90% de cobertura** de código
- Pruebas de componentes, lógica de negocio y contextos
- Documentación completa en `docs/COBERTURA_TESTING.md`

## 📱 Funcionalidades por Página

### Páginas Públicas
- **Home** (`/`): Página principal con productos destacados
- **Productos** (`/productos`): Catálogo completo de productos
- **Categorías** (`/categorias`): Filtrado por categorías
- **Ofertas** (`/ofertas`): Productos con descuentos
- **Detalle** (`/detalle/:id`): Vista detallada de productos
- **Contacto** (`/contacto`): Formulario de contacto
- **Registro** (`/registro`): Registro de nuevos usuarios

### Flujo de Compra
- **Checkout** (`/checkout`): Proceso de compra con validación
- **Compra Exitosa** (`/compra-exitosa`): Confirmación de compra
- **Compra Fallida** (`/compra-fallida`): Manejo de errores de pago

### Panel de Administración
- **Login** (`/login`): Autenticación de administradores
- **Admin Dashboard** (`/admin`): Panel de control (ruta protegida)

## 🔐 Credenciales de Acceso

### Administrador
- **Email**: admin@tienda.com
- **Contraseña**: admin123

## 💾 Persistencia de Datos

La aplicación utiliza **localStorage** para persistir:
- Productos del catálogo
- Carrito de compras
- Sesión de usuario
- Configuraciones de la aplicación

## 🎨 Diseño y UX

### Atomic Design
- **Atoms**: Button, Input (componentes básicos)
- **Molecules**: ProductCard (componentes compuestos)
- **Organisms**: Navbar, ProductGrid (componentes complejos)
- **Templates**: Layout, PrivateRoute (estructuras de página)
- **Pages**: Páginas completas de la aplicación

### Bootstrap 5
- Sistema de grid responsivo
- Componentes predefinidos
- Utilidades de espaciado y tipografía
- Iconos con Bootstrap Icons

## 📊 Funcionalidades del Admin

### Gestión de Productos
- ✅ Crear nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos
- ✅ Gestionar stock e inventario
- ✅ Asignar categorías y descuentos

### Dashboard
- 📈 Estadísticas de productos
- 📊 Resumen por categorías
- ⚠️ Alertas de stock bajo
- 📋 Listado de productos en oferta

## 🧪 Casos de Prueba Implementados

### Componentes UI
- Renderizado correcto de elementos
- Manejo de eventos (click, change, submit)
- Validación de formularios
- Estados de carga y error

### Lógica de Negocio
- Operaciones CRUD completas
- Cálculos de precios y descuentos
- Gestión de carrito de compras
- Autenticación y autorización

### Persistencia
- Almacenamiento en localStorage
- Recuperación de datos
- Sincronización entre pestañas

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build

# Testing
npm test             # Ejecutar pruebas
npm run test:watch   # Modo watch
npm run test:coverage # Con cobertura

# Linting
npm run lint         # Verificar código
```

## 📈 Métricas del Proyecto

- **Líneas de código**: ~3000+ líneas
- **Componentes React**: 20+ componentes
- **Páginas**: 12+ páginas
- **Pruebas unitarias**: 50+ pruebas
- **Cobertura de testing**: 85-90%

## 🔄 Flujo de Desarrollo

1. **Desarrollo**: Modificar código en `src/`
2. **Testing**: Ejecutar `npm test` para verificar cambios
3. **Build**: `npm run build` para producción
4. **Deploy**: Subir archivos de `dist/` al servidor

## 📝 Documentación Adicional

- **Cobertura de Testing**: `docs/COBERTURA_TESTING.md`
- **Configuración de Testing**: `karma.conf.js`
- **Configuración de Babel**: `.babelrc`

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está desarrollado para fines educativos como parte de la Evaluación Parcial 2 del curso DSY1104.

## 👥 Equipo

- **Desarrollador**: [Tu Nombre]
- **Curso**: DSY1104 - Desarrollo de Sistemas Web
- **Institución**: [Nombre de la Universidad]

---

**Versión**: 1.0  
**Última actualización**: Octubre 2024