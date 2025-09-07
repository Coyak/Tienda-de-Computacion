// Carrito con localStorage
const CART_KEY = 'carrito';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderMiniCart();
}

function getProductoById(id) {
  const productos = JSON.parse(localStorage.getItem('productos')) || PRODUCTOS_SEMILLA;
  return productos.find(p => p.id === id);
}

function addToCart(productId, qty = 1) {
  qty = parseInt(qty, 10);
  if (!Number.isFinite(qty) || qty < 1) qty = 1;
  const product = getProductoById(productId);
  if (!product) return;
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx >= 0) {
    cart[idx].cantidad = Math.max(1, (cart[idx].cantidad || 0) + qty);
    cart[idx].subtotal = Number((cart[idx].cantidad * product.precio).toFixed(2));
  } else {
    cart.push({ id: productId, nombre: product.nombre, precio: Number(product.precio.toFixed ? product.precio.toFixed(2) : product.precio), cantidad: qty, subtotal: Number((qty * product.precio).toFixed(2)) });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
}

function setQty(productId, qty) {
  qty = parseInt(qty, 10);
  if (!Number.isFinite(qty) || qty < 1) qty = 1;
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  const product = getProductoById(productId);
  if (item && product) {
    item.cantidad = qty;
    item.subtotal = Number((qty * product.precio).toFixed(2));
    saveCart(cart);
  }
}

function getCartTotal() {
  return getCart().reduce((acc, i) => acc + (Number(i.subtotal) || 0), 0);
}

function getCartCount() {
  return getCart().reduce((acc, i) => acc + (Number(i.cantidad) || 0), 0);
}

function bindAddToCartButtons() {
  qsa('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id, 1));
  });
}

function renderMiniCart() {
  const el = document.getElementById('mini-cart');
  if (!el) return;
  const count = getCartCount();
  const total = getCartTotal();
  el.textContent = `Carrito (${count}) - ${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(total)}`;
}

function renderCarritoSeccion() {
  const cont = document.getElementById('carrito-contenido');
  if (!cont) return;
  const cart = getCart();
  if (cart.length === 0) {
    cont.innerHTML = '<p>Tu carrito está vacío.</p>';
    return;
  }
  const productos = JSON.parse(localStorage.getItem('productos')) || PRODUCTOS_SEMILLA;
  cont.innerHTML = cart.map(item => {
    const p = productos.find(x => x.id === item.id);
    return `<div class="item">
      <div>${item.nombre}</div>
      <div>${formatPrecio(p ? p.precio : item.precio)}</div>
      <div>
        <label class="sr-only" for="qty-${item.id}">Cantidad</label>
        <input id="qty-${item.id}" type="number" min="1" value="${item.cantidad}" style="width:70px">
      </div>
      <div>
        <button class="btn secundario" data-remove data-id="${item.id}">Quitar</button>
      </div>
    </div>`; }).join('') +
    `<div class="total"><span>Total:</span> <span>${formatPrecio(getCartTotal())}</span></div>`;

  // Bind events
  qsa('[data-remove]', cont).forEach(b => b.addEventListener('click', () => { removeFromCart(b.dataset.id); renderCarritoSeccion(); }));
  cart.forEach(item => {
    const input = qs(`#qty-${item.id}`, cont);
    if (input) input.addEventListener('change', () => { setQty(item.id, input.value); renderCarritoSeccion(); });
  });
}

// Exponer global
window.getCart = getCart; window.saveCart = saveCart; window.addToCart = addToCart; window.removeFromCart = removeFromCart; window.setQty = setQty; window.getCartTotal = getCartTotal; window.getCartCount = getCartCount; window.bindAddToCartButtons = bindAddToCartButtons; window.renderMiniCart = renderMiniCart; window.renderCarritoSeccion = renderCarritoSeccion;

document.addEventListener('DOMContentLoaded', renderMiniCart);

