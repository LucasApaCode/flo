import { Skeleton } from '@/components/ui/skeleton'

export function ChartSkeleton() {
  return <Skeleton className="h-[300px] w-full rounded-md" />
}

export function StatsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-xl shadow-slate-900/5">
        <ChartSkeleton />
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7 bg-white p-8 rounded-xl shadow-xl shadow-slate-900/5">
          <ChartSkeleton />
        </div>
        <div className="col-span-12 lg:col-span-5 bg-surface-container-low p-8 rounded-xl shadow-xl shadow-slate-900/5">
          <ChartSkeleton />
        </div>
      </div>
    </div>
  )
}
