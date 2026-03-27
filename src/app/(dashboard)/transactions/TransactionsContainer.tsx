"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { TransactionList } from "@/features/transactions/components/TransactionList";
import { TransactionListSkeleton } from "@/features/transactions/components/TransactionListSkeleton";
import { TransactionModal } from "@/features/transactions/components/TransactionModal";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import { Transaction } from "@/features/transactions/types";

export function TransactionsContainer() {
  const {
    transactions,
    isLoading,
    deleteTransaction,
    mutate,
    page,
    setPage,
    totalPages,
    total,
  } = useTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | undefined>(
    undefined,
  );

  useEffect(() => {
    function onSaved() {
      mutate();
    }
    window.addEventListener("transaction-saved", onSaved);
    return () => window.removeEventListener("transaction-saved", onSaved);
  }, [mutate]);

  function openNew() {
    setEditingTx(undefined);
    setModalOpen(true);
  }

  function openEdit(tx: Transaction) {
    setEditingTx(tx);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTx(undefined);
  }

  return (
    <>
      {/* Desktop header button */}
      <div className="hidden md:flex justify-end">
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          Nueva transacción
        </button>
      </div>

      {/* FAB (mobile) */}
      <button
        onClick={openNew}
        className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
        aria-label="Nueva transacción"
      >
        <Plus className="w-6 h-6" />
      </button>

      {isLoading ? (
        <TransactionListSkeleton />
      ) : (
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
          onEdit={openEdit}
          pagination={{
            page,
            totalPages,
            total,
            onPrev: () => setPage((p) => p - 1),
            onNext: () => setPage((p) => p + 1),
          }}
        />
      )}

      <TransactionModal
        open={modalOpen}
        onClose={closeModal}
        transaction={editingTx}
      />
    </>
  );
}
