import { useEffect } from 'react'

interface ToastProps {
  message: string
  visible: boolean
  onHide: () => void
}

export default function Toast({ message, visible, onHide }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 2200)
      return () => clearTimeout(timer)
    }
  }, [visible])

  return (
    <div
      className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1c1a17] border border-white/10 text-sm text-[#f0e8d8] transition-all duration-300 whitespace-nowrap ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
      style={{ fontFamily: 'DM Sans, sans-serif' }}
    >
      <span className="w-2 h-2 rounded-full bg-[#c9a96e] flex-shrink-0" />
      {message}
    </div>
  )
}