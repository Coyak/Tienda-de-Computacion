export default function Label({ 
  children, 
  required = false, 
  className = "",
  ...props 
}) {
  return (
    <label className={`form-label ${className}`} {...props}>
      {children}
      {required && <span className="text-danger ms-1">*</span>}
    </label>
  )
}
