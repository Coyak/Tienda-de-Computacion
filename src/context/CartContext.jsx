import { createContext, useState, useEffect } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => loadFromStorage('cart'))

  useEffect(() => {
    saveToStorage('cart', cart)
  }, [cart])

  const addToCart = (product) => {
    const existing = cart.find(p => p.id === product.id)
    if (existing) {
      setCart(cart.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const removeFromCart = (id) => setCart(cart.filter(p => p.id !== id))

  const getCartCount = () => cart.reduce((acc, p) => acc + p.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  )
}