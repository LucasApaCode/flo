import { statsRepository } from "./stats.repository";
import { StatsData, DetailedStatsData } from "@/types";

export const statsService = {
  async getStats(userId: string): Promise<StatsData> {
    const [monthly, categories] = await Promise.all([
      statsRepository.getMonthlyTotals(userId, 6),
      statsRepository.getCategoryTotals(userId),
    ]);
    return { monthly, categories };
  },

  async getAllTimeTotals(userId: string) {
    return statsRepository.getAllTimeTotals(userId);
  },

  async getDetailedStats(userId: string): Promise<DetailedStatsData> {
    const [monthlyTotals, rawTrends, topCategories] = await Promise.all([
      statsRepository.getMonthlyTotals(userId, 2),
      statsRepository.getCategoryTrends(userId, 6),
      statsRepository.getCategoryTotals(userId),
    ]);

    const previous = monthlyTotals[0] ?? { month: "", income: 0, expenses: 0 };
    const current = monthlyTotals[1] ?? { month: "", income: 0, expenses: 0 };

    const top5Names = topCategories.slice(0, 5).map((c) => c.category);
    const categoryTrends = rawTrends.filter((t) =>
      top5Names.includes(t.category),
    );

    return {
      monthComparison: { current, previous },
      categoryTrends,
      topCategories,
    };
  },
};
