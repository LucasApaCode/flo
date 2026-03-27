'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TransactionForm } from '@/features/transactions/components/TransactionForm'
import { CreateTransactionInput, Transaction } from '@/features/transactions/types'

interface EditTransactionClientProps {
  transaction: Transaction
}

export function EditTransactionClient({ transaction }: EditTransactionClientProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(data: CreateTransactionInput) {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/transactions/${transaction.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update transaction')
      router.push('/transactions')
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <TransactionForm
        onSubmit={handleSubmit}
        defaultValues={transaction}
        isLoading={isLoading}
        onCancel={() => router.push('/transactions')}
      />
    </div>
  )
}
