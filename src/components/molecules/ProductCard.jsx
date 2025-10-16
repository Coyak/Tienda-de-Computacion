import Button from '../atoms/Button.jsx'

export default function ProductCard({ producto, onAdd }) {
  return (
    <div className="card p-2 shadow-sm" style={{ width: '18rem' }}>
      <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">${producto.precio.toLocaleString()}</p>
        <Button label="Agregar al carrito" onClick={() => onAdd(producto)} />
      </div>
    </div>
  )
}