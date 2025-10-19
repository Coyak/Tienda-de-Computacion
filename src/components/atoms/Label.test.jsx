import { render, screen } from '@testing-library/react'
import Label from './Label.jsx'

describe('Label Component', () => {
  test('renders label with children', () => {
    render(<Label>Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  test('applies form-label class', () => {
    render(<Label>Test</Label>)
    const label = screen.getByText('Test')
    expect(label).toHaveClass('form-label')
  })

  test('shows required asterisk when required prop is true', () => {
    render(<Label required={true}>Test</Label>)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  test('does not show asterisk when required is false', () => {
    render(<Label required={false}>Test</Label>)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  test('applies custom className', () => {
    render(<Label className="custom-class">Test</Label>)
    const label = screen.getByText('Test')
    expect(label).toHaveClass('custom-class')
  })
})
