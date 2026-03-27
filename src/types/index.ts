export interface MonthlyTotal {
  month: string;
  income: number;
  expenses: number;
}

export interface CategoryTotal {
  category: string;
  total: number;
}

export interface StatsData {
  monthly: MonthlyTotal[];
  categories: CategoryTotal[];
}

export interface CategoryTrend {
  month: string;
  category: string;
  total: number;
}

export interface MonthComparison {
  current: MonthlyTotal;
  previous: MonthlyTotal;
}

export interface DetailedStatsData {
  monthComparison: MonthComparison;
  categoryTrends: CategoryTrend[];
  topCategories: CategoryTotal[];
}

export type ApiResult<T> =
  | { data: T }
  | { error: { message: string; code?: string } };
