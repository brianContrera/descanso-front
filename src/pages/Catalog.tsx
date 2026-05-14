import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Toast from '../components/Toast'

const proveedores: Record<string, any[]> = {
  feretro: [
    { id: 'f1', name: 'Ataúdes Del Valle', loc: 'Caballito · 2.1 km', desc: 'Féretro de pino macizo con herrajes dorados. Traslado hasta velatoria incluido.', price: 185000, stars: 4.2, reviews: 38, ver: true },
    { id: 'f2', name: 'Maderas San Martín', loc: 'Flores · 3.8 km', desc: 'Féretro de roble con herrajes plateados. Fabricación propia, alta durabilidad.', price: 220000, stars: 4.9, reviews: 12, ver: true },
    { id: 'f3', name: 'Urnas Palermo', loc: 'Palermo · 1.2 km', desc: 'Opción económica. Féretro de MDF lacado blanco, diseño moderno.', price: 148000, stars: 3.1, reviews: 7, ver: false },
    { id: 'f4', name: 'Casa Rossi Fúnebre', loc: 'Villa Crespo · 2.9 km', desc: 'Féretro de cedro con tapizado interior de seda. Personalización disponible.', price: 310000, stars: 4.7, reviews: 24, ver: true },
  ],
  traslado: [
    { id: 't1', name: 'Cochería El Ángel', loc: 'Balvanera · 1.5 km', desc: 'Furgón moderno. Zona norte y oeste CABA. Disponibilidad 24 hs.', price: 95000, stars: 4.5, reviews: 61, ver: true },
    { id: 't2', name: 'Traslados Rápidos BA', loc: 'San Telmo · 3.1 km', desc: 'Cobertura toda la ciudad. Conductor acompañante incluido.', price: 75000, stars: 4.0, reviews: 29, ver: true },
    { id: 't3', name: 'Fúnebre Belgrano', loc: 'Belgrano · 0.8 km', desc: 'Traslado zona norte. Ruta 8 y Acceso Oeste incluidos.', price: 65000, stars: 3.8, reviews: 15, ver: false },
  ],
  sala: [
    { id: 's1', name: 'Velatorio Central', loc: 'Once · 2.0 km', desc: 'Sala para 80 personas con estacionamiento. Incluye 12 hs de uso.', price: 195000, stars: 4.6, reviews: 43, ver: true },
    { id: 's2', name: 'Jardines del Descanso', loc: 'Palermo · 1.8 km', desc: 'Ambiente jardín íntimo. Ideal para ceremonias de hasta 40 personas.', price: 120000, stars: 4.8, reviews: 19, ver: true },
  ],
  flores: [
    { id: 'fl1', name: 'Florería La Esperanza', loc: 'Villa Urquiza · 2.4 km', desc: 'Corona de flores naturales blancas. Armado el mismo día.', price: 38000, stars: 4.4, reviews: 82, ver: true },
    { id: 'fl2', name: 'Pétalos del Sur', loc: 'Parque Patricios · 3.2 km', desc: 'Arreglo floral grande con rosas y lilies. Entrega en 2 hs.', price: 55000, stars: 4.7, reviews: 34, ver: true },
    { id: 'fl3', name: 'Flores Belgrano', loc: 'Belgrano · 1.1 km', desc: 'Composición clásica en tonos blancos. Jazmines y claveles frescos.', price: 35000, stars: 4.1, reviews: 56, ver: false },
  ],
  cremacion: [
    { id: 'cr1', name: 'Crematorio Norte SA', loc: 'Palermo · 4.0 km', desc: 'Servicio completo. Urna de madera y certificados incluidos.', price: 350000, stars: 4.8, reviews: 28, ver: true },
    { id: 'cr2', name: 'Serenidad Cremaciones', loc: 'Villa Devoto · 6.1 km', desc: 'Servicio individual con acompañamiento familiar. Urna metálica.', price: 280000, stars: 4.3, reviews: 11, ver: true },
  ],
  tramites: [
    { id: 'tr1', name: 'Gestiones Fúnebres BA', loc: 'Centro · 3.5 km', desc: 'Acta de defunción, certificado de inhumación y baja de ANSES.', price: 45000, stars: 4.6, reviews: 37, ver: true },
    { id: 'tr2', name: 'Trámites Express', loc: 'Microcentro · 2.8 km', desc: 'Gestión urgente 24 hs. Trámites municipales y nacionales.', price: 65000, stars: 4.2, reviews: 18, ver: true },
  ],
}

const nombres: Record<string, string> = {
  feretro: 'Féretro y urnas',
  traslado: 'Traslado',
  sala: 'Sala velatoria',
  flores: 'Flores y coronas',
  cremacion: 'Cremación',
  tramites: 'Trámites y gestiones',
}

const fmt = (n: number) => '$' + n.toLocaleString('es-AR')
const stars = (n: number) => '★'.repeat(Math.floor(n)) + '☆'.repeat(5 - Math.floor(n))

export default function Catalog() {
  const { categoria } = useParams()
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState('todos')
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [cart, setCart] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem('descanso-cart')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    setLoading(true)
    setFiltro('todos')
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [categoria])

  const items = proveedores[categoria || ''] || []
  const titulo = nombres[categoria || ''] || 'Servicios'

  const filtros = [
    { label: 'Todos', value: 'todos' },
    { label: 'Mejor precio', value: 'precio' },
    { label: 'Mejor puntuación', value: 'puntuacion' },
    { label: 'Verificados', value: 'verificados' },
  ]

  const itemsFiltrados = [...items].filter(p => {
    if (filtro === 'verificados') return p.ver
    return true
  }).sort((a, b) => {
    if (filtro === 'precio') return a.price - b.price
    if (filtro === 'puntuacion') return b.stars - a.stars
    return 0
  })

  const showToast = (msg: string) => {
    setToast({ visible: true, message: msg })
  }

  const toggleCart = (p: any) => {
    const newCart = { ...cart }
    if (newCart[p.id]) {
      delete newCart[p.id]
      showToast('Servicio eliminado')
    } else {
      newCart[p.id] = { ...p, categoria: titulo }
      showToast('Agregado al plan ✓')
    }
    setCart(newCart)
    localStorage.setItem('descanso-cart', JSON.stringify(newCart))
  }

  const cartCount = Object.keys(cart).length

  return (
    <div className="min-h-screen bg-[#0e0d0b] text-[#f0e8d8] pb-24" style={{ fontFamily: 'DM Sans, sans-serif' }}>

      {/* Topbar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <button onClick={() => navigate('/')} className="text-[#a89880] hover:text-[#f0e8d8] transition-colors">
          ← Volver
        </button>
        <span className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
          des<span className="text-[#c9a96e]">.</span>canso
        </span>
        <button onClick={() => navigate('/plan')} className="text-[#a89880] hover:text-[#f0e8d8] text-sm relative">
          Plan {cartCount > 0 && (
            <span className="ml-1 bg-[#c9a96e] text-[#0e0d0b] text-xs rounded-full px-1.5 py-0.5">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/10">
        <p className="text-xs tracking-widest text-[#7a6340] uppercase mb-2">Categoría</p>
        <h2 className="text-3xl font-normal" style={{ fontFamily: 'Playfair Display, serif' }}>{titulo}</h2>
        <p className="text-sm text-[#a89880] mt-1">{items.length} proveedores en tu zona</p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto px-5 py-4 border-b border-white/10 scrollbar-none">
        {filtros.map(f => (
          <button
            key={f.value}
            onClick={() => setFiltro(f.value)}
            className={`px-4 py-1.5 rounded-full text-xs border whitespace-nowrap transition-all ${
              filtro === f.value
                ? 'bg-[#c9a96e] text-[#0e0d0b] border-[#c9a96e]'
                : 'border-white/10 text-[#a89880] hover:border-[#7a6340]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="px-5 pt-4 flex flex-col gap-3">
        {loading ? (
          <>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#1c1a17] border border-white/10 rounded-2xl h-44 animate-pulse" />
            ))}
          </>
        ) : (
          <>
            {itemsFiltrados.map((p, index) => {
              const inCart = !!cart[p.id]
              return (
                <div
                  key={p.id}
                  className="fade-up bg-[#1c1a17] border border-white/10 rounded-2xl overflow-hidden hover:border-[#7a6340] transition-all"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-[#f0e8d8]">{p.name}</span>
                      <span className="text-xl font-normal text-[#e2c896]" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {fmt(p.price)}
                      </span>
                    </div>
                    <p className="text-xs text-[#a89880] mb-2">📍 {p.loc}</p>
                    <p className="text-xs text-[#a89880] leading-relaxed mb-3">{p.desc}</p>
                    <p className="text-xs text-[#7a6340]">
                      {stars(p.stars)} {p.stars.toFixed(1)}
                      <span className="text-[#a89880]"> ({p.reviews} reseñas)</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-[#141310] border-t border-white/10">
                    <span className={`text-xs px-3 py-1 rounded-full border ${p.ver ? 'text-[#6b8c6a] border-[#6b8c6a]' : 'text-[#a89880] border-white/10'}`}>
                      {p.ver ? '✓ Verificado' : 'Sin verificar'}
                    </span>
                    <button
                      onClick={() => toggleCart(p)}
                      className={`text-xs px-4 py-2 rounded-lg border transition-all ${
                        inCart
                          ? 'bg-[#c9a96e] text-[#0e0d0b] border-[#c9a96e]'
                          : 'border-[#7a6340] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0e0d0b]'
                      }`}
                    >
                      {inCart ? 'Agregado ✓' : '+ Agregar'}
                    </button>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onHide={() => setToast({ ...toast, visible: false })}
      />
    </div>
  )
}