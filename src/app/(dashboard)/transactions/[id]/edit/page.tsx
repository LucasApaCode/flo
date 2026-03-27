import { notFound, redirect } from 'next/navigation'
import { auth } from '@/features/auth/lib/auth.config'
import { transactionService } from '@/features/transactions/lib/transaction.service'
import { Transaction } from '@/features/transactions/types'
import { EditTransactionClient } from './EditTransactionClient'

interface EditTransactionPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTransactionPage({ params }: EditTransactionPageProps) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { id } = await params

  try {
    const transactions = await transactionService.list(session.user.id)
    const transaction = transactions.find((tx: Transaction) => tx.id === id)
    if (!transaction) notFound()

    return <EditTransactionClient transaction={transaction} />
  } catch {
    notFound()
  }
}
