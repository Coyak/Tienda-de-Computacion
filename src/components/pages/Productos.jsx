import { getAllProductos } from '../../data/db.js'
import ProductGrid from '../organisms/ProductGrid.jsx'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext.jsx'

export default function Productos() {
  const productos = getAllProductos()
  const { addToCart } = useContext(CartContext)

  return (
    <>
      <h1>Todos los productos</h1>
      <ProductGrid productos={productos} onAdd={addToCart} />
    </>
  )
}