import { Suspense } from 'react'
import { auth } from '@/features/auth/lib/auth.config'
import { redirect } from 'next/navigation'
import { statsService } from '@/features/stats/lib/stats.service'
import {
  DynamicMonthComparisonChart,
  DynamicCategoryTrendChart,
  DynamicTopCategoriesChart,
} from '@/features/stats/components/DynamicCharts'
import { StatsSkeleton } from '@/features/stats/components/ChartSkeleton'

async function StatsContent() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const stats = await statsService.getDetailedStats(session.user.id)
  const topCategoryNames = stats.topCategories.slice(0, 5).map((c) => c.category)

  return (
    <>
      {/* Month Comparison — full width */}
      <div className="bg-white p-8 rounded-xl shadow-xl shadow-slate-900/5">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-on-surface font-headline">
            Comparación mensual
          </h3>
          <p className="text-sm text-on-surface-variant mt-0.5">
            Este mes vs el mes anterior
          </p>
        </div>
        <DynamicMonthComparisonChart
          current={stats.monthComparison.current}
          previous={stats.monthComparison.previous}
        />
      </div>

      {/* Trend + Top Categories — two columns */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7 bg-white p-8 rounded-xl shadow-xl shadow-slate-900/5">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-on-surface font-headline">
              Tendencia por categoría
            </h3>
            <p className="text-sm text-on-surface-variant mt-0.5">
              Top 5 categorías — últimos 6 meses
            </p>
          </div>
          <DynamicCategoryTrendChart
            trends={stats.categoryTrends}
            topCategories={topCategoryNames}
          />
        </div>

        <div className="col-span-12 lg:col-span-5 bg-surface-container-low p-8 rounded-xl shadow-xl shadow-slate-900/5">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-on-surface font-headline">
              Top categorías
            </h3>
            <p className="text-sm text-on-surface-variant mt-0.5">Gastos este mes</p>
          </div>
          <DynamicTopCategoriesChart data={stats.topCategories} />
        </div>
      </div>
    </>
  )
}

export default function StatsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="mb-2">
        <p className="text-on-surface-variant text-sm font-medium">Vista general</p>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight font-headline">
          Estadísticas
        </h2>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsContent />
      </Suspense>
    </div>
  )
}
