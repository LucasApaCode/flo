'use client'

import { useState } from 'react'
import {
  Edit, Trash2, Check, X as XIcon, ChevronLeft, ChevronRight,
  Home, UtensilsCrossed, Car, HeartPulse, Tv, ShoppingBag,
  BookOpen, Zap, Shield, Sparkles, Plane, Tag,
  Briefcase, Laptop, TrendingUp, BarChart2, Building, Gift, RotateCcw,
} from 'lucide-react'
import { Transaction } from '../types'
import { formatCurrency, formatDate } from '@/lib/utils'

const CATEGORY_ICON: Record<string, React.ElementType> = {
  // Gastos
  'Vivienda': Home,
  'Alimentación': UtensilsCrossed,
  'Transporte': Car,
  'Salud': HeartPulse,
  'Entretenimiento': Tv,
  'Compras': ShoppingBag,
  'Educación': BookOpen,
  'Servicios': Zap,
  'Seguros': Shield,
  'Cuidado personal': Sparkles,
  'Viajes': Plane,
  // Ingresos
  'Sueldo': Briefcase,
  'Freelance': Laptop,
  'Negocio': TrendingUp,
  'Inversiones': BarChart2,
  'Alquiler': Building,
  'Regalo': Gift,
  'Reembolso': RotateCcw,
  // Fallback
  'Otros': Tag,
}

function CategoryIcon({ category, type }: { category: string; type: string }) {
  const Icon = CATEGORY_ICON[category] ?? Tag
  const isIncome = type === 'INCOME'
  return (
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
      isIncome ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-[#a43a3a]'
    }`}>
      <Icon className="w-4 h-4" />
    </div>
  )
}

interface PaginationProps {
  page: number
  totalPages: number
  total: number
  onPrev: () => void
  onNext: () => void
}

interface TransactionListProps {
  transactions: Transaction[]
  onDelete?: (id: string) => void
  onEdit?: (tx: Transaction) => void
  pagination?: PaginationProps
}

export function TransactionList({ transactions, onDelete, onEdit, pagination }: TransactionListProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  function handleDeleteClick(id: string) {
    setConfirmingId(id)
  }

  function handleConfirm(id: string) {
    onDelete?.(id)
    setConfirmingId(null)
  }

  function handleCancel() {
    setConfirmingId(null)
  }

  if (transactions.length === 0) {
    return (
      <div className="py-20 text-center text-on-surface-variant">
        <p className="text-lg font-medium">Sin transacciones aún.</p>
        <p className="text-sm mt-1">Agrega la primera.</p>
      </div>
    )
  }

  return (
    <>
      {/* Mobile: card list */}
      <div className="space-y-3 md:hidden">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-surface-container-lowest rounded-xl p-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <CategoryIcon category={tx.category} type={tx.type} />
              <div className="min-w-0">
                <p className="font-bold text-on-surface text-sm truncate">{tx.category}</p>
                <p className="text-xs text-on-surface-variant">{formatDate(tx.date)}</p>
                {tx.note && (
                  <p className="text-xs text-on-surface-variant truncate">{tx.note}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 ml-3 flex-shrink-0">
              <span className={`font-bold text-sm ${tx.type === 'INCOME' ? 'text-emerald-700' : 'text-[#a43a3a]'}`}>
                {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit?.(tx)}
                  className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                {onDelete && (
                  confirmingId === tx.id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleConfirm(tx.id)}
                        className="p-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-1.5 rounded-lg text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-colors"
                      >
                        <XIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDeleteClick(tx.id)}
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-[#a43a3a] hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block bg-surface-container-low rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container text-on-surface-variant uppercase text-xs font-bold tracking-widest">
              <th className="px-8 py-5">Tipo</th>
              <th className="px-6 py-5">Fecha</th>
              <th className="px-6 py-5">Descripción</th>
              <th className="px-6 py-5">Categoría</th>
              <th className="px-6 py-5 text-right">Monto</th>
              <th className="px-8 py-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr
                key={tx.id}
                className={`${
                  i % 2 === 1 ? 'bg-surface/30' : ''
                } hover:bg-white transition-colors cursor-pointer`}
              >
                <td className="px-8 py-5">
                  <CategoryIcon category={tx.category} type={tx.type} />
                </td>
                <td className="px-6 py-5 text-sm font-medium text-on-surface-variant whitespace-nowrap">
                  {formatDate(tx.date)}
                </td>
                <td className="px-6 py-5">
                  {tx.note ? (
                    <span className="block text-sm text-on-surface">{tx.note}</span>
                  ) : (
                    <span className="block text-sm text-on-surface-variant italic">Sin descripción</span>
                  )}
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-semibold">
                    {tx.category}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className={`font-bold text-base ${tx.type === 'INCOME' ? 'text-emerald-700' : 'text-[#a43a3a]'}`}>
                    {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(tx)}
                      className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {onDelete && (
                      confirmingId === tx.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleConfirm(tx.id)}
                            className="p-2 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-2 rounded-lg text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-colors"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDeleteClick(tx.id)}
                          className="p-2 rounded-lg text-on-surface-variant hover:text-[#a43a3a] hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {pagination && pagination.totalPages > 1 && (
            <tfoot>
              <tr>
                <td colSpan={6} className="px-8 py-4 border-t border-slate-200/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant">{pagination.total} transacciones en total</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={pagination.onPrev}
                        disabled={pagination.page === 1}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-semibold text-on-surface tabular-nums">
                        {pagination.page} / {pagination.totalPages}
                      </span>
                      <button
                        onClick={pagination.onNext}
                        disabled={pagination.page === pagination.totalPages}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Mobile: pagination footer */}
      {pagination && pagination.totalPages > 1 && (
        <div className="md:hidden flex items-center justify-between bg-surface-container-low rounded-xl px-5 py-3 shadow-sm">
          <span className="text-xs text-on-surface-variant">{pagination.total} en total</span>
          <div className="flex items-center gap-3">
            <button
              onClick={pagination.onPrev}
              disabled={pagination.page === 1}
              className="p-1.5 rounded-lg text-on-surface-variant hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-on-surface tabular-nums">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={pagination.onNext}
              disabled={pagination.page === pagination.totalPages}
              className="p-1.5 rounded-lg text-on-surface-variant hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
