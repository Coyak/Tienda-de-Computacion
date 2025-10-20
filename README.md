# 🛒 Tienda de Computación - React

**E-commerce moderno desarrollado con React para la venta de productos de computación**

---

## 📋 Descripción del Proyecto

**Tienda de Computación** es una aplicación web de comercio electrónico desarrollada con React, diseñada para la venta de productos de computación. La aplicación incluye un sistema completo de gestión de productos, carrito de compras, autenticación de usuarios y panel administrativo.

### 🎯 Características Principales

- **🛍️ Catálogo de Productos**: Visualización y filtrado de productos por categorías
- **🔐 Sistema de Autenticación**: Registro, login y gestión de usuarios
- **🛒 Carrito de Compras**: Gestión completa del carrito con persistencia
- **👨‍💼 Panel Administrativo**: CRUD de productos y gestión de usuarios
- **📱 Diseño Responsivo**: Interfaz moderna con tema oscuro
- **🧪 Testing Completo**: Pruebas unitarias con Jasmine

---

## 🚀 Tecnologías Utilizadas

### **Frontend**
- **React 19.1.1** - Biblioteca principal para la interfaz de usuario
- **React Router DOM 7.9.4** - Enrutamiento de la aplicación
- **Bootstrap 5.3.8** - Framework CSS para diseño responsivo
- **Bootstrap Icons 1.13.1** - Iconografía consistente

### **Herramientas de Desarrollo**
- **Vite 7.1.7** - Build tool y servidor de desarrollo
- **ESLint** - Linter para calidad de código
- **Babel** - Transpilador de JavaScript

### **Testing**
- **Jasmine 5.12.0** - Framework de testing unitario
- **Karma 6.4.4** - Test runner
- **React Testing Library** - Utilidades para testing de componentes React

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── atoms/           # Componentes básicos (Button, Input, Card)
│   ├── molecules/       # Componentes compuestos (ProductCard)
│   ├── organisms/       # Componentes complejos (Navbar, ProductGrid)
│   ├── pages/          # Páginas principales
│   │   └── Admin/      # Panel administrativo
│   └── templates/      # Layouts y rutas protegidas
├── context/            # Context API (Auth, Cart)
├── data/              # Base de datos mock
├── assets/            # Imágenes y recursos estáticos
├── utils/             # Utilidades y helpers
└── tests-jasmine-puro/ # Pruebas unitarias
```

---

## 🛠️ Instalación y Configuración

### **Prerrequisitos**
- Node.js (versión 18 o superior)
- npm o yarn

### **Pasos de Instalación**

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Coyak/Tienda-de-Computacion.git
   cd Tienda-de-Computacion
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

---

## 🧪 Testing

### **Ejecutar Pruebas**
```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar con cobertura
npm run test:coverage
```

### **Pruebas Implementadas**
- ✅ **Renderizado Correcto**: Verificación de componentes que renderizan listas
- ✅ **Renderizado Condicional**: Mensajes de error que aparecen según condiciones
- ✅ **Propiedades Recibidas**: Componentes que reciben props correctamente
- ✅ **Gestión del Estado**: Formularios que cambian estado al escribir
- ✅ **Simulación de Eventos**: Clics que ejecutan funciones específicas

---

## 👥 Usuarios de Prueba

### **Administrador**
```
Email: admin@tienda.com
Contraseña: admin123
```

### **Usuario Demo**
```
Email: usuario@demo.com
Contraseña: demo123
```

---

## 🎨 Funcionalidades

### **👤 Para Usuarios**
- **Navegación**: Explorar productos por categorías
- **Búsqueda**: Filtrar productos por nombre
- **Detalles**: Ver información completa de productos
- **Carrito**: Agregar/eliminar productos del carrito
- **Checkout**: Proceso de compra simulado
- **Autenticación**: Registro e inicio de sesión

### **👨‍💼 Para Administradores**
- **Dashboard**: Estadísticas del sistema
- **Gestión de Productos**: CRUD completo de productos
- **Gestión de Usuarios**: Administración de cuentas
- **Imágenes**: Carga y gestión de imágenes de productos

---

## 🎯 Páginas Principales

| **Página** | **Ruta** | **Descripción** |
|------------|----------|-----------------|
| **Home** | `/` | Página principal con hero y categorías |
| **Productos** | `/productos` | Catálogo completo de productos |
| **Categorías** | `/categorias` | Filtrado por categorías |
| **Detalle** | `/detalle/:id` | Vista detallada de producto |
| **Carrito** | `/carrito` | Gestión del carrito de compras |
| **Checkout** | `/checkout` | Proceso de compra |
| **Login** | `/login` | Inicio de sesión |
| **Registro** | `/registro` | Creación de cuenta |
| **Contacto** | `/contacto` | Información de contacto |
| **Admin** | `/admin` | Panel administrativo |

---

## 🏗️ Arquitectura

### **Atomic Design**
- **Atoms**: Componentes básicos reutilizables
- **Molecules**: Combinaciones de atoms
- **Organisms**: Componentes complejos
- **Templates**: Layouts de página
- **Pages**: Páginas completas

### **Context API**
- **AuthContext**: Gestión de autenticación y roles
- **CartContext**: Estado global del carrito

### **Persistencia**
- **localStorage**: Almacenamiento local de datos
- **Base de datos mock**: Simulación de backend

---

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build

# Testing
npm test             # Ejecutar pruebas
npm run test:coverage # Pruebas con cobertura

# Calidad
npm run lint         # Linter de código
```

---

## 🌐 Despliegue

### **Build de Producción**
```bash
npm run build
```

Los archivos se generan en la carpeta `dist/` y están listos para desplegar en cualquier servidor web estático.

---

## 📝 Notas de Desarrollo

### **Características Técnicas**
- **Tema Oscuro**: Interfaz moderna con paleta de colores azul y negro
- **Responsive Design**: Adaptable a dispositivos móviles y desktop
- **Componentes Reutilizables**: Arquitectura modular y escalable
- **Persistencia Local**: Datos guardados en localStorage
- **Validaciones**: Formularios con validación client-side

### **Optimizaciones**
- **Lazy Loading**: Carga diferida de componentes
- **Image Optimization**: Optimización de imágenes de productos
- **Bundle Splitting**: División de código para mejor rendimiento

---

## 🤝 Contribución

Este proyecto fue desarrollado como parte de la **Evaluación Parcial 2** del curso **DSY1104 - Desarrollo de Fullstack**.

### **Estructura de Commits**
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Documentación
- `test:` Pruebas
- `refactor:` Refactorización
- `chore:` Tareas de mantenimiento

---

## 📄 Licencia

Proyecto desarrollado con fines educativos para el curso DSY1104 - Desarrollo de Fullstack.

---

## 👨‍💻 Desarrollador

**Angel Coyak**  
Estudiante de Ingeniería en Informática  
Curso: DSY1104 - Desarrollo de Fullstack  
Evaluación Parcial 2

---

*Proyecto desarrollado con ❤️ usando React y las mejores prácticas de desarrollo web moderno.*