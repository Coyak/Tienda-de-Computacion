// Validaciones y helpers

function esCorreoValidoDominio(email, dominiosPermitidos) {
  if (!email) return false;
  if (email.length > 100) return false;
  const tieneArroba = email.includes('@');
  if (!tieneArroba) return false;
  return dominiosPermitidos.some(d => email.toLowerCase().endsWith(d));
}

function esLargoEntre(valor, min, max) {
  if (typeof valor !== 'string') valor = String(valor || '');
  const l = valor.length;
  return l >= min && l <= max;
}

function maxLongitud(valor, max) {
  if (!valor) return null;
  return valor.length <= max ? null : `Máximo ${max} caracteres`;
}

function esEnteroNoNegativo(valor) {
  if (valor === '' || valor === null || valor === undefined) return false;
  const n = Number(valor);
  return Number.isInteger(n) && n >= 0;
}

function esDecimalNoNegativo(valor) {
  if (valor === '' || valor === null || valor === undefined) return false;
  const n = Number(valor);
  return Number.isFinite(n) && n >= 0;
}

// Validación RUT chileno (RUN sin puntos ni guion, con DV en último char)
function validarRUT(run) {
  if (!run) return false;
  const limpio = run.toString().trim().toUpperCase().replace(/\s+/g, '');
  if (limpio.length < 7 || limpio.length > 9) return false;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return false;
  let suma = 0; let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - (suma % 11);
  let dvEsperado = '';
  if (resto === 11) dvEsperado = '0';
  else if (resto === 10) dvEsperado = 'K';
  else dvEsperado = String(resto);
  return dvEsperado === dv;
}

function limpiarErrores(form) {
  qsa('.error', form).forEach(e => e.textContent = '');
}

function anexarErrores(form, mapaErrores) {
  // mapaErrores: { campo: 'mensaje' | null }
  Object.entries(mapaErrores).forEach(([campo, msg]) => {
    const input = form.elements[campo];
    if (!input) return;
    const wrap = input.closest('.form-field');
    const err = wrap ? wrap.querySelector('.error') : null;
    if (err) err.textContent = msg || '';
  });
}

function wireValidaciones(formSelector, reglasPorCampo, onValidSubmit) {
  const form = typeof formSelector === 'string' ? qs(formSelector) : formSelector;
  if (!form) return;
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = formToObject(form);
    const errores = {};
    Object.entries(reglasPorCampo || {}).forEach(([campo, reglas]) => {
      const valor = (data[campo] ?? '').toString().trim();
      const mensajes = (reglas || []).map(fn => fn(valor)).filter(Boolean);
      errores[campo] = mensajes[0] || null;
    });
    limpiarErrores(form);
    anexarErrores(form, errores);
    const hayErrores = Object.values(errores).some(Boolean);
    if (!hayErrores) {
      onValidSubmit && onValidSubmit(data, form);
      form.reset?.();
    }
  });
}

// Regla builders
function reglasProducto() {
  return {
    codigo: [v => v && v.length >= 3 ? null : 'Mínimo 3 caracteres'],
    nombre: [v => !v ? 'Requerido' : maxLongitud(v, 100)],
    descripcion: [v => !v ? null : maxLongitud(v, 500)],
    precio: [v => esDecimalNoNegativo(v) ? null : 'Debe ser decimal >= 0'],
    stock: [v => esEnteroNoNegativo(v) ? null : 'Debe ser entero >= 0'],
    stockCritico: [v => !v ? null : (esEnteroNoNegativo(v) ? null : 'Debe ser entero >= 0')],
    categoria: [v => v ? null : 'Seleccione categoría']
  };
}

function reglasUsuario() {
  return {
    run: [v => (v && v.length >= 7 && v.length <= 9) ? null : 'Largo 7 a 9', v => validarRUT(v) ? null : 'RUN inválido'],
    nombre: [v => !v ? 'Requerido' : maxLongitud(v, 50)],
    apellidos: [v => !v ? 'Requerido' : maxLongitud(v, 100)],
    correo: [v => !v ? 'Requerido' : maxLongitud(v, 100), v => esCorreoValidoDominio(v, DOMINIOS_PERMITIDOS) ? null : 'Dominio no permitido'],
    tipoUsuario: [v => v ? null : 'Seleccione tipo'],
    region: [v => v ? null : 'Seleccione región'],
    comuna: [v => v ? null : 'Seleccione comuna'],
    direccion: [v => !v ? 'Requerido' : maxLongitud(v, 300)]
  };
}

// Exponer
window.esCorreoValidoDominio = esCorreoValidoDominio;
window.esLargoEntre = esLargoEntre;
window.maxLongitud = maxLongitud;
window.esEnteroNoNegativo = esEnteroNoNegativo;
window.esDecimalNoNegativo = esDecimalNoNegativo;
window.validarRUT = validarRUT;
window.anexarErrores = anexarErrores;
window.wireValidaciones = wireValidaciones;
window.reglasProducto = reglasProducto;
window.reglasUsuario = reglasUsuario;

// Autowire validaciones para formularios públicos
document.addEventListener('DOMContentLoaded', function(){
  // Login
  const fLogin = qs('#form-login');
  if (fLogin) {
    wireValidaciones(fLogin, {
      correo: [v => maxLongitud(v, 100), v => esCorreoValidoDominio(v, DOMINIOS_PERMITIDOS) ? null : 'Dominio no permitido'],
      password: [v => esLargoEntre(v, 4, 10) ? null : 'Entre 4 y 10 caracteres']
    }, (data) => {
      alert('Login simulado. Acceso concedido.');
      if (data.correo.endsWith('@profesor.duoc.cl')) localStorage.setItem('tipoUsuario', 'Administrador');
      else if (data.correo.endsWith('@duoc.cl')) localStorage.setItem('tipoUsuario', 'Vendedor');
      else localStorage.setItem('tipoUsuario', 'Cliente');
    });
  }

  // Contacto
  const fContacto = qs('#form-contacto');
  if (fContacto) {
    wireValidaciones(fContacto, {
      nombre: [v => !v ? 'Nombre requerido' : maxLongitud(v, 100)],
      correo: [v => !v ? null : maxLongitud(v, 100), v => !v ? null : (esCorreoValidoDominio(v, DOMINIOS_PERMITIDOS) ? null : 'Dominio no permitido')],
      comentario: [v => !v ? 'Comentario requerido' : maxLongitud(v, 500)]
    }, () => alert('Mensaje enviado (simulado). ¡Gracias por contactarnos!'));
  }

  // Registro
  const fRegistro = qs('#form-registro');
  if (fRegistro) {
    wireValidaciones(fRegistro, {
      nombre: [v => !v ? 'Nombre requerido' : maxLongitud(v, 100)],
      correo: [v => maxLongitud(v, 100), v => esCorreoValidoDominio(v, DOMINIOS_PERMITIDOS) ? null : 'Dominio no permitido'],
      password: [v => esLargoEntre(v, 4, 10) ? null : 'Entre 4 y 10 caracteres'],
      password2: [v => v === qs('#r-pass').value ? null : 'Las contraseñas no coinciden']
    }, () => alert('Registro simulado correcto. Puedes iniciar sesión.'));
  }
});
