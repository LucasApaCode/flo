'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
  ResponsiveContainer,
} from 'recharts'
import { CategoryTotal } from '@/types'
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '@/features/stats/lib/category-colors'
import { formatCurrency } from '@/lib/utils'

interface TopCategoriesChartProps {
  data: CategoryTotal[]
}

export function TopCategoriesChart({ data }: TopCategoriesChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-[280px] flex items-center justify-center text-muted-foreground">
        Sin gastos este mes
      </div>
    )
  }

  const sorted = [...data].sort((a, b) => b.total - a.total)
  const sum = sorted.reduce((acc, c) => acc + c.total, 0)

  const chartData = sorted.map((c) => ({
    ...c,
    pct: sum > 0 ? ((c.total / sum) * 100).toFixed(1) + '%' : '0.0%',
  }))

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 4, right: 48, left: 0, bottom: 4 }}
          barCategoryGap="25%"
        >
          <CartesianGrid stroke="#f1f5f9" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="category"
            width={90}
            tick={{ fill: '#475569', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
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
          <Bar dataKey="total" name="Total" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CATEGORY_COLORS[entry.category] ?? DEFAULT_CATEGORY_COLOR}
              />
            ))}
            <LabelList
              dataKey="pct"
              position="right"
              style={{ fontSize: '11px', fill: '#94a3b8', fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
