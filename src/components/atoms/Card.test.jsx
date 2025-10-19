import { render, screen } from '@testing-library/react'
import Card from './Card.jsx'

describe('Card Component', () => {
  test('renders card with children', () => {
    render(<Card>Test Content</Card>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  test('applies card class', () => {
    render(<Card>Test</Card>)
    const card = screen.getByText('Test')
    expect(card).toHaveClass('card')
  })

  test('applies shadow class by default', () => {
    render(<Card>Test</Card>)
    const card = screen.getByText('Test')
    expect(card).toHaveClass('shadow-sm')
  })

  test('does not apply shadow when shadow is false', () => {
    render(<Card shadow={false}>Test</Card>)
    const card = screen.getByText('Test')
    expect(card).not.toHaveClass('shadow-sm')
  })

  test('applies custom className', () => {
    render(<Card className="custom-class">Test</Card>)
    const card = screen.getByText('Test')
    expect(card).toHaveClass('custom-class')
  })
})
