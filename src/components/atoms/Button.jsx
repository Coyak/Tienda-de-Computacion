export default function Button({ label, onClick, variant = "primary", type = "button" }) {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  )
}