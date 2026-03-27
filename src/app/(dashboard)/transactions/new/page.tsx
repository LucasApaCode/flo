'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TransactionForm } from '@/features/transactions/components/TransactionForm'
import { CreateTransactionInput } from '@/features/transactions/types'

export default function NewTransactionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(data: CreateTransactionInput) {
    setIsLoading(true)
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create transaction')
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
        isLoading={isLoading}
        onCancel={() => router.push('/transactions')}
      />
    </div>
  )
}
