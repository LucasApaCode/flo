"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CategoryTrend } from "@/types";
import {
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
} from "@/features/stats/lib/category-colors";
import { formatCurrency } from "@/lib/utils";

interface CategoryTrendChartProps {
  trends: CategoryTrend[];
  topCategories: string[];
}

export function CategoryTrendChart({
  trends,
  topCategories,
}: CategoryTrendChartProps) {
  if (trends.length === 0) {
    return (
      <div className="h-[280px] flex items-center justify-center text-muted-foreground">
        Sin categorías registradas
      </div>
    );
  }

  const monthSet = new Set(trends.map((t) => t.month));
  const months = Array.from(monthSet).sort();

  const dataByMonth: Record<string, Record<string, number>> = {};
  for (const month of months) {
    dataByMonth[month] = {};
  }
  for (const trend of trends) {
    dataByMonth[trend.month][trend.category] = trend.total;
  }

  const chartData = months.map((month) => ({
    monthLabel: new Date(month + "-01").toLocaleDateString("es-419", {
      month: "short",
      year: "numeric",
    }),
    ...dataByMonth[month],
  }));

  const categories = topCategories.slice(0, 5);

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="monthLabel"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgb(0 0 0 / 0.06)",
              fontSize: "13px",
            }}
            itemStyle={{ color: "#334155" }}
            labelStyle={{ color: "#64748b", fontWeight: 600, marginBottom: 4 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ color: "#64748b", fontSize: "12px" }}>
                {value}
              </span>
            )}
          />
          {categories.map((category) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              name={category}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
