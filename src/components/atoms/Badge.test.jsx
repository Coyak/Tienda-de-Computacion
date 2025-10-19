import { render, screen } from '@testing-library/react'
import Badge from './Badge.jsx'

describe('Badge Component', () => {
  test('renders badge with children', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  test('applies default variant class', () => {
    render(<Badge>Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('badge', 'bg-primary')
  })

  test('applies custom variant class', () => {
    render(<Badge variant="danger">Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('badge', 'bg-danger')
  })

  test('applies size class', () => {
    render(<Badge size="lg">Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('fs-5')
  })

  test('applies custom className', () => {
    render(<Badge className="custom-class">Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('custom-class')
  })
})
