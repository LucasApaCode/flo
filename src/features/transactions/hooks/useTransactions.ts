"use client";

import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { Transaction } from "../types";

const LIMIT = 7;

interface PaginatedResponse {
  data: Transaction[];
  total: number;
  page: number;
  totalPages: number;
}

const fetcher = (url: string): Promise<PaginatedResponse> =>
  fetch(url).then((res) => res.json());

export function useTransactions() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse>(
    `/api/transactions?page=${page}&limit=${LIMIT}`,
    fetcher,
  );

  async function deleteTransaction(id: string) {
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Transacción eliminada");
      const remainingOnPage = (data?.data.length ?? 1) - 1;
      if (remainingOnPage === 0 && page > 1) setPage((p) => p - 1);
      else mutate();
    } catch {
      toast.error("Error al eliminar la transacción");
    }
  }

  return {
    transactions: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    page,
    setPage,
    error,
    isLoading,
    mutate,
    deleteTransaction,
  };
}
