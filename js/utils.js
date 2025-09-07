// Utils pequeños y helpers DOM
function qs(sel, root = document) { return root.querySelector(sel); }
function qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

function formToObject(form) {
  const data = {};
  new FormData(form).forEach((v, k) => { data[k] = v; });
  return data;
}

function formatPrecio(valor) {
  const n = Number(valor || 0);
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);
}

function parseQuery() {
  const p = new URLSearchParams(location.search);
  const o = {}; p.forEach((v, k) => o[k] = v);
  return o;
}

// Exponer globalmente para páginas estáticas
window.qs = qs; window.qsa = qsa; window.formToObject = formToObject; window.formatPrecio = formatPrecio; window.parseQuery = parseQuery;

// Bootstrap simple para páginas públicas (sin inline scripts)
document.addEventListener('DOMContentLoaded', function(){
  const anio = document.getElementById('anio'); if (anio) anio.textContent = new Date().getFullYear();
  if (window.renderMiniCart) window.renderMiniCart();

  // Home: destacados
  const contDest = document.getElementById('destacados');
  if (contDest) {
    const productos = (JSON.parse(localStorage.getItem('productos')) || PRODUCTOS_SEMILLA).slice(0, 4);
    contDest.innerHTML = productos.map(p => `
      <article class="card producto" tabindex="0">
        <a href="detalle.html?id=${p.id}" class="img-wrap">
          <img src="${p.imagen || 'img/placeholder.png'}" alt="${p.nombre}" loading="lazy">
        </a>
        <div class="card-body">
          <h3 class="card-title">${p.nombre}</h3>
          <p class="precio">${formatPrecio(p.precio)}</p>
          <div class="card-actions">
            <a class="btn" href="detalle.html?id=${p.id}">Ver</a>
            <button class="btn secundario" data-add-to-cart data-id="${p.id}">Añadir</button>
          </div>
        </div>
      </article>`).join('');
    window.bindAddToCartButtons && window.bindAddToCartButtons();
  }

  // Productos list
  const contLista = document.getElementById('lista-productos');
  if (contLista) {
    const productos = JSON.parse(localStorage.getItem('productos')) || PRODUCTOS_SEMILLA;
    contLista.innerHTML = productos.map(p => `
      <article class="card producto">
        <a href="detalle.html?id=${p.id}" class="img-wrap">
          <img src="${p.imagen || 'img/placeholder.png'}" alt="${p.nombre}">
        </a>
        <div class="card-body">
          <h3 class="card-title">${p.nombre}</h3>
          <p class="precio">${formatPrecio(p.precio)}</p>
          <div class="card-actions">
            <a class="btn" href="detalle.html?id=${p.id}">Ver</a>
            <button class="btn secundario" data-add-to-cart data-id="${p.id}">Añadir al carrito</button>
          </div>
        </div>
      </article>`).join('');
    window.bindAddToCartButtons && window.bindAddToCartButtons();
    window.renderCarritoSeccion && window.renderCarritoSeccion();
  }

  // Detalle
  const detalleCont = document.getElementById('detalle');
  if (detalleCont) {
    const id = new URLSearchParams(location.search).get('id');
    const productos = JSON.parse(localStorage.getItem('productos')) || PRODUCTOS_SEMILLA;
    const p = productos.find(x => x.id === id);
    if (!p) {
      detalleCont.innerHTML = '<p>Producto no encontrado.</p>';
    } else {
      detalleCont.innerHTML = `
        <article class="detalle">
          <div class="detalle-img">
            <img src="${p.imagen || 'img/placeholder.png'}" alt="${p.nombre}">
          </div>
          <div class="detalle-info">
            <h1>${p.nombre}</h1>
            <p class="precio">${formatPrecio(p.precio)}</p>
            <p><strong>Categoría:</strong> ${p.categoria || '-'}</p>
            <p><strong>Stock:</strong> ${p.stock ?? '-'}</p>
            <p>${p.descripcion || ''}</p>
            <div class="qty">
              <label for="qty">Cantidad</label>
              <input id="qty" type="number" min="1" value="1">
            </div>
            <button class="btn" id="btn-add">Añadir al carrito</button>
          </div>
        </article>`;
      const btn = document.getElementById('btn-add');
      btn?.addEventListener('click', function(){
        const q = Math.max(1, parseInt(document.getElementById('qty').value || '1', 10));
        window.addToCart && window.addToCart(p.id, q);
      });
    }
  }

});
