export const EXPENSE_CATEGORIES = [
  'Vivienda', 'Alimentación', 'Transporte', 'Salud',
  'Entretenimiento', 'Compras', 'Educación', 'Servicios',
  'Seguros', 'Cuidado personal', 'Viajes', 'Otros'
]

export const INCOME_CATEGORIES = [
  'Sueldo', 'Freelance', 'Negocio', 'Inversiones',
  'Alquiler', 'Regalo', 'Reembolso', 'Otros'
]

export function getCategoriesByType(type: 'INCOME' | 'EXPENSE'): string[] {
  return type === 'INCOME' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
}
