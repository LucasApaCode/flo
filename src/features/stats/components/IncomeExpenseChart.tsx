'use client'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { MonthlyTotal } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface IncomeExpenseChartProps {
  data: MonthlyTotal[]
}

export function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        Sin datos disponibles
      </div>
    )
  }

  const formattedData = data.map((d) => ({
    ...d,
    monthLabel: new Date(d.month + '-01').toLocaleDateString('es-419', {
      month: 'short',
      year: '2-digit',
    }),
  }))

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expensesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="monthLabel"
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
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#incomeGrad)"
            name="Ingresos"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#f43f5e"
            strokeWidth={2}
            fill="url(#expensesGrad)"
            name="Gastos"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
