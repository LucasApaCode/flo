"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createTransactionSchema,
  CreateTransactionInput,
  Transaction,
} from "../types";
import { getCategoriesByType } from "../lib/categories";

interface TransactionFormProps {
  onSubmit: (data: CreateTransactionInput) => Promise<void>;
  defaultValues?: Partial<Transaction>;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function TransactionForm({
  onSubmit,
  defaultValues,
  isLoading,
  onCancel,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: defaultValues?.type ?? "EXPENSE",
      amount: defaultValues?.amount ?? undefined,
      category: defaultValues?.category ?? "",
      date: defaultValues?.date
        ? defaultValues.date.substring(0, 10)
        : new Date().toISOString().substring(0, 10),
      note: defaultValues?.note ?? "",
    },
  });

  const selectedType = watch("type");
  const categories = getCategoriesByType(selectedType);

  useEffect(() => {
    setValue("category", "");
  }, [selectedType, setValue]);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-on-surface font-headline">
          {defaultValues?.id ? "Editar transacción" : "Nueva transacción"}
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Registra tu último ingreso o gasto.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Type toggle */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-on-surface-variant font-medium mb-2">
            Tipo
          </label>
          <div className="flex p-1 bg-surface-container-low rounded-xl">
            <button
              type="button"
              onClick={() => setValue("type", "EXPENSE")}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedType === "EXPENSE"
                  ? "bg-white shadow-sm text-tertiary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Gasto
            </button>
            <button
              type="button"
              onClick={() => setValue("type", "INCOME")}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedType === "INCOME"
                  ? "bg-white shadow-sm text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Ingreso
            </button>
          </div>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-xs uppercase tracking-wider text-on-surface-variant font-medium mb-2"
          >
            Monto
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-on-surface-variant">
              $
            </span>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-10 pr-4 text-3xl font-bold text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
              {...register("amount", { valueAsNumber: true })}
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Category + Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block text-xs uppercase tracking-wider text-on-surface-variant font-medium mb-2"
            >
              Categoría
            </label>
            <Select
              defaultValue={defaultValues?.category ?? ""}
              onValueChange={(val) => setValue("category", val ?? "")}
            >
              <SelectTrigger
                id="category"
                className="bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm w-full focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-xs uppercase tracking-wider text-on-surface-variant font-medium mb-2"
            >
              Fecha
            </label>
            <input
              id="date"
              type="date"
              className="bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm w-full focus:ring-2 focus:ring-primary/20 outline-none"
              {...register("date")}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
        </div>

        {/* Note */}
        <div>
          <label
            htmlFor="note"
            className="block text-xs uppercase tracking-wider text-on-surface-variant font-medium mb-2"
          >
            Descripción <span className="normal-case">(opcional)</span>
          </label>
          <textarea
            id="note"
            placeholder="Agregar una descripción..."
            rows={3}
            className="bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm w-full resize-none focus:ring-2 focus:ring-primary/20 outline-none"
            {...register("note")}
          />
          {errors.note && (
            <p className="text-red-500 text-sm mt-1">{errors.note.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3.5 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="flex-[2] py-3.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all disabled:opacity-60"
          >
            {isLoading ? "Guardando..." : "Guardar transacción"}
          </button>
        </div>
      </form>
    </div>
  );
}
