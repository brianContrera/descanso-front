import { useNavigate } from 'react-router-dom'

export default function Memorial() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0e0d0b] text-[#f0e8d8] pb-24" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <button onClick={() => navigate('/')} className="text-[#a89880] hover:text-[#f0e8d8] transition-colors">
          ← Volver
        </button>
        <span className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
          des<span className="text-[#c9a96e]">.</span>canso
        </span>
        <div className="w-12" />
      </div>

      <div className="px-5 pt-8 pb-6 border-b border-white/10 text-center">
        <div className="text-5xl mb-5 opacity-60">✦</div>
        <p className="text-xs tracking-widest text-[#7a6340] uppercase mb-3">Nuevo servicio</p>
        <h2 className="text-3xl font-normal mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          Memorial digital
        </h2>
        <div className="w-10 h-px bg-[#7a6340] mx-auto mb-4" />
        <p className="text-sm text-[#a89880] leading-relaxed max-w-xs mx-auto">
          Un espacio eterno para recordar. Un código QR en la lápida que abre un perfil con fotos, videos y mensajes de quienes lo quisieron.
        </p>
      </div>

      <div className="px-5 pt-6 flex flex-col gap-4">
        {[
          { icon: '📷', title: 'Galería de recuerdos', desc: 'Fotos y videos de toda una vida en un solo lugar.' },
          { icon: '✍️', title: 'Mensajes de familiares', desc: 'Amigos y familia pueden dejar mensajes desde cualquier parte del mundo.' },
          { icon: '🔒', title: 'Público o privado', desc: 'Vos decidís quién puede ver el perfil.' },
          { icon: '⬡', title: 'QR para la lápida', desc: 'Plaqueta de acero con el código grabado, lista para instalar.' },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 p-4 bg-[#1c1a17] border border-white/10 rounded-xl">
            <div className="text-2xl flex-shrink-0">{item.icon}</div>
            <div>
              <div className="text-sm font-medium text-[#f0e8d8] mb-1">{item.title}</div>
              <div className="text-xs text-[#a89880] leading-relaxed">{item.desc}</div>
            </div>
          </div>
        ))}

        <div className="mt-2 p-4 bg-[#1c1a17] border border-[#7a6340]/40 rounded-xl text-center">
          <p className="text-xs text-[#7a6340] uppercase tracking-widest mb-1">Precio</p>
          <p className="text-2xl font-normal text-[#e2c896] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>$15 USD</p>
          <p className="text-xs text-[#a89880]">Setup único + $5 USD/año para mantenerlo activo</p>
        </div>

        <button className="w-full bg-[#c9a96e] text-[#0e0d0b] py-4 rounded-xl text-sm font-medium tracking-wide mt-2">
          Crear memorial
        </button>
        <p className="text-center text-xs text-[#a89880] pb-4">
          Próximamente disponible — dejá tu email y te avisamos
        </p>
      </div>
    </div>
  )
}