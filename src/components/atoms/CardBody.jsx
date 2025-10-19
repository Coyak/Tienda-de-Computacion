export default function CardBody({ 
  children, 
  className = "",
  ...props 
}) {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  )
}
