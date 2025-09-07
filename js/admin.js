// Admin simulado: CRUD en localStorage + roles UI

const KEY_PRODUCTOS = 'productos';
const KEY_USUARIOS = 'usuarios';
const KEY_ROL = 'tipoUsuario';

function ensureSeeds() {
  if (!localStorage.getItem(KEY_PRODUCTOS)) localStorage.setItem(KEY_PRODUCTOS, JSON.stringify(PRODUCTOS_SEMILLA));
  if (!localStorage.getItem(KEY_USUARIOS)) localStorage.setItem(KEY_USUARIOS, JSON.stringify(USUARIOS_SEMILLA));
}

function getProductos() { ensureSeeds(); return JSON.parse(localStorage.getItem(KEY_PRODUCTOS)) || []; }
function setProductos(arr) { localStorage.setItem(KEY_PRODUCTOS, JSON.stringify(arr)); }
function getUsuarios() { ensureSeeds(); return JSON.parse(localStorage.getItem(KEY_USUARIOS)) || []; }
function setUsuarios(arr) { localStorage.setItem(KEY_USUARIOS, JSON.stringify(arr)); }

// UI roles
function aplicarRestriccionesRol() {
  const rol = (localStorage.getItem(KEY_ROL) || 'Administrador');
  const adminOnly = qsa('[data-role-admin-only]');
  if (rol === 'Vendedor') {
    adminOnly.forEach(el => el.style.display = 'none');
  } else {
    adminOnly.forEach(el => el.style.display = '');
  }
  if (rol === 'Cliente') {
    // En una app real, redirigiría fuera del admin
  }
  const select = qs('#rol');
  if (select) select.value = rol;
}

function inicializarAdminUI() {
  ensureSeeds();
  const select = qs('#rol');
  if (select) {
    select.addEventListener('change', () => { localStorage.setItem(KEY_ROL, select.value); location.reload(); });
  }
  aplicarRestriccionesRol();
}

// Productos
function listarProductos() {
  const tbody = qs('#tbody-productos'); if (!tbody) return;
  const productos = getProductos();
  tbody.innerHTML = productos.map(p => `
    <tr>
      <td>${p.codigo}</td>
      <td>${p.nombre}</td>
      <td>${formatPrecio(p.precio)}</td>
      <td>${p.stock}</td>
      <td>${p.categoria || ''}</td>
      <td>
        <a class="btn" href="productos-editar.html?id=${p.id}">Editar</a>
        <button class="btn secundario" data-eliminar="${p.id}">Eliminar</button>
      </td>
    </tr>`).join('');
  qsa('[data-eliminar]').forEach(b => b.addEventListener('click', () => eliminarProducto(b.dataset.eliminar)));
}

function crearProducto(data) {
  const productos = getProductos();
  const id = `p${Date.now()}`;
  const nuevo = { id, ...data, precio: Number(data.precio), stock: Number(data.stock), stockCritico: data.stockCritico ? Number(data.stockCritico) : undefined };
  productos.push(nuevo);
  setProductos(productos);
  alert('Producto creado');
  location.href = 'productos.html';
}

function poblarCategorias(selector) {
  const sel = qs(selector); if (!sel) return;
  sel.innerHTML = '<option value="">Seleccione…</option>' + CATEGORIAS.map(c => `<option>${c}</option>`).join('');
}

function cargarProductoParaEdicion(id) {
  const form = qs('#form-producto'); if (!form) return;
  const p = getProductos().find(x => x.id === id);
  if (!p) { alert('Producto no encontrado'); return; }
  Object.entries(p).forEach(([k,v]) => { if (form.elements[k]) form.elements[k].value = v ?? ''; });
}

function actualizarProducto(id, data) {
  const productos = getProductos();
  const idx = productos.findIndex(x => x.id === id);
  if (idx < 0) { alert('No existe'); return; }
  const upd = { ...productos[idx], ...data, precio: Number(data.precio), stock: Number(data.stock), stockCritico: data.stockCritico ? Number(data.stockCritico) : undefined };
  productos[idx] = upd;
  setProductos(productos);
  alert('Producto actualizado');
  location.href = 'productos.html';
}

function eliminarProducto(id) {
  if (!confirm('¿Eliminar producto?')) return;
  const productos = getProductos().filter(x => x.id !== id);
  setProductos(productos);
  listarProductos();
}

// Usuarios
function listarUsuarios() {
  const tbody = qs('#tbody-usuarios'); if (!tbody) return;
  const usuarios = getUsuarios();
  const rol = localStorage.getItem(KEY_ROL) || 'Administrador';
  tbody.innerHTML = usuarios.map(u => `
    <tr>
      <td>${u.run}</td>
      <td>${u.nombre}</td>
      <td>${u.apellidos}</td>
      <td>${u.correo}</td>
      <td>${u.tipoUsuario}</td>
      <td>
        <a class="btn" href="usuarios-editar.html?id=${u.id}">Editar</a>
        ${rol === 'Vendedor' ? '' : `<button class="btn secundario" data-eliminar-usuario="${u.id}">Eliminar</button>`}
      </td>
    </tr>`).join('');
  qsa('[data-eliminar-usuario]').forEach(b => b.addEventListener('click', () => eliminarUsuario(b.dataset.eliminarUsuario)));
}

function crearUsuario(data) {
  const usuarios = getUsuarios();
  const id = `u${Date.now()}`;
  const nuevo = { id, ...data };
  usuarios.push(nuevo);
  setUsuarios(usuarios);
  alert('Usuario creado');
  location.href = 'usuarios.html';
}

function cargarUsuarioParaEdicion(id) {
  const form = qs('#form-usuario'); if (!form) return;
  const u = getUsuarios().find(x => x.id === id);
  if (!u) { alert('Usuario no encontrado'); return; }
  // Establecer región y comunas dependientes primero
  if (form.elements['region'] && form.elements['comuna']) {
    form.elements['region'].value = u.region || '';
    form.elements['region'].dispatchEvent(new Event('change'));
    setTimeout(() => { form.elements['comuna'].value = u.comuna || ''; }, 0);
  }
  Object.entries(u).forEach(([k,v]) => {
    if (k === 'region' || k === 'comuna') return;
    if (form.elements[k]) form.elements[k].value = v ?? '';
  });
}

function actualizarUsuario(id, data) {
  const usuarios = getUsuarios();
  const idx = usuarios.findIndex(x => x.id === id);
  if (idx < 0) { alert('No existe'); return; }
  usuarios[idx] = { ...usuarios[idx], ...data };
  setUsuarios(usuarios);
  alert('Usuario actualizado');
  location.href = 'usuarios.html';
}

function eliminarUsuario(id) {
  if (!confirm('¿Eliminar usuario?')) return;
  const usuarios = getUsuarios().filter(x => x.id !== id);
  setUsuarios(usuarios);
  listarUsuarios();
}

// Regiones/Comunas dependientes
function poblarRegionesYComunas(selRegion, selComuna) {
  const r = qs(selRegion); const c = qs(selComuna);
  if (!r || !c) return;
  r.innerHTML = '<option value="">Seleccione…</option>' + REGIONES.map(x => `<option>${x.nombre}</option>`).join('');
  r.addEventListener('change', () => {
    const region = REGIONES.find(x => x.nombre === r.value);
    c.innerHTML = '<option value="">Seleccione…</option>' + (region ? region.comunas.map(co => `<option>${co}</option>`).join('') : '');
  });
}

// Exponer
window.inicializarAdminUI = inicializarAdminUI;
window.listarProductos = listarProductos;
window.crearProducto = crearProducto;
window.cargarProductoParaEdicion = cargarProductoParaEdicion;
window.actualizarProducto = actualizarProducto;
window.eliminarProducto = eliminarProducto;
window.listarUsuarios = listarUsuarios;
window.crearUsuario = crearUsuario;
window.cargarUsuarioParaEdicion = cargarUsuarioParaEdicion;
window.actualizarUsuario = actualizarUsuario;
window.eliminarUsuario = eliminarUsuario;
window.poblarCategorias = poblarCategorias;
window.poblarRegionesYComunas = poblarRegionesYComunas;
window.getProductos = getProductos;
window.getUsuarios = getUsuarios;

// Autowire para páginas admin (sin inline)
document.addEventListener('DOMContentLoaded', function(){
  const path = location.pathname.toLowerCase();
  if (!path.includes('/admin/')) return;
  inicializarAdminUI();
  if (path.endsWith('/admin/productos.html')) {
    listarProductos();
  }
  if (path.endsWith('/admin/home.html')) {
    const res = qs('#admin-resumen');
    if (res) {
      const productos = getProductos();
      const usuarios = getUsuarios();
      res.innerHTML = `<p>Productos: <strong>${productos.length}</strong></p><p>Usuarios: <strong>${usuarios.length}</strong></p>`;
    }
  }
  if (path.endsWith('/admin/productos-nuevo.html')) {
    poblarCategorias('#p-categoria');
    wireValidaciones('#form-producto', reglasProducto(), crearProducto);
    const stock = document.getElementById('p-stock');
    const crit = document.getElementById('p-stockCritico');
    const aviso = document.getElementById('aviso-stock');
    function check() {
      const s = parseInt(stock.value||'0',10), c = parseInt(crit.value||'-1',10);
      if (!isNaN(c) && s <= c) { aviso.textContent = 'Aviso: stock es menor o igual al stock crítico'; aviso.style.display='block'; }
      else { aviso.textContent = ''; aviso.style.display='none'; }
    }
    stock?.addEventListener('input', check); crit?.addEventListener('input', check);
  }
  if (path.endsWith('/admin/productos-editar.html')) {
    poblarCategorias('#p-categoria');
    const id = new URLSearchParams(location.search).get('id');
    cargarProductoParaEdicion(id);
    wireValidaciones('#form-producto', reglasProducto(), (data) => actualizarProducto(id, data));
    const stock = document.getElementById('p-stock');
    const crit = document.getElementById('p-stockCritico');
    const aviso = document.getElementById('aviso-stock');
    function check() {
      const s = parseInt(stock.value||'0',10), c = parseInt(crit.value||'-1',10);
      if (!isNaN(c) && s <= c) { aviso.textContent = 'Aviso: stock es menor o igual al stock crítico'; aviso.style.display='block'; }
      else { aviso.textContent = ''; aviso.style.display='none'; }
    }
    stock?.addEventListener('input', check); crit?.addEventListener('input', check); check();
  }
  if (path.endsWith('/admin/usuarios.html')) {
    listarUsuarios();
  }
  if (path.endsWith('/admin/usuarios-nuevo.html')) {
    poblarRegionesYComunas('#u-region', '#u-comuna');
    wireValidaciones('#form-usuario', reglasUsuario(), crearUsuario);
  }
  if (path.endsWith('/admin/usuarios-editar.html')) {
    poblarRegionesYComunas('#u-region', '#u-comuna');
    const id = new URLSearchParams(location.search).get('id');
    cargarUsuarioParaEdicion(id);
    wireValidaciones('#form-usuario', reglasUsuario(), (data) => actualizarUsuario(id, data));
  }
});
