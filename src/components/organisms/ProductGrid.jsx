import ProductCard from '../molecules/ProductCard.jsx'

export default function ProductGrid({ productos, onAdd }) {
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {productos.map(p => <ProductCard key={p.id} producto={p} onAdd={onAdd} />)}
    </div>
  )
}