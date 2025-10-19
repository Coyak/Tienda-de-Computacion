import ProductCard from '../molecules/ProductCard.jsx'

export default function ProductGrid({ productos, onAdd }) {
  return (
    <div className="row">
      {productos.map(producto => (
        <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <ProductCard 
            producto={producto}
            onAdd={onAdd}
          />
        </div>
      ))}
    </div>
  )
}