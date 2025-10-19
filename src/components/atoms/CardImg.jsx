export default function CardImg({ 
  src, 
  alt, 
  className = "",
  fallbackIcon = "bi-image",
  onError,
  ...props 
}) {
  const handleError = (e) => {
    e.target.style.display = 'none'
    if (e.target.nextSibling) {
      e.target.nextSibling.style.display = 'flex'
    }
    if (onError) onError(e)
  }

  return (
    <div className="position-relative">
      {src && (
        <img 
          src={src} 
          alt={alt}
          className={`card-img-top ${className}`}
          onError={handleError}
          {...props}
        />
      )}
      <div 
        className="bg-light d-flex align-items-center justify-content-center"
        style={{ 
          display: src ? 'none' : 'flex',
          height: '200px'
        }}
      >
        <i className={`bi ${fallbackIcon} text-muted`} style={{ fontSize: '3rem' }}></i>
      </div>
    </div>
  )
}
