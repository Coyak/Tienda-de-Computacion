export default function Card({ 
  children, 
  className = "",
  shadow = true,
  ...props 
}) {
  const shadowClass = shadow ? "shadow-sm" : ""
  
  return (
    <div className={`card ${shadowClass} ${className}`} {...props}>
      {children}
    </div>
  )
}
