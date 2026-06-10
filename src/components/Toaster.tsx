import { Check } from 'lucide-react'
import { useStore } from '../context/StoreContext'

/** Bottom-center toast stack — mirrors MK.toast() output markup. */
export function Toaster() {
  const { toasts } = useStore()
  if (!toasts.length) return null
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <Check strokeWidth={2.4} />
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
