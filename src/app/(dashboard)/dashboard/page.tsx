import { Suspense } from 'react'
import { auth } from '@/features/auth/lib/auth.config'
import { redirect } from 'next/navigation'
import { statsService } from '@/features/stats/lib/stats.service'
import { transactionService } from '@/features/transactions/lib/transaction.service'
import { DynamicIncomeExpenseChart, DynamicCategoryDonut } from '@/features/stats/components/DynamicCharts'
import { ChartSkeleton } from '@/features/stats/components/ChartSkeleton'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  Home, UtensilsCrossed, Car, HeartPulse, Tv, ShoppingBag,
  BookOpen, Zap, Shield, Sparkles, Plane, Tag,
  Briefcase, Laptop, TrendingUp, BarChart2, Building, Gift, RotateCcw, TrendingDown,
} from 'lucide-react'
import Link from 'next/link'
import { generateTip } from '@/features/tips/lib/tips.engine'
import { TipCard } from '@/features/tips/components/TipCard'

const CATEGORY_ICON: Record<string, React.ElementType> = {
  'Vivienda': Home, 'Alimentación': UtensilsCrossed, 'Transporte': Car,
  'Salud': HeartPulse, 'Entretenimiento': Tv, 'Compras': ShoppingBag,
  'Educación': BookOpen, 'Servicios': Zap, 'Seguros': Shield,
  'Cuidado personal': Sparkles, 'Viajes': Plane,
  'Sueldo': Briefcase, 'Freelance': Laptop, 'Negocio': TrendingUp,
  'Inversiones': BarChart2, 'Alquiler': Building, 'Regalo': Gift,
  'Reembolso': RotateCcw, 'Otros': Tag,
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Buenos días'
  if (hour >= 12 && hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

async function DashboardContent() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const [stats, recentResult] = await Promise.all([
    statsService.getStats(session.user.id),
    transactionService.list(session.user.id, 1, 3),
  ])

  const currentMonth = new Date().toISOString().slice(0, 7)
  const currentMonthData = stats.monthly.find((m) => m.month === currentMonth)
  const totalIncome = currentMonthData?.income ?? 0
  const totalExpenses = currentMonthData?.expenses ?? 0
  const netBalance = totalIncome - totalExpenses

  const recentTransactions = recentResult.data
  const tip = generateTip(stats, recentTransactions)

  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Income card */}
        <div className="bg-white p-8 rounded-xl shadow-xl shadow-slate-900/5 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/5 rounded">
              VISTA MENSUAL
            </span>
          </div>
          <p className="text-on-surface-variant font-medium text-sm mb-1">Ingresos totales</p>
          <p
            className="text-4xl font-extrabold text-on-surface tracking-tighter font-headline"
          >
            {formatCurrency(totalIncome)}
          </p>
        </div>

        {/* Expenses card */}
        <div className="bg-surface-container-low p-8 rounded-xl shadow-xl shadow-slate-900/5 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-tertiary/10 rounded-xl text-tertiary">
              <TrendingDown className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-tertiary px-2 py-1 bg-tertiary/5 rounded">
              VISTA MENSUAL
            </span>
          </div>
          <p className="text-on-surface-variant font-medium text-sm mb-1">Gastos totales</p>
          <p
            className="text-4xl font-extrabold text-on-surface tracking-tighter font-headline"
          >
            {formatCurrency(totalExpenses)}
          </p>
        </div>

        {/* Net Balance card */}
        <div className={`relative overflow-hidden p-8 rounded-xl text-white shadow-2xl hover:-translate-y-1 transition-all ${
          netBalance < 0
            ? 'bg-gradient-to-br from-[#a43a3a] to-[#c44f4f]'
            : 'bg-gradient-to-br from-[#4648d4] to-[#6063ee]'
        }`}>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-white/20 rounded-xl">
              {netBalance < 0 ? (
                <TrendingDown className="w-5 h-5 text-white" />
              ) : (
                <TrendingUp className="w-5 h-5 text-white" />
              )}
            </div>
            <span className="text-[10px] font-bold text-white/80 px-2 py-1 bg-white/10 rounded">
              BALANCE NETO
            </span>
          </div>
          <p className="text-white/80 font-medium text-sm mb-1">Balance neto</p>
          <p
            className="text-4xl font-extrabold text-white tracking-tighter font-headline"
          >
            {formatCurrency(netBalance)}
          </p>
        </div>
      </div>

      {/* Tip */}
      <TipCard tip={tip} />

      {/* Charts */}
      <div className="grid grid-cols-12 gap-8 mt-8">
        {/* Area chart */}
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-xl shadow-xl shadow-slate-900/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className="text-lg font-bold text-on-surface font-headline"
              >
                Ingresos vs Gastos
              </h3>
              <p className="text-sm text-on-surface-variant mt-0.5">Rendimiento de los últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block" />
                Ingresos
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] inline-block" />
                Gastos
              </span>
            </div>
          </div>
          <DynamicIncomeExpenseChart data={stats.monthly} />
        </div>

        {/* Donut chart */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-8 rounded-xl shadow-xl shadow-slate-900/5">
          <h3
            className="text-lg font-bold text-on-surface mb-1 font-headline"
          >
            Por categoría
          </h3>
          <p className="text-sm text-on-surface-variant mb-6">Gastos este mes</p>
          <DynamicCategoryDonut data={stats.categories} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="col-span-12 bg-surface-container-low p-10 rounded-xl mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3
              className="text-lg font-bold text-on-surface font-headline"
            >
              Transacciones recientes
            </h3>
            <p className="text-sm text-on-surface-variant mt-0.5">Tu actividad más reciente</p>
          </div>
          <Link
            href="/transactions"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Ver todas →
          </Link>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-bold text-on-surface font-headline text-lg">Todavía no hay movimientos</p>
              <p className="text-on-surface-variant text-sm mt-1">Registra tu primera transacción para empezar a ver tus finanzas.</p>
            </div>
            <Link
              href="/transactions/new"
              className="mt-1 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              + Agregar transacción
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  {(() => {
                    const Icon = CATEGORY_ICON[tx.category] ?? Tag
                    return (
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        tx.type === 'INCOME' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-[#a43a3a]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    )
                  })()}
                  <div>
                    <p className="font-semibold text-on-surface text-sm">{tx.category}</p>
                    <p className="text-xs text-on-surface-variant">{formatDate(tx.date)}</p>
                  </div>
                </div>
                <span
                  className={`font-bold text-sm ${
                    tx.type === 'INCOME' ? 'text-emerald-700' : 'text-[#a43a3a]'
                  }`}
                >
                  {tx.type === 'INCOME' ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="mb-2">
        <p className="text-on-surface-variant text-sm font-medium">{getGreeting()}</p>
        <h2
          className="text-3xl font-extrabold text-on-surface tracking-tight font-headline"
        >
          Panel
        </h2>
      </div>

      <Suspense
        fallback={
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-xl shadow-slate-900/5">
                  <div className="h-4 w-32 bg-surface-container-high animate-pulse rounded mb-4" />
                  <div className="h-10 w-24 bg-surface-container-high animate-pulse rounded" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-xl shadow-xl shadow-slate-900/5">
                <ChartSkeleton />
              </div>
              <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-8 rounded-xl shadow-xl shadow-slate-900/5">
                <ChartSkeleton />
              </div>
            </div>
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </div>
  )
}
