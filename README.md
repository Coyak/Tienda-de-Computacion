# Tienda Online – Versión preliminar (Entrega 1 · DSY1104)

Sitio web estático hecho con HTML5 + CSS externo + JavaScript vanilla. Cumple con navegación pública, render dinámico de productos, carrito persistente en `localStorage` y un panel administrativo simulado (CRUD en `localStorage`) con restricciones básicas por rol.

## Cómo ejecutar
- Opción sencilla: abre `index.html` con doble clic en tu navegador.
- Opción recomendada: usa una extensión tipo Live Server para autorefresco.

## Tecnologías y convenciones
- HTML5 semántico: `<header> <nav> <main> <section> <article> <footer>`.
- CSS externo único: `css/style.css` (reset, variables, responsive, componentes).
- JS modular en `/js`: datos, utilidades, validaciones, carrito y admin.
- Responsive: breakpoint móvil ≤768px, desktop >768px.
- Accesibilidad mínima: `alt`, `label for`, contenedores de error con `aria-live`.
- Sin frameworks externos (no Tailwind/Bootstrap; puro HTML/CSS/JS).

## Estructura del proyecto
- Páginas públicas: `index.html`, `productos.html`, `detalle.html`, `registro.html`, `login.html`, `contacto.html`, `nosotros.html`, `blog.html`, `blog-detalle-1.html`, `blog-detalle-2.html`.
- Admin: `admin/home.html`, `admin/productos.html`, `admin/productos-nuevo.html`, `admin/productos-editar.html`, `admin/usuarios.html`, `admin/usuarios-nuevo.html`, `admin/usuarios-editar.html`.
- Estilos: `css/style.css`.
- JavaScript:
  - `js/data.js`: datos semilla (productos, categorías, usuarios, regiones/comunas, dominios).
  - `js/utils.js`: helpers (`qs`, `qsa`, `formToObject`, `formatPrecio`, bootstrap de páginas públicas).
  - `js/validaciones.js`: TODAS las validaciones y wiring de formularios.
  - `js/carrito.js`: lógica de carrito (render mini-cart/section, persistencia).
  - `js/admin.js`: CRUD simulado productos/usuarios + roles + wiring de vistas admin.

## Funcionalidades principales
- Tienda (público)
  - Home: productos destacados renderizados desde `data.js` (no hardcode).
  - Productos: grid con imagen, nombre, precio y “Añadir al carrito”.
  - Detalle: carga por `?id=<ID>` desde querystring.
  - Blog, Nosotros, Contacto, Login, Registro navegables desde el nav.
- Carrito (`localStorage` clave `carrito`)
  - `addToCart`, `removeFromCart`, `setQty`, `getCartTotal`, `getCartCount`.
  - Mini-cart en el header; sección de carrito en `productos.html`.
  - Reglas: cantidades ≥1, sin NaN, totales redondeados.
- Validaciones (JS puro, mensajes en contexto)
  - Login: correo (máx 100 y dominio permitido), contraseña (4–10).
  - Contacto: nombre (req, máx 100), correo (máx 100 + dominio), comentario (req, máx 500).
  - Registro: nombre, correo (dominios permitidos), pass y confirmación.
  - Admin/Productos: código(min 3), nombre(≤100), desc(≤500), precio(≥0), stock(≥0 entero), stock crítico(opcional ≥0), categoría(select req). Aviso visual si `stock ≤ stockCritico`.
  - Admin/Usuarios: RUN (7–9, DV válido), nombre(≤50), apellidos(≤100), correo(≤100 + dominio), tipoUsuario(select), región/comuna dependientes, dirección(≤300).
  - Helpers implementados: `esCorreoValidoDominio`, `esLargoEntre`, `maxLongitud`, `esEnteroNoNegativo`, `esDecimalNoNegativo`, `validarRUT`, `anexarErrores`, `wireValidaciones`.
- Admin simulado (sin backend)
  - `localStorage` claves: `productos`, `usuarios`, `tipoUsuario` (rol activo).
  - Productos: listar/crear/editar/eliminar con persistencia en `localStorage`.
  - Usuarios: listar/crear/editar/eliminar con persistencia en `localStorage`.
  - Roles: selector en header admin; si “Vendedor” oculta “Nuevo Usuario” y “Eliminar Usuario”. “Cliente” es solo visual (no debería usar admin).

## Personalización rápida
- Datos semilla: edita `js/data.js` (categorías, productos, usuarios, regiones/comunas, dominios).
- Estilos: ajusta variables CSS en `css/style.css` (colores, tipografía, radios, anchos) y los componentes (botones, tarjetas, formularios, tablas).
- Rol por defecto: cambia `tipoUsuario` en `localStorage` o usa el selector en admin.

## Guía rápida de desarrollo
1) Arranca Live Server y navega a `index.html` y `admin/home.html`.
2) Cambia datos en `js/data.js` y recarga; admin inicializa seeds si no existen en `localStorage`.
3) Revisa validaciones en formularios abiertos (errores aparecen bajo cada campo).
4) Prueba carrito: añadir, cambiar cantidades y quitar productos; el total y conteo se actualizan.

## Checklist de la evaluación (estado)
- Navegación completa entre todas las páginas: OK.
- CSS externo único y responsive: OK (media query ≤768px).
- Validaciones JS en contextos requeridos: OK (login, contacto, registro, productos, usuarios).
- Carrito con `localStorage` (añadir/quitar/actualizar, total correcto, persistencia): OK.
- Admin simulado CRUD + roles (UI): OK.
- Accesibilidad básica (`alt`, `label`, `aria-live`): OK.
- Código organizado, sin inline JS ni estilos (salvo mínimos de accesibilidad): OK.

## Compatibilidad
- Probado en navegadores modernos (Chrome/Edge). No requiere servidor.

