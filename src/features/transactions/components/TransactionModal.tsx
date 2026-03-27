"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { TransactionForm } from "./TransactionForm";
import { CreateTransactionInput, Transaction } from "../types";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction?: Transaction;
}

export function TransactionModal({
  open,
  onClose,
  transaction,
}: TransactionModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(data: CreateTransactionInput) {
    setIsLoading(true);
    try {
      const url = transaction
        ? `/api/transactions/${transaction.id}`
        : "/api/transactions";
      const method = transaction ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save transaction");
      toast.success(
        transaction ? "Transacción actualizada" : "Transacción creada",
      );
      onClose();
      window.dispatchEvent(new CustomEvent("transaction-saved"));
    } catch {
      toast.error("Ocurrió un error al guardar");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl shadow-on-surface/10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
        <TransactionForm
          onSubmit={handleSubmit}
          defaultValues={transaction}
          isLoading={isLoading}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
