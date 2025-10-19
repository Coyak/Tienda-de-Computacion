export default function Badge({ 
  children, 
  variant = "primary", 
  size = "md",
  className = "",
  ...props 
}) {
  const sizeClasses = {
    sm: "fs-6",
    md: "fs-6", 
    lg: "fs-5"
  }

  return (
    <span 
      className={`badge bg-${variant} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
