import Input from '../atoms/Input.jsx'
import Button from '../atoms/Button.jsx'
import { useState } from 'react'

export default function Contacto() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Gracias ${nombre}, te contactaremos pronto.`)
    setNombre(''); setCorreo(''); setMensaje('')
  }

  return (
    <>
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <Input label="Correo" type="email" value={correo} onChange={e => setCorreo(e.target.value)} />
        <Input label="Mensaje" value={mensaje} onChange={e => setMensaje(e.target.value)} />
        <Button label="Enviar" variant="success" type="submit" />
      </form>
    </>
  )
}