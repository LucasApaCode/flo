import { prisma } from "@/lib/db";
import { MonthlyTotal, CategoryTotal, CategoryTrend } from "@/types";

export const statsRepository = {
  async getMonthlyTotals(userId: string, months = 6): Promise<MonthlyTotal[]> {
    const startDate = new Date();
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);
    startDate.setMonth(startDate.getMonth() - (months - 1));

    const result = await prisma.$queryRaw<
      Array<{
        month: string;
        income: unknown;
        expenses: unknown;
      }>
    >`
      SELECT
        TO_CHAR(DATE_TRUNC('month', date), 'YYYY-MM') as month,
        COALESCE(SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END), 0)::float8 as income,
        COALESCE(SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END), 0)::float8 as expenses
      FROM "Transaction"
      WHERE "userId" = ${userId}
        AND date >= ${startDate}
      GROUP BY DATE_TRUNC('month', date)
      ORDER BY DATE_TRUNC('month', date) ASC
    `;

    const dataByMonth = new Map(
      result.map((row) => [
        row.month,
        { income: Number(row.income), expenses: Number(row.expenses) },
      ]),
    );

    return Array.from({ length: months }, (_, i) => {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - (months - 1 - i));
      const month = d.toISOString().slice(0, 7);
      return {
        month,
        ...(dataByMonth.get(month) ?? { income: 0, expenses: 0 }),
      };
    });
  },

  async getCategoryTrends(
    userId: string,
    months = 6,
  ): Promise<CategoryTrend[]> {
    const startDate = new Date();
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);
    startDate.setMonth(startDate.getMonth() - (months - 1));

    const result = await prisma.$queryRaw<
      Array<{
        month: string;
        category: string;
        total: unknown;
      }>
    >`
      SELECT
        TO_CHAR(DATE_TRUNC('month', date), 'YYYY-MM') as month,
        category,
        SUM(amount)::float8 as total
      FROM "Transaction"
      WHERE "userId" = ${userId}
        AND type = 'EXPENSE'
        AND date >= ${startDate}
      GROUP BY DATE_TRUNC('month', date), category
      ORDER BY DATE_TRUNC('month', date) ASC, total DESC
    `;

    return result.map((row) => ({
      month: row.month,
      category: row.category,
      total: Number(row.total),
    }));
  },

  async getAllTimeTotals(
    userId: string,
  ): Promise<{ income: number; expenses: number }> {
    const [incomeResult, expensesResult] = await Promise.all([
      prisma.transaction.aggregate({
        where: { userId, type: "INCOME" },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { userId, type: "EXPENSE" },
        _sum: { amount: true },
      }),
    ]);
    return {
      income: incomeResult._sum.amount?.toNumber() ?? 0,
      expenses: expensesResult._sum.amount?.toNumber() ?? 0,
    };
  },

  async getCategoryTotals(userId: string): Promise<CategoryTotal[]> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const result = await prisma.transaction.groupBy({
      by: ["category"],
      where: {
        userId,
        type: "EXPENSE",
        date: { gte: startOfMonth },
      },
      _sum: { amount: true },
      orderBy: { _sum: { amount: "desc" } },
    });

    return result.map((r) => ({
      category: r.category,
      total: r._sum.amount?.toNumber() ?? 0,
    }));
  },
};
