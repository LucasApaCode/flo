import { AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react'
import { Tip } from '../lib/tips.engine'

const config = {
  warning: {
    container: 'bg-amber-50 border-amber-200 shadow-amber-100/60',
    iconBg: 'bg-amber-100',
    iconClass: 'text-amber-600',
    blur: 'bg-amber-300',
    label: 'text-amber-500',
    title: 'text-amber-900',
    message: 'text-amber-700',
    icon: AlertTriangle,
  },
  info: {
    container: 'bg-white border-primary/15 shadow-slate-900/5',
    iconBg: 'bg-primary/10',
    iconClass: 'text-primary',
    blur: 'bg-primary/20',
    label: 'text-primary/60',
    title: 'text-on-surface',
    message: 'text-on-surface-variant',
    icon: Lightbulb,
  },
  success: {
    container: 'bg-emerald-50 border-emerald-200 shadow-emerald-100/60',
    iconBg: 'bg-emerald-100',
    iconClass: 'text-emerald-600',
    blur: 'bg-emerald-300',
    label: 'text-emerald-500',
    title: 'text-emerald-900',
    message: 'text-emerald-700',
    icon: TrendingUp,
  },
}

export function TipCard({ tip }: { tip: Tip }) {
  const { container, iconBg, iconClass, blur, label, title, message, icon: Icon } = config[tip.type]

  return (
    <div className={`relative overflow-hidden flex items-start gap-5 p-6 rounded-xl border shadow-xl ${container}`}>
      {/* Decorative blur */}
      <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none ${blur}`} />

      {/* Icon container */}
      <div className={`flex-shrink-0 p-3 rounded-xl ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconClass}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className={`text-[10px] font-bold tracking-widest uppercase ${label}`}>
          Consejo
        </span>
        <p className={`font-bold text-base mt-0.5 font-headline leading-snug ${title}`}>
          {tip.title}
        </p>
        <p className={`text-sm mt-1 leading-relaxed ${message}`}>
          {tip.message}
        </p>
      </div>
    </div>
  )
}
