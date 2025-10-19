import { createContext, useState, useEffect } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => loadFromStorage('cart', []))

  useEffect(() => {
    saveToStorage('cart', cart)
  }, [cart])

  const addToCart = (product) => {
    if (!product || !product.id) return
    const currentCart = cart || []
    const existing = currentCart.find(p => p.id === product.id)
    if (existing) {
      setCart(currentCart.map(p => p.id === product.id ? { ...p, cantidad: p.cantidad + 1 } : p))
    } else {
      setCart([...currentCart, { ...product, cantidad: 1 }])
    }
  }

  const removeFromCart = (id) => {
    const currentCart = cart || []
    setCart(currentCart.filter(p => p.id !== id))
  }

  const updateQuantity = (id, cantidad) => {
    const currentCart = cart || []
    if (cantidad <= 0) {
      removeFromCart(id)
    } else {
      setCart(currentCart.map(p => p.id === id ? { ...p, cantidad } : p))
    }
  }

  const clearCart = () => setCart([])

  const getCartCount = () => {
    const currentCart = cart || []
    return currentCart.reduce((acc, p) => acc + (p.cantidad || 0), 0)
  }

  const getCartTotal = () => {
    const currentCart = cart || []
    return currentCart.reduce((acc, p) => {
      const descuento = p.descuento || 0
      const precio = p.precio || 0
      const cantidad = p.cantidad || 0
      const precioFinal = precio - (precio * descuento / 100)
      return acc + (precioFinal * cantidad)
    }, 0)
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      getCartCount, 
      getCartTotal 
    }}>
      {children}
    </CartContext.Provider>
  )
}