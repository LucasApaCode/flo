import { NextResponse } from 'next/server'
import { auth } from '@/features/auth/lib/auth.config'
import { statsService } from '@/features/stats/lib/stats.service'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: { message: 'Unauthorized' } }, { status: 401 })
  }
  const stats = await statsService.getStats(session.user.id)
  return NextResponse.json({ data: stats })
}
