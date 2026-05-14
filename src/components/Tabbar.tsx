import { useNavigate, useLocation } from 'react-router-dom'

export default function Tabbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const cart = JSON.parse(localStorage.getItem('descanso-cart') || '{}')
  const cartCount = Object.keys(cart).length

  const tabs = [
    { label: 'Inicio', icon: '⌂', path: '/' },
    { label: 'Servicios', icon: '☰', path: '/catalogo/feretro' },
    { label: 'Mi plan', icon: '◻', path: '/plan', badge: cartCount },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex bg-[#0e0d0b]/95 backdrop-blur border-t border-white/10" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {tabs.map((tab) => {
        const active = location.pathname === tab.path || (tab.path !== '/' && location.pathname.startsWith(tab.path.split('/')[1] ? '/' + tab.path.split('/')[1] : tab.path))
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors relative ${active ? 'text-[#c9a96e]' : 'text-[#a89880]'}`}
          >
            {active && <div className="absolute top-0 left-1/4 right-1/4 h-px bg-[#c9a96e]" />}
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
            {tab.badge && tab.badge > 0 ? (
              <span className="absolute top-2 right-1/4 bg-[#c9a96e] text-[#0e0d0b] text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                {tab.badge}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}