import { Prisma } from "@prisma/client";
import { Transaction } from "../types";

type PrismaTransaction = {
  id: string;
  userId: string;
  type: "INCOME" | "EXPENSE";
  amount: Prisma.Decimal;
  category: string;
  date: Date;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function serializeTransaction(tx: PrismaTransaction): Transaction {
  return {
    id: tx.id,
    userId: tx.userId,
    type: tx.type,
    amount: tx.amount.toNumber(),
    category: tx.category,
    date: tx.date.toISOString(),
    note: tx.note,
    createdAt: tx.createdAt.toISOString(),
    updatedAt: tx.updatedAt.toISOString(),
  };
}

export function serializeTransactions(txs: PrismaTransaction[]): Transaction[] {
  return txs.map(serializeTransaction);
}
