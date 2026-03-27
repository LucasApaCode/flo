import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/features/auth/lib/auth.config'
import { transactionService } from '@/features/transactions/lib/transaction.service'
import { createTransactionSchema } from '@/features/transactions/types'

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: { message: 'Unauthorized' } }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '10', 10)))
  const result = await transactionService.list(session.user.id, page, limit)
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: { message: 'Unauthorized' } }, { status: 401 })
  }
  const body = await request.json()
  const parsed = createTransactionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: 'Validation error', details: parsed.error.flatten() } },
      { status: 400 }
    )
  }
  const transaction = await transactionService.create(session.user.id, parsed.data)
  return NextResponse.json({ data: transaction }, { status: 201 })
}
