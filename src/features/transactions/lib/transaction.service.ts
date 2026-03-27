import { transactionRepository } from './transaction.repository'
import { serializeTransaction, serializeTransactions } from './transaction.serializer'
import { CreateTransactionInput, UpdateTransactionInput } from '../types'

export class ForbiddenError extends Error {
  constructor() { super('Forbidden'); this.name = 'ForbiddenError' }
}

export class NotFoundError extends Error {
  constructor() { super('Not found'); this.name = 'NotFoundError' }
}

export const transactionService = {
  async list(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit
    const { transactions, total } = await transactionRepository.findMany(userId, { skip, take: limit })
    return {
      data: serializeTransactions(transactions),
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    }
  },

  async create(userId: string, data: CreateTransactionInput) {
    const tx = await transactionRepository.create(userId, data)
    return serializeTransaction(tx)
  },

  async update(userId: string, id: string, data: UpdateTransactionInput) {
    const existing = await transactionRepository.findById(id)
    if (!existing) throw new NotFoundError()
    if (existing.userId !== userId) throw new ForbiddenError()
    const updated = await transactionRepository.update(id, data)
    return serializeTransaction(updated)
  },

  async delete(userId: string, id: string) {
    const existing = await transactionRepository.findById(id)
    if (!existing) throw new NotFoundError()
    if (existing.userId !== userId) throw new ForbiddenError()
    await transactionRepository.delete(id)
  },
}
