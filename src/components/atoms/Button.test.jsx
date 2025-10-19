import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button.jsx'

describe('Button Component', () => {
  test('renders button with label', () => {
    render(<Button label="Click me" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('applies correct variant class', () => {
    render(<Button label="Primary Button" variant="primary" />)
    expect(screen.getByRole('button')).toHaveClass('btn-primary')
  })

  test('applies default variant when not specified', () => {
    render(<Button label="Default Button" />)
    expect(screen.getByRole('button')).toHaveClass('btn-secondary')
  })

  test('calls onClick when button is clicked', () => {
    const handleClick = jasmine.createSpy('handleClick')
    render(<Button label="Click me" onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalled()
  })

  test('sets button type correctly', () => {
    render(<Button label="Submit" type="submit" />)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  test('disables button when disabled prop is true', () => {
    render(<Button label="Disabled" disabled={true} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('does not call onClick when button is disabled', () => {
    const handleClick = jasmine.createSpy('handleClick')
    render(<Button label="Disabled" onClick={handleClick} disabled={true} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })
})
