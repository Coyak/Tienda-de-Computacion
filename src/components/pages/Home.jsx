import { getAllProductos } from '../../data/db.js'
import ProductGrid from '../organisms/ProductGrid.jsx'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext.jsx'

export default function Home() {
  const { addToCart } = useContext(CartContext)
  const productos = getAllProductos()

  return (
    <>
      <h1 className="mb-4">Productos destacados</h1>
      <ProductGrid productos={productos} onAdd={addToCart} />
    </>
  )
}