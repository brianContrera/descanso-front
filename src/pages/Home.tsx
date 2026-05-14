import { useNavigate } from 'react-router-dom'

const categorias = [
  { nombre: 'Féretro y urnas', icono: '⚰️', count: 12, desde: '$148.000', slug: 'feretro' },
  { nombre: 'Traslado', icono: '🚗', count: 8, desde: '$65.000', slug: 'traslado' },
  { nombre: 'Sala velatoria', icono: '🏛️', count: 6, desde: '$120.000', slug: 'sala' },
  { nombre: 'Flores y coronas', icono: '🌿', count: 15, desde: '$35.000', slug: 'flores' },
  { nombre: 'Cremación', icono: '🕯️', count: 4, desde: '$280.000', slug: 'cremacion' },
  { nombre: 'Trámites', icono: '📄', count: 5, desde: '$25.000', slug: 'tramites' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0e0d0b] text-[#f0e8d8]" style={{ fontFamily: 'DM Sans, sans-serif' }}>

      {/* Topbar */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
          des<span className="text-[#c9a96e]">.</span>canso
        </span>
        <button
          onClick={() => navigate('/plan')}
          className="text-[#a89880] hover:text-[#f0e8d8] transition-colors text-sm"
        >
          Mi plan →
        </button>
      </div>

      {/* Hero */}
      <div className="px-5 pt-4 pb-8 border-b border-white/10">
        <p className="text-xs tracking-widest text-[#7a6340] uppercase mb-4">
          Servicios fúnebres — Buenos Aires
        </p>
        <h1 className="text-4xl font-normal leading-tight mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          Cada despedida<br />
          <em className="text-[#e2c896]">a tu manera</em>
        </h1>
        <div className="w-10 h-px bg-[#7a6340] my-4" />
        <p className="text-sm text-[#a89880] leading-relaxed mb-6 max-w-xs font-light">
          Elegís cada servicio por separado. Sin paquetes cerrados, sin precios ocultos.
        </p>
        <div className="flex items-center gap-2 bg-[#1c1a17] border border-white/10 rounded-xl px-4 py-1">
          <span className="text-[#a89880] text-sm">📍</span>
          <input
            type="text"
            defaultValue="1425"
            placeholder="Código postal..."
            className="flex-1 bg-transparent outline-none text-sm text-[#f0e8d8] placeholder-[#a89880] py-2"
          />
          <button className="bg-[#c9a96e] text-[#0e0d0b] text-sm font-medium px-4 py-2 rounded-lg">
            Buscar
          </button>
        </div>
      </div>

      {/* Categorías */}
      <div className="px-5 pt-5">
        <p className="text-xs tracking-widest text-[#7a6340] uppercase mb-4">Categorías disponibles</p>
        <div className="flex flex-col gap-2">
          {categorias.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => navigate(`/catalogo/${cat.slug}`)}
              className="flex items-center gap-4 px-4 py-4 bg-[#1c1a17] border border-white/10 rounded-xl cursor-pointer hover:border-[#7a6340] transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[#252320] border border-white/10 flex items-center justify-center text-lg flex-shrink-0">
                {cat.icono}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#f0e8d8]">{cat.nombre}</div>
                <div className="text-xs text-[#a89880] mt-0.5">{cat.count} proveedores · desde {cat.desde}</div>
              </div>
              <span className="text-[#7a6340] text-sm">›</span>
            </div>
          ))}
        </div>

        {/* Trust */}
        <div className="mt-4 mb-8 p-4 border border-white/10 rounded-xl bg-[#1c1a17] text-center">
          <p className="text-xs text-[#a89880] leading-relaxed">
            <span className="text-[#c9a96e]">Cada proveedor es verificado in situ.</span><br />
            Visitamos personalmente cada empresa antes de listarla.
          </p>
        </div>
      </div>

    </div>
  )
}