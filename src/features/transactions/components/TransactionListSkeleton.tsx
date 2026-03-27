import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export function TransactionListSkeleton() {
  return (
    <>
      {/* Mobile skeleton */}
      <div className="space-y-3 md:hidden">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-5 w-20" />
                <div className="flex gap-1">
                  <Skeleton className="h-7 w-12" />
                  <Skeleton className="h-7 w-16" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop skeleton */}
      <div className="hidden md:block rounded-lg border overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="ml-auto h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="ml-auto h-4 w-20" />
              <div className="flex gap-1">
                <Skeleton className="h-7 w-12" />
                <Skeleton className="h-7 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
