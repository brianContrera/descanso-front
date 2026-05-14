import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const fmt = (n: number) => '$' + n.toLocaleString('es-AR')

const iconos: Record<string, string> = {
  'Féretro y urnas': '⚰️',
  'Traslado': '🚗',
  'Sala velatoria': '🏛️',
  'Flores y coronas': '🌿',
  'Cremación': '🕯️',
  'Trámites y gestiones': '📄',
}

export default function Plan() {
  const navigate = useNavigate()
  const [cart, setCart] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem('descanso-cart')
    return saved ? JSON.parse(saved) : {}
  })
  const [form, setForm] = useState({ nombre: '', telefono: '' })
  const [formError, setFormError] = useState(false)

  const items = Object.values(cart)
  const subtotal = items.reduce((a, i) => a + i.price, 0)
  const comision = Math.round(subtotal * 0.10)
  const total = subtotal + comision

  const removeItem = (id: string) => {
    const newCart = { ...cart }
    delete newCart[id]
    setCart(newCart)
    localStorage.setItem('descanso-cart', JSON.stringify(newCart))
  }

  const handleConfirmar = () => {
    if (!form.nombre || !form.telefono) {
      setFormError(true)
      return
    }
    navigate('/confirmacion')
  }

  return (
    <div className="min-h-screen bg-[#0e0d0b] text-[#f0e8d8]" style={{ fontFamily: 'DM Sans, sans-serif' }}>

      {/* Topbar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <button onClick={() => navigate('/')} className="text-[#a89880] hover:text-[#f0e8d8] transition-colors">
          ← Volver
        </button>
        <span className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
          des<span className="text-[#c9a96e]">.</span>canso
        </span>
        <div className="w-12" />
      </div>

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/10">
        <p className="text-xs tracking-widest text-[#7a6340] uppercase mb-1">
          {items.length} {items.length === 1 ? 'servicio' : 'servicios'}
        </p>
        <h2 className="text-3xl font-normal" style={{ fontFamily: 'Playfair Display, serif' }}>Mi plan</h2>
        <p className="text-sm text-[#a89880] mt-1">Revisá y confirmá cada servicio seleccionado</p>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center px-8 py-20 pb-24 text-center">
          <div className="text-5xl mb-5 opacity-40">🌙</div>
          <h3 className="text-2xl font-normal mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Tu plan está vacío
          </h3>
          <p className="text-sm text-[#a89880] leading-relaxed mb-6">
            Explorá las categorías y elegí cada servicio por separado según tus necesidades.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#c9a96e] text-[#0e0d0b] px-6 py-3 rounded-xl text-sm font-medium"
          >
            Explorar servicios
          </button>
        </div>
      )}

      {/* Items */}
      {items.length > 0 && (
        <div className="px-5 pt-4 pb-24">
          <div className="flex flex-col divide-y divide-white/10">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-4">
                <div className="w-10 h-10 rounded-xl bg-[#1c1a17] border border-white/10 flex items-center justify-center text-lg flex-shrink-0">
                  {iconos[item.categoria] || '📦'}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#f0e8d8]">{item.name}</div>
                  <div className="text-xs text-[#a89880] mt-0.5">{item.categoria}</div>
                </div>
                <div className="text-lg font-normal text-[#e2c896]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {fmt(item.price)}
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-[#a89880] hover:text-red-400 transition-colors ml-1 text-lg"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-2 py-3 border border-dashed border-[#7a6340] rounded-xl text-sm text-[#7a6340] hover:text-[#c9a96e] hover:border-[#c9a96e] transition-all"
          >
            + Agregar otro servicio
          </button>

          {/* Resumen */}
          <div className="mt-4 bg-[#1c1a17] border border-white/10 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7a6340] to-transparent" />
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-xs text-[#a89880] mb-2">
                <span>{item.name}</span>
                <span>{fmt(item.price)}</span>
              </div>
            ))}
            <div className="flex justify-between text-xs text-[#a89880] mb-2">
              <span>Comisión de servicio (10%)</span>
              <span>{fmt(comision)}</span>
            </div>
            <div className="border-t border-white/10 mt-3 pt-3 flex justify-between items-center">
              <span className="text-sm font-medium">Total</span>
              <span className="text-2xl font-normal text-[#e2c896]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {fmt(total)}
              </span>
            </div>
          </div>

          {/* Formulario */}
          <div className="mt-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Tu nombre completo"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
              className="w-full bg-[#1c1a17] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f0e8d8] placeholder-[#a89880] outline-none focus:border-[#7a6340] transition-colors"
            />
            <input
              type="tel"
              placeholder="Tu teléfono"
              value={form.telefono}
              onChange={e => setForm({ ...form, telefono: e.target.value })}
              className="w-full bg-[#1c1a17] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f0e8d8] placeholder-[#a89880] outline-none focus:border-[#7a6340] transition-colors"
            />
            {formError && (
              <p className="text-xs text-red-400">Completá tu nombre y teléfono para continuar.</p>
            )}
          </div>

          <button
            onClick={handleConfirmar}
            className="w-full mt-4 bg-[#c9a96e] text-[#0e0d0b] py-4 rounded-xl text-sm font-medium tracking-wide"
          >
            Confirmar y pagar
          </button>
          <p className="text-center text-xs text-[#a89880] mt-3 flex items-center justify-center gap-1">
            🔒 Pago seguro vía MercadoPago
          </p>
        </div>
      )}
    </div>
  )
}