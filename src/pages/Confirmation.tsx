import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Confirmation() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('descanso-cart')
  }, [])

  return (
    <div className="min-h-screen bg-[#0e0d0b] text-[#f0e8d8] flex flex-col items-center justify-center px-8 text-center pb-24" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="text-6xl mb-6 opacity-60">✦</div>
      <p className="text-xs tracking-widest text-[#7a6340] uppercase mb-3">Plan confirmado</p>
      <h2 className="text-3xl font-normal mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
        Estamos con vos
      </h2>
      <div className="w-10 h-px bg-[#7a6340] mb-6" />
      <p className="text-sm text-[#a89880] leading-relaxed mb-2 max-w-xs">
        Recibimos tu plan. Nos comunicamos en menos de una hora para coordinar cada servicio.
      </p>
      <p className="text-xs text-[#7a6340] mb-10">
        Te enviamos un resumen a tu email.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-[#c9a96e] text-[#0e0d0b] px-8 py-3 rounded-xl text-sm font-medium"
      >
        Volver al inicio
      </button>
    </div>
  )
}