import Label from './Label.jsx'

export default function Input({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder,
  name,
  ...props 
}) {
  return (
    <div className="mb-3">
      {label && <Label required={required}>{label}</Label>}
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        name={name}
        placeholder={placeholder}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        required={required}
        {...props}
      />
      {error && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  )
}