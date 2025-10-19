import { render, screen, fireEvent } from '@testing-library/react'
import Input from './Input.jsx'

describe('Input Component', () => {
  test('renders input with label', () => {
    render(<Input label="Test Label" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('displays error message when error prop is provided', () => {
    render(<Input label="Test Label" error="This is an error" />)
    expect(screen.getByText('This is an error')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('is-invalid')
  })

  test('shows required asterisk when required prop is true', () => {
    render(<Input label="Test Label" required={true} />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  test('calls onChange when input value changes', () => {
    const handleChange = jasmine.createSpy('handleChange')
    render(<Input label="Test Label" onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new value' } })
    
    expect(handleChange).toHaveBeenCalled()
  })

  test('displays placeholder when provided', () => {
    render(<Input label="Test Label" placeholder="Enter text here" />)
    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument()
  })

  test('sets input type correctly', () => {
    render(<Input label="Test Label" type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
  })

  test('sets input value correctly', () => {
    render(<Input label="Test Label" value="test value" />)
    expect(screen.getByRole('textbox')).toHaveValue('test value')
  })
})
