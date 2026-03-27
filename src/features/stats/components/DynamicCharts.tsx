'use client'

import dynamic from 'next/dynamic'
import { ChartSkeleton } from './ChartSkeleton'

export const DynamicIncomeExpenseChart = dynamic(
  () => import('./IncomeExpenseChart').then((m) => m.IncomeExpenseChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
)

export const DynamicCategoryDonut = dynamic(
  () => import('./CategoryDonut').then((m) => m.CategoryDonut),
  { ssr: false, loading: () => <ChartSkeleton /> }
)

export const DynamicMonthComparisonChart = dynamic(
  () => import('./MonthComparisonChart').then((m) => m.MonthComparisonChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
)

export const DynamicCategoryTrendChart = dynamic(
  () => import('./CategoryTrendChart').then((m) => m.CategoryTrendChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
)

export const DynamicTopCategoriesChart = dynamic(
  () => import('./TopCategoriesChart').then((m) => m.TopCategoriesChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
)
