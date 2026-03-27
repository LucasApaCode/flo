import { StatsData } from "@/types";
import { Transaction } from "@/features/transactions/types";

export interface Tip {
  type: "warning" | "info" | "success";
  title: string;
  message: string;
}

function daysSince(isoDate: string): number {
  return (Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24);
}

export function generateTip(
  stats: StatsData,
  recentTransactions: Transaction[],
): Tip {
  const { monthly, categories } = stats;
  const current = monthly[monthly.length - 1] ?? { income: 0, expenses: 0 };
  const prev = monthly[monthly.length - 2] ?? { income: 0, expenses: 0 };

  if (current.income > 0 && current.expenses > current.income) {
    return {
      type: "warning",
      title: "Tus gastos superan tus ingresos",
      message:
        "Este mes gastaste más de lo que ingresaste. Revisa tus gastos para volver al equilibrio.",
    };
  }

  if (
    monthly.length >= 2 &&
    prev.expenses > 0 &&
    current.expenses > prev.expenses * 1.2
  ) {
    const pct = Math.round(
      ((current.expenses - prev.expenses) / prev.expenses) * 100,
    );
    return {
      type: "warning",
      title: "Tus gastos subieron este mes",
      message: `Gastaste un ${pct}% más que el mes pasado. ¿Fue un gasto puntual o una tendencia?`,
    };
  }

  if (categories.length > 0) {
    const total = categories.reduce((sum, c) => sum + c.total, 0);
    if (total > 0 && categories[0].total / total > 0.5) {
      const pct = Math.round((categories[0].total / total) * 100);
      return {
        type: "info",
        title: `${categories[0].category} concentra la mayoría de tus gastos`,
        message: `El ${pct}% de tus gastos este mes son de ${categories[0].category}. ¿Es lo que esperabas?`,
      };
    }
  }

  if (
    recentTransactions.length === 0 ||
    daysSince(recentTransactions[0].date) > 7
  ) {
    return {
      type: "info",
      title: "No registraste movimientos recientes",
      message:
        "Llevas más de 7 días sin cargar transacciones. Mantener el registro al día te da una imagen más precisa de tus finanzas.",
    };
  }

  if (
    monthly.length >= 3 &&
    monthly.slice(-3).every((m) => m.income > 0 && m.income > m.expenses)
  ) {
    return {
      type: "success",
      title: "¡Llevas 3 meses consecutivos ahorrando!",
      message:
        "Tus ingresos superaron tus gastos los últimos 3 meses. Estás construyendo un gran hábito financiero.",
    };
  }

  return {
    type: "info",
    title: "Tip financiero",
    message:
      "Registrar tus gastos regularmente es el primer paso para mejorar tus finanzas. ¡Sigue así!",
  };
}
