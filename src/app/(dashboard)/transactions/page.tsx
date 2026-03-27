import { redirect } from 'next/navigation'
import { auth } from '@/features/auth/lib/auth.config'
import { statsService } from '@/features/stats/lib/stats.service'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { TransactionsContainer } from './TransactionsContainer'

export default async function TransactionsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { income, expenses } = await statsService.getAllTimeTotals(session.user.id)
  const net = income - expenses

  return (
    <div className="p-8 space-y-8">
      <div>
        <p className="text-on-surface-variant text-sm font-medium">Administra tu dinero</p>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight font-headline">
          Transacciones
        </h2>
      </div>

      {/* Totales globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-xl shadow-slate-900/5 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/5 rounded">
              TOTAL HISTÓRICO
            </span>
          </div>
          <p className="text-on-surface-variant font-medium text-sm mb-1">Ingresos totales</p>
          <p className="text-4xl font-extrabold text-on-surface tracking-tighter font-headline">
            {formatCurrency(income)}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-xl shadow-slate-900/5 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-tertiary/10 rounded-xl text-tertiary">
              <TrendingDown className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-tertiary px-2 py-1 bg-tertiary/5 rounded">
              TOTAL HISTÓRICO
            </span>
          </div>
          <p className="text-on-surface-variant font-medium text-sm mb-1">Gastos totales</p>
          <p className="text-4xl font-extrabold text-on-surface tracking-tighter font-headline">
            {formatCurrency(expenses)}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-xl shadow-slate-900/5 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-xl" style={{ background: '#4648d41a', color: '#4648d4' }}>
              {net < 0
                ? <TrendingDown className="w-5 h-5" />
                : <TrendingUp className="w-5 h-5" />
              }
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded" style={{ color: '#4648d4', background: '#4648d40d' }}>
              BALANCE NETO
            </span>
          </div>
          <p className="text-on-surface-variant font-medium text-sm mb-1">Balance neto</p>
          <p className="text-4xl font-extrabold text-on-surface tracking-tighter font-headline">
            {formatCurrency(net)}
          </p>
        </div>
      </div>

      <TransactionsContainer />
    </div>
  )
}
