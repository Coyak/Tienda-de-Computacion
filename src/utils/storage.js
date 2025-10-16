export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const loadFromStorage = (key, defaultValue = []) => {
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved) : defaultValue
}