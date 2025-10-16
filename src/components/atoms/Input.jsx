export default function Input({ label, type = "text", value, onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input type={type} value={value} onChange={onChange} className="form-control" />
    </div>
  )
}