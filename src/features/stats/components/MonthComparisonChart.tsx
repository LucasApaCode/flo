'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { MonthlyTotal } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface MonthComparisonChartProps {
  current: MonthlyTotal
  previous: MonthlyTotal
}

export function MonthComparisonChart({ current, previous }: MonthComparisonChartProps) {
  const allZero =
    current.income === 0 &&
    current.expenses === 0 &&
    previous.income === 0 &&
    previous.expenses === 0

  if (allZero) {
    return (
      <div className="h-[280px] flex items-center justify-center text-muted-foreground">
        Sin datos para comparar
      </div>
    )
  }

  const data = [
    {
      mes: 'Mes anterior',
      Ingresos: previous.income,
      Gastos: previous.expenses,
    },
    {
      mes: 'Este mes',
      Ingresos: current.income,
      Gastos: current.expenses,
    },
  ]

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart data={data} barCategoryGap="40%" barGap={4} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="mes"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgb(0 0 0 / 0.06)',
              fontSize: '13px',
            }}
            itemStyle={{ color: '#334155' }}
            labelStyle={{ color: '#64748b', fontWeight: 600, marginBottom: 4 }}
            cursor={{ fill: '#f8fafc' }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ color: '#64748b', fontSize: '12px' }}>{value}</span>
            )}
          />
          <Bar dataKey="Ingresos" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Gastos" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
