import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from './ProductCard.jsx'

// Mock del contexto de carrito
const mockOnAddToCart = jasmine.createSpy('onAddToCart')

const mockProduct = {
  id: 1,
  nombre: 'Test Product',
  precio: 100000,
  stock: 10,
  categoria: 'Test Category',
  imagen: '/test-image.jpg',
  descuento: 10
}

describe('ProductCard Component', () => {
  beforeEach(() => {
    mockOnAddToCart.calls.reset()
  })

  test('renders product information correctly', () => {
    render(<ProductCard producto={mockProduct} onAddToCart={mockOnAddToCart} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$100.000')).toBeInTheDocument()
    expect(screen.getByText('Test Category')).toBeInTheDocument()
    expect(screen.getByText('Stock: 10')).toBeInTheDocument()
  })

  test('displays discount badge when product has discount', () => {
    render(<ProductCard producto={mockProduct} onAddToCart={mockOnAddToCart} />)
    expect(screen.getByText('-10%')).toBeInTheDocument()
  })

  test('does not display discount badge when product has no discount', () => {
    const productWithoutDiscount = { ...mockProduct, descuento: 0 }
    render(<ProductCard producto={productWithoutDiscount} onAddToCart={mockOnAddToCart} />)
    expect(screen.queryByText('-0%')).not.toBeInTheDocument()
  })

  test('calls onAddToCart when add to cart button is clicked', () => {
    render(<ProductCard producto={mockProduct} onAddToCart={mockOnAddToCart} />)
    
    const addButton = screen.getByText('Agregar al Carrito')
    fireEvent.click(addButton)
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  test('displays product image when available', () => {
    render(<ProductCard producto={mockProduct} onAddToCart={mockOnAddToCart} />)
    
    const image = screen.getByAltText('Test Product')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  test('shows stock status correctly', () => {
    render(<ProductCard producto={mockProduct} onAddToCart={mockOnAddToCart} />)
    expect(screen.getByText('Stock: 10')).toBeInTheDocument()
  })

  test('displays out of stock message when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 }
    render(<ProductCard producto={outOfStockProduct} onAddToCart={mockOnAddToCart} />)
    
    expect(screen.getByText('Sin Stock')).toBeInTheDocument()
    expect(screen.queryByText('Agregar al Carrito')).not.toBeInTheDocument()
  })
})
