import { render, screen, fireEvent, act } from '@testing-library/react'
import { CartProvider } from './CartContext.jsx'

// Mock component to test CartContext
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, clearCart, getCartCount, getCartTotal } = useContext(CartContext)
  
  return (
    <div>
      <div data-testid="cart-count">{getCartCount()}</div>
      <div data-testid="cart-total">{getCartTotal()}</div>
      <div data-testid="cart-items">{cart.length}</div>
      <button onClick={() => addToCart({ id: 1, nombre: 'Test Product', precio: 1000 })}>
        Add Product
      </button>
      <button onClick={() => removeFromCart(1)}>
        Remove Product
      </button>
      <button onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  )
}

describe('CartContext', () => {
  test('provides initial empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0')
    expect(screen.getByTestId('cart-items')).toHaveTextContent('0')
  })

  test('adds product to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Product')
    fireEvent.click(addButton)
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('1000')
    expect(screen.getByTestId('cart-items')).toHaveTextContent('1')
  })

  test('increments quantity when adding same product twice', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Product')
    fireEvent.click(addButton)
    fireEvent.click(addButton)
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('2000')
    expect(screen.getByTestId('cart-items')).toHaveTextContent('1')
  })

  test('removes product from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Product')
    const removeButton = screen.getByText('Remove Product')
    
    fireEvent.click(addButton)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    
    fireEvent.click(removeButton)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0')
  })

  test('clears entire cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Product')
    const clearButton = screen.getByText('Clear Cart')
    
    fireEvent.click(addButton)
    fireEvent.click(addButton)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
    
    fireEvent.click(clearButton)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0')
  })

  test('persists cart data in localStorage', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Product')
    fireEvent.click(addButton)
    
    // Check that data is in localStorage
    const cartData = localStorage.getItem('tienda_cart')
    expect(cartData).toBeDefined()
    
    const parsedCart = JSON.parse(cartData)
    expect(parsedCart).toHaveLength(1)
    expect(parsedCart[0].id).toBe(1)
  })
})
