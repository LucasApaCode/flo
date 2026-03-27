import { prisma } from '@/lib/db'
import { CreateTransactionInput, UpdateTransactionInput } from '../types'

export const transactionRepository = {
  async findMany(userId: string, opts: { skip: number; take: number }) {
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        skip: opts.skip,
        take: opts.take,
      }),
      prisma.transaction.count({ where: { userId } }),
    ])
    return { transactions, total }
  },

  async findById(id: string) {
    return prisma.transaction.findUnique({ where: { id } })
  },

  async create(userId: string, data: CreateTransactionInput) {
    return prisma.transaction.create({
      data: {
        userId,
        type: data.type,
        amount: data.amount,
        category: data.category,
        date: new Date(data.date),
        note: data.note ?? null,
      },
    })
  },

  async update(id: string, data: UpdateTransactionInput) {
    return prisma.transaction.update({
      where: { id },
      data: {
        ...(data.type && { type: data.type }),
        ...(data.amount !== undefined && { amount: data.amount }),
        ...(data.category && { category: data.category }),
        ...(data.date && { date: new Date(data.date) }),
        ...(data.note !== undefined && { note: data.note }),
      },
    })
  },

  async delete(id: string) {
    return prisma.transaction.delete({ where: { id } })
  },
}
