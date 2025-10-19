import '@testing-library/jest-dom'

// Mock localStorage
const localStorageMock = {
  getItem: jasmine.createSpy('getItem'),
  setItem: jasmine.createSpy('setItem'),
  removeItem: jasmine.createSpy('removeItem'),
  clear: jasmine.createSpy('clear')
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock window.confirm
window.confirm = jasmine.createSpy('confirm').and.returnValue(true)

// Mock window.alert
window.alert = jasmine.createSpy('alert')

// Mock console methods to avoid noise in tests
console.error = jasmine.createSpy('console.error')
console.warn = jasmine.createSpy('console.warn')
