import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/features/auth/lib/auth.config'
import {
  transactionService,
  ForbiddenError,
  NotFoundError,
} from '@/features/transactions/lib/transaction.service'
import { updateTransactionSchema } from '@/features/transactions/types'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: { message: 'Unauthorized' } }, { status: 401 })
  }
  const { id } = await params
  const body = await request.json()
  const parsed = updateTransactionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: 'Validation error', details: parsed.error.flatten() } },
      { status: 400 }
    )
  }
  try {
    const transaction = await transactionService.update(session.user.id, id, parsed.data)
    return NextResponse.json({ data: transaction })
  } catch (error) {
    if (error instanceof ForbiddenError)
      return NextResponse.json({ error: { message: 'Forbidden' } }, { status: 403 })
    if (error instanceof NotFoundError)
      return NextResponse.json({ error: { message: 'Not found' } }, { status: 404 })
    throw error
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: { message: 'Unauthorized' } }, { status: 401 })
  }
  const { id } = await params
  try {
    await transactionService.delete(session.user.id, id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof ForbiddenError)
      return NextResponse.json({ error: { message: 'Forbidden' } }, { status: 403 })
    if (error instanceof NotFoundError)
      return NextResponse.json({ error: { message: 'Not found' } }, { status: 404 })
    throw error
  }
}
